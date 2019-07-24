import React from "react";
import { connect } from "react-redux";
import { arweave, testReviews } from "../../../constants";
import "jdenticon";
import "./ReviewListing.css";
import { addApp } from "../../../redux/actions";
import "jdenticon";
import { TextInput } from "react-materialize";

class ReviewListing extends React.Component {


  constructor(props) {
    super(props);
    this.state = { reviews: undefined, currentReview: undefined };
    this.retrieveReviews = this.retrieveReviews.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.retrieveReviews();
  }


  handleChange(event) {
    this.setState({ currentReview: event.target.value });
  }

  retrieveReviews() {
    //  todo: reimplement
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
        {this.props.isLoggedIn && <div className="submit-review">
          <TextInput onChange={this.handleChange}/>
        </div>}

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
