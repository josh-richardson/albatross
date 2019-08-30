import React from "react";
import { connect } from "react-redux";
import "jdenticon";
import "./AppListing.css";
import AppBadge from "./appbadge/AppBadge";
import { addApp } from "../../redux/actions";
import { retrieveApps } from "../../utils";

class AppListing extends React.Component {


  constructor(props) {
    super(props);
    this.state = { loading: true };

  }

  componentDidMount() {
    if (this.props.apps.length === 0) {
      retrieveApps(this.props.addApp);
    }
  }

  render() {
    let relevantApps = this.props.apps;

    if (this.props.platform) {
      relevantApps = relevantApps.filter(app => app.platform.toLowerCase() === this.props.platform.toLowerCase());
    } else if (this.props.address) {
      relevantApps = relevantApps.filter(app => app.authorAddr.toLowerCase() === this.props.address.toLowerCase());
    }

    return (
      <div className="app-listing">

        {relevantApps && relevantApps.map(app => {
          return <AppBadge key={app.id} app={app} showUpdate={this.props.showUpdate}/>;
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
)(AppListing);
