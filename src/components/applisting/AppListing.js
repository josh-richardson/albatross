import React from "react";
import { connect } from "react-redux";
import { arweave, testApps } from "../../constants";
import "jdenticon";
import "./AppListing.css";
import AppBadge from "../appbadge/AppBadge";

class AppListing extends React.Component {




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


      <div className="app-listing">
        <AppBadge app={testApps[0]}/>
        <AppBadge app={testApps[1]}/>
        <AppBadge app={testApps[2]}/>
        <AppBadge app={testApps[3]}/>
        <AppBadge app={testApps[4]}/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state.user;
};

export default connect(
  mapStateToProps
)(AppListing);
