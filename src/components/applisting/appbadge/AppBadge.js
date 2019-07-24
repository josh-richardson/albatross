import React from "react";
import "jdenticon";
import "./AppBadge.css";
import { Link } from "react-router-dom";

class AppBadge extends React.Component {

  render() {
    return (
      <div className="app-badge">
        <Link to={"/details/" + this.props.app.id}>
          <img className="app-image" src={this.props.app.image} alt={this.props.app.name + " logo"}/>
          <p className="app-tagline">{this.props.app.tagline}</p>
          <p className="app-title">{this.props.app.name}</p>
        </Link>
      </div>
    );
  }
}

export default AppBadge;
