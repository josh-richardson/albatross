import React from "react";
import { connect } from "react-redux";
import "jdenticon";
import { logOut } from "../../redux/actions";
import "./SubmitApp.css";
import { TextInput, Textarea } from "react-materialize";
import Dropzone from "../dropzone/Dropzone";
import { arweave } from "../../constants";

class SubmitApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = { username: "unset", deploying: false };
    this.retrieveProfile = this.retrieveProfile.bind(this);
  }

  componentDidMount() {
    if (!this.props.isLoggedIn) {
      this.props.history.push("/login/");
    }
    this.submitApp = this.submitApp.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.retrieveProfile();
  }

  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      // eslint-disable-next-line no-mixed-operators
      var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }


  submitApp() {
    let appRepr = Object.assign(this.state, {
      authorAddr: this.props.address,
      author: this.state.username,
      updated: new Date(),
      version: 1,
      fromStore: false,
      storeUrl: null,
      id: this.uuidv4(),
      debug: true
    });
    delete appRepr.username;
    delete appRepr.package;



    arweave.createTransaction({
      data: JSON.stringify(appRepr),
    }, this.props.wallet).then((tx) => {
      tx.addTag('Content-Type', 'application/json');
      tx.addTag('store', 'albatross');
      console.log(tx);
      arweave.transactions.sign(tx, this.props.wallet).then(() => {

        arweave.transactions.post(tx).then(response => {
          console.log(response);
        });
      });
    });


  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleFileUpload(files, stateName) {
    var fr = new FileReader();
    fr.onloadend = () => {
      this.setState({ [stateName]: fr.result });
    };
    fr.readAsDataURL(files[0]);
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
        <TextInput label="App Name" onChange={this.handleChange} name="name"/>
        <TextInput label="App Tagline" onChange={this.handleChange} name="tagline"/>
        <TextInput label="App Category" onChange={this.handleChange} name="category"/>
        <TextInput label="App Detail Images (space-separated URLs)" onChange={this.handleChange} name="detailImages"/>
        <p>App Icon:</p>
        <Dropzone onSelected={(files) => {
          this.handleFileUpload(files, "icon");
        }} filename="icon"/>

        <p>App Small Image:</p>
        <Dropzone onSelected={(files) => {
          this.handleFileUpload(files, "image");
        }} filename="small image"/>
        <TextInput label="App Type" onChange={this.handleChange} name="type"/>
        <Textarea label="App Description (multiline)" onChange={this.handleChange} name="description"/>

        <p>App file (under 2mb):</p>
        <Dropzone onSelected={(files) => {
          this.handleFileUpload(files, "package");
        }} filename="app"/>

        <button className="blue waves-effect waves-light btn right submit-app-button" onClick={() => {
          this.submitApp();
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
