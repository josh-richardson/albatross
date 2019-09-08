import './ReviewListing.css'
import 'jdenticon'
import 'jdenticon'
import { ALBATROSS_REVIEW_TAG, arweave } from '../../../constants'
import { Link } from 'react-router-dom'
import { TextInput } from 'react-materialize'
import { connect } from 'react-redux'
import Materialize from 'materialize-css'
import React from 'react'
import StarRatingComponent from 'react-star-rating-component'

class ReviewListing extends React.Component {
  constructor(props) {
    super(props)
    this.state = { reviews: [], currentReview: '', currentRating: 5 }
    this.retrieveReviews = this.retrieveReviews.bind(this)
    this.postReview = this.postReview.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.retrieveReviews()
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loading) {
      this.retrieveReviews()
    }
  }

  postReview() {
    arweave
      .createTransaction(
        {
          data: JSON.stringify({
            review: this.state.currentReview,
            rating: this.state.currentRating,
            username: localStorage.getItem('albatross_username'),
          }),
        },
        this.props.wallet
      )
      .then(tx => {
        tx.addTag('Content-Type', 'application/json')
        tx.addTag(ALBATROSS_REVIEW_TAG, this.props.currentAppId)
        arweave.transactions.sign(tx, this.props.wallet).then(() => {
          arweave.transactions.post(tx).then(response => {
            if (response.status === 200) {
              Materialize.toast({ html: 'Review successfully posted! It should be visible within ten minutes.' })
              this.setState({ currentReview: '' })
            }
          })
        })
      })
  }

  handleChange(event) {
    this.setState({ currentReview: event.target.value })
  }

  onStarClick(nextValue) {
    this.setState({ currentRating: nextValue })
  }

  retrieveReviews() {
    this.setState({ reviews: [] })
    if (this.props.userAddress && this.props.entries.length !== 0) {
      this.props.entries.forEach(a => {
        arweave
          .arql({
            op: 'and',
            expr1: {
              op: 'equals',
              expr1: ALBATROSS_REVIEW_TAG,
              expr2: a.id,
            },
            expr2: {
              op: 'equals',
              expr1: 'from',
              expr2: this.props.userAddress,
            },
          })
          .then(queryResult => {
            this.processReviewTransactions(queryResult)
          })
      })
    } else if (!this.props.userAddress) {
      arweave
        .arql({
          op: 'equals',
          expr1: ALBATROSS_REVIEW_TAG,
          expr2: this.props.currentAppId,
        })
        .then(queryResult => {
          this.processReviewTransactions(queryResult)
        })
    }
  }

  processReviewTransactions(queryResult) {
    queryResult.forEach(tx => {
      arweave.transactions.get(tx).then(txResult => {
        arweave.wallets.ownerToAddress(txResult.owner).then(resultAddress => this.setReviews(txResult, resultAddress))
      })
    })
  }

  setReviews(txResult, resultAddress) {
    const reviewBody = JSON.parse(txResult.get('data', { decode: true, string: true }))
    this.setState({
      reviews: [
        ...this.state.reviews,
        {
          for: this.props.currentAppId,
          rating: reviewBody.rating,
          review: reviewBody.review,
          addr: resultAddress,
          username: reviewBody.username,
        },
      ],
    })
  }

  render() {
    return (
      <div className="review-listing">
        {this.state.reviews && this.state.reviews.length ? (
          this.state.reviews.map(rev => {
            return (
              <div key={rev.addr} className="review">
                <div className="review-header">
                  <svg width="36" height="36" data-jdenticon-value={rev.addr} />
                  <Link to={`/user/${rev.addr}/${rev.username}`}>
                    <p>{rev.username}</p>
                  </Link>
                  <StarRatingComponent starCount={5} value={rev.rating} />
                </div>
                <p className="clamped-para" onClick={evt => evt.currentTarget.classList.remove('clamped-para')}>
                  {rev.review}
                </p>
              </div>
            )
          })
        ) : (
          <p>No reviews yet!</p>
        )}
        {!this.props.hidePost &&
          (this.props.isLoggedIn ? (
            <div className="submit-review">
              <TextInput onChange={this.handleChange} value={this.state.currentReview} />
              <StarRatingComponent
                name="rate1"
                starCount={5}
                value={this.state.currentRating}
                onStarClick={this.onStarClick.bind(this)}
              />
              <button className="blue waves-effect waves-light btn" onClick={() => this.postReview()}>
                Post
              </button>
            </div>
          ) : (
            <p>Please log in to post a review!</p>
          ))}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return state.apps
}

export default connect(mapStateToProps)(ReviewListing)
