import React from "react";
import { connect } from "react-redux";
import "jdenticon";
import { logOut } from "../../redux/actions";
import "./Store.css";
import AppListing from "../applisting/AppListing";
import { capitalize } from "../../constants";

class Store extends React.Component {


  constructor(props) {
    super(props);
    this.state = { loading: true };
    this.retrieveApps = this.retrieveApps.bind(this);
  }


  retrieveApps() {

  }

  render() {
    return (
      <div>
        <h2>Apps for {capitalize(this.props.match.params.platform)}</h2>
        <AppListing/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state.user;
};

export default connect(
  mapStateToProps,
  { logOut }
)(Store);
