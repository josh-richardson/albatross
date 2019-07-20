import React from "react";
import { connect } from "react-redux";
import { arweave } from "../../constants";
import "jdenticon";
import { logOut } from "../../redux/actions";
import "./Store.css";
import AppBadge from "../appbadge/AppBadge";
import AppListing from "../AppListing/AppListing";

class Store extends React.Component {


  constructor(props) {
    super(props);
    this.state = { loading: true };
    this.retrieveApps = this.retrieveApps.bind(this);
  }

  static capitalize(s) {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  retrieveApps() {

  }

  render() {
    return (
      <div>
        <h2>Apps for {Store.capitalize(this.props.match.params.platform)}</h2>

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
