import React from "react";
import { connect } from "react-redux";
import { arweave, testReviews } from "../../../constants";
import "jdenticon";
import "./ReviewListing.css";
import "jdenticon";
import { TextInput } from "react-materialize";

class ReviewListing extends React.Component {


  constructor(props) {
    super(props);
    this.state = { reviews: undefined, currentReview: undefined };
    this.retrieveReviews = this.retrieveReviews.bind(this);
    this.postReview = this.postReview.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.retrieveReviews();
  }

  postReview() {
    arweave.createTransaction({
      data: JSON.stringify({ review: this.state.currentReview })
    }, this.props.wallet).then(tx => {
      tx.addTag("Content-Type", "application/json");
      tx.addTag("albatross-review-test-1", this.props.currentAppId);
      arweave.transactions.sign(tx, this.props.wallet).then(() => {
        arweave.transactions.post(tx).then(response => {
          if (response.status === 200) {
            alert('Success');
          }
        });
      });
    });
  }

  handleChange(event) {
    this.setState({ currentReview: event.target.value });
  }

  retrieveReviews() {
    //  todo: reimplement
    arweave.arql({
      op: "equals",
      expr1: "albatross-review-test-1",
      expr2: this.props.currentAppId
    }).then(queryResult => {
      console.log(queryResult);
      queryResult.forEach(tx => {
        arweave.transactions.get(tx).then(txResult => {
          const reviewBody = JSON.parse(txResult.get("review", { decode: true, string: true }));
          console.log(reviewBody);
        });
      });
    });
    this.setState({ reviews: testReviews });
  }

  render() {
    return (
      <div className="review-listing">
        {this.state.reviews && this.state.reviews.map(app => {
          return <div key={app.temp_addr} className="review">
            <div className="review-header">
              <svg width="36" height="36" data-jdenticon-value={app.temp_addr}/>
              <p>{app.temp_username}</p>
            </div>
            <p className="clamped-para" onClick={(evt) => {
              evt.currentTarget.classList.remove("clamped-para");
            }}>{app.review}</p>
          </div>;
        })}
        {(this.props.isLoggedIn) ? <div className="submit-review">
          <TextInput onChange={this.handleChange}/>
          <button className="blue waves-effect waves-light btn" onClick={() => {
            this.postReview();

          }}>Post
          </button>
        </div> : <p>Please log in to post a review!</p>}

      </div>
    );
  }
}

const mapStateToProps = state => {
  return state.user;
};

export default connect(
  mapStateToProps
)(ReviewListing);
