import './ReviewListing.css'
import 'jdenticon'
import 'jdenticon'
import { TextInput } from 'react-materialize'
import { arweave } from '../../../constants'
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
        tx.addTag('albatross-review-beta-v3', this.props.currentAppId)
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
    arweave
      .arql({
        op: 'equals',
        expr1: 'albatross-review-v1',
        expr2: this.props.currentAppId,
      })
      .then(queryResult => {
        queryResult.forEach(tx => {
          arweave.transactions.get(tx).then(txResult => {
            arweave.wallets
              .ownerToAddress(txResult.owner)
              .then(resultAddress => this.setReviews(txResult, resultAddress))
          })
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
          this.state.reviews.map(app => {
            return (
              <div key={app.addr} className="review">
                <div className="review-header">
                  <svg width="36" height="36" data-jdenticon-value={app.addr} />
                  <p>{app.username}</p>
                  <StarRatingComponent starCount={5} value={app.rating} />
                </div>
                <p className="clamped-para" onClick={evt => evt.currentTarget.classList.remove('clamped-para')}>
                  {app.review}
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
  return state.user
}

export default connect(mapStateToProps)(ReviewListing)
