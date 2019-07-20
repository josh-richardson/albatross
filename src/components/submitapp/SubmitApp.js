import React from "react";
import { connect } from "react-redux";
import "jdenticon";
import { logOut } from "../../redux/actions";
import "./SubmitApp.css";
import { TextInput, Textarea } from "react-materialize";
import Dropzone from "../dropzone/Dropzone";

class SubmitApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = { username: "unset", loading: true };
    this.retrieveProfile = this.retrieveProfile.bind(this);
  }

  componentDidMount() {
    console.log(this.props);
    if (!this.props.isLoggedIn) {
      this.props.history.push("/login/");
    }
    this.retrieveProfile();
  }

  retrieveProfile() {
    const username = localStorage.getItem("albatross_username");
    if (username) {
      this.setState({ username: username });
    } else {
      this.props.history.push("/setuser/");
    }
  }

  render() {
    return (
      <div>
        <h1>Submit an App!</h1>
        <TextInput label="App Name"/>
        <TextInput label="App Tagline"/>
        <TextInput label="App Category"/>
        <TextInput label="App Detail Images (space-separated URLs)"/>
        <p>App Icon:</p>
        <Dropzone onSelected={(files) => {
          console.log(files);
        }} filename="logo"/>

        <p>App Small Image:</p>
        <Dropzone onSelected={(files) => {
          console.log(files);
        }} filename="small image"/>
        <TextInput label="App Type"/>
        <Textarea label="App Description (multiline)"/>
        <TextInput label="App Name"/>
        <button className="blue waves-effect waves-light btn right" onClick={() => {
          this.props.history.push("/submit/");
        }}>Submit App
        </button>
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
)(SubmitApp);
