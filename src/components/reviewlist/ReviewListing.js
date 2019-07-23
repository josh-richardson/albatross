import React from "react";
import { connect } from "react-redux";
import { arweave, testReviews } from "../../constants";
import "jdenticon";
import "./ReviewListing.css";
import { addApp } from "../../redux/actions";
import "jdenticon";

class ReviewListing extends React.Component {


  constructor(props) {
    super(props);
    this.state = { reviews: undefined };
    this.retrieveReviews = this.retrieveReviews.bind(this);
  }

  componentDidMount() {
    this.retrieveReviews();
  }


  retrieveReviews() {
    //  todo: reimplement
    this.setState({ reviews: testReviews });
  }

  render() {
    return (
      <div className="review-listing">
        {this.state.reviews && this.state.reviews.map(app => {
          return <div className="review">
            <div className="review-header">
              <svg width="30" height="30" data-jdenticon-value={app.temp_addr}/>
              <p>{app.temp_username}</p>
            </div>
            <p>{app.review}</p>
          </div>;
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state.apps;
};

export default connect(
  mapStateToProps,
  { addApp }
)(ReviewListing);
