import React from "react";
import "jdenticon";
import "./AppBadge.css";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

class AppBadge extends React.Component {

  renderAppDetails() {
    return (
      <div>
        <img className="app-image" src={this.props.app.image} alt={this.props.app.name + " logo"}/>
        <p className="app-title">{this.props.app.name}</p>
        {this.props.showUpdate ?
          <div>
            <button className="blue waves-effect waves-light btn app-update-button" onClick={() => {
              this.props.history.push(`/submit/${this.props.app.id}`);
            }}>Update
            </button>
            <button className="blue waves-effect waves-light btn app-update-button" onClick={() => {
              this.props.history.push(`/details/${this.props.app.id}`);
            }}>Details
            </button>
          </div> : <p className="app-tagline">{this.props.app.tagline}</p>}
      </div>
    );
  }


  render() {
    return (
      <div className="app-badge">
        {this.props.showUpdate ? this.renderAppDetails() : <Link to={"/details/" + this.props.app.id}>
          {this.renderAppDetails()}
        </Link>}
      </div>
    );
  }
}

export default withRouter(AppBadge);
