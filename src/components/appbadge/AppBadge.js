import React from "react";
import { connect } from "react-redux";
import { arweave } from "../../constants";
import "jdenticon";
import { logOut } from "../../redux/actions";
import "./AppBadge.css";

class AppBadge extends React.Component {


  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }


  render() {
    return (
      <div className="app-badge">
        <img className="app-image" src={this.props.app.image} alt={this.props.app.name + " logo"}/>
        <p className="app-tagline">{this.props.app.tagline}</p>
        <p className="app-title">{this.props.app.name}</p>
      </div>
    );
  }
}

export default AppBadge;
