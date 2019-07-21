import React from "react";
import { connect } from "react-redux";
import { arweave, testApps } from "../../constants";
import "jdenticon";
import "./AppListing.css";
import AppBadge from "../appbadge/AppBadge";

class AppListing extends React.Component {


  constructor(props) {
    super(props);
    this.state = { loading: true, apps: [] };
    this.retrieveApps = this.retrieveApps.bind(this);
  }

  componentDidMount() {
    this.retrieveApps();
  }

  static capitalize(s) {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  retrieveApps() {

    arweave.arql({
      op: "equals",
      expr1: "store",
      expr2: "albatross"
    }).then(queryResult => {
      queryResult.forEach(tx => {
        arweave.transactions.get(tx).then(txResult => {
          const txObject = JSON.parse(txResult.get("data", { decode: true, string: true }));
          this.setState(prevState => ({ apps: [...prevState.apps, txObject] }));
        });
      });
    });

  }

  render() {
    return (
      <div className="app-listing">

        {this.state.apps && this.state.apps.map(app => {
          return <AppBadge key={app.id} app={app}/>;
        })}

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
