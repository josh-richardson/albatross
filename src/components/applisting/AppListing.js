import React from "react";
import { connect } from "react-redux";
import { arweave } from "../../constants";
import "jdenticon";
import "./AppListing.css";
import AppBadge from "../appbadge/AppBadge";
import { addApp } from "../../redux/actions";

class AppListing extends React.Component {


  constructor(props) {
    super(props);
    this.state = { loading: true };
    this.retrieveApps = this.retrieveApps.bind(this);
  }

  componentDidMount() {

    this.retrieveApps();
  }


  retrieveApps() {
    if (this.props.apps.length === 0) {
      arweave.arql({
        op: "equals",
        expr1: "store",
        expr2: "albatross-v2-beta"
      }).then(queryResult => {
        queryResult.forEach(tx => {
          arweave.transactions.get(tx).then(txResult => {
            const txObject = JSON.parse(txResult.get("data", { decode: true, string: true }));
            this.props.addApp(txObject);
          });
        });
      });
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
          return <AppBadge key={app.id} app={app}/>;
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
