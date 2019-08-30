import React from "react";
import { connect } from "react-redux";

import "jdenticon";
import { logOut } from "../../redux/actions";
import "./SetUser.css";
import { TextInput } from "react-materialize";

class SetUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: undefined };
    this.checkUsername = this.checkUsername.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
  }

  componentDidMount() {
    if (!this.props.isLoggedIn) {
      this.props.history.push("/login/");
    }
    this.checkUsername();
  }

  checkUsername() {
    const username = localStorage.getItem("albatross_username");
    if (username) {
      this.props.history.goBack();
    }
  }

  handleChange(event) {
    this.setState({ username: event.target.value });
  }

  updateUsername() {
    localStorage.setItem("albatross_username", this.state.username);
    this.props.history.goBack();
  }

  render() {
    return (
      <div>
        <p>You haven't yet set a username! Please set one below:</p>
        <TextInput onChange={this.handleChange} />
        <div className="right">
          <button
            className="blue waves-effect waves-light btn"
            onClick={this.updateUsername}
          >
            Set
          </button>
        </div>
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
)(SetUser);
