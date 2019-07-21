import React from "react";
import { connect } from "react-redux";
import "jdenticon";
import { logOut } from "../../redux/actions";
import "./SubmitApp.css";
import { TextInput, Textarea, Select } from "react-materialize";
import Dropzone from "../dropzone/Dropzone";
import { arweave, appTypes, capitalize } from "../../constants";
import Materialize from "materialize-css";
import { BounceLoader } from "react-spinners";

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
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      // eslint-disable-next-line no-mixed-operators
      var r = Math.random() * 16 | 0, v = c === "x" ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  submitApp() {


    let appRepr = Object.assign(this.state, {
      authorAddr: this.props.address,
      author: this.state.username,
      updated: new Date(),
      version: 1,
      detailImages: this.state.detailImages.split(" "),
      fromStore: false,
      storeUrl: null,
      id: this.uuidv4(),
      debug: true
    });


    const mPkg = this.state.package;
    delete appRepr.username;
    delete appRepr.package;
    delete appRepr.deploying;

    this.setState({ deploying: true });
    arweave.createTransaction({
      data: JSON.stringify(appRepr)
    }, this.props.wallet).then(tx => {
      tx.addTag("Content-Type", "application/json");
      tx.addTag("store", "albatross-v1");

      arweave.transactions.sign(tx, this.props.wallet).then(() => {
        console.log("1");
        arweave.transactions.post(tx).then(response => {
          if (response.status === 200) {
            let checkInterval = setInterval(() => {
              arweave.transactions.getStatus(tx.id).then(response => {
                if (response.status === 200) {
                  let packageTx = JSON.stringify({ "package": mPkg });
                  arweave.createTransaction({
                    data: packageTx
                  }, this.props.wallet).then(pTx => {
                    pTx.addTag("packageId", appRepr.id);
                    arweave.transactions.sign(pTx, this.props.wallet).then(() => {
                      arweave.transactions.post(pTx).then(pResponse => {
                        clearInterval(checkInterval);
                        if (pResponse.status === 200) {
                          Materialize.toast({
                            html: "App successfully uploaded to Arweave!"
                          });
                          this.props.history.push("/store/firefox");
                        }
                      });
                    });
                  });
                } else if (response.status === 202) {
                  Materialize.toast({
                    html: "App is deploying. Progress is being made!"
                  });
                } else {
                  Materialize.toast({
                    html: "Something went wrong!"
                  });
                }
              });
            }, 15000);
          }
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

        {this.state.deploying ? <div>
          <div className="loader">
            <BounceLoader
              sizeUnit={"px"}
              size={150}
              color={"#123abc"}
            />
          </div>
          <p className="center">Currently uploading your app... this may take up to 10 minutes.</p>
        </div> : <div>
          <h1>Submit an App!</h1>
          <TextInput label="App Name" onChange={this.handleChange} name="name"/>
          <TextInput label="App Tagline" onChange={this.handleChange} name="tagline"/>

          <p>App Category:</p>
          <Select onChange={this.handleChange} name="category">
            {appTypes.map(appType => {
              return (<option key={appType} value={appType.toLowerCase()}>
                {capitalize(appType)}
              </option>);
            })}
          </Select>

          <TextInput label="App Detail Images (space-separated URLs)" onChange={this.handleChange} name="detailImages"/>
          <p>App Icon:</p>
          <Dropzone onSelected={(files) => {
            this.handleFileUpload(files, "icon");
          }} filename="icon"/>

          <p>App Small Image:</p>
          <Dropzone onSelected={(files) => {
            this.handleFileUpload(files, "image");
          }} filename="small image"/>

          <p>App platform:</p>
          <Select onChange={this.handleChange} name="type">

            <option value="firefox">
              Firefox
            </option>
            <option value="chrome">
              Chrome
            </option>
            <option value="android">
              Android
            </option>
          </Select>

          <Textarea label="App Description (multiline)" onChange={this.handleChange} name="description"/>

          <p>App file (under 2mb):</p>
          <Dropzone onSelected={(files) => {
            this.handleFileUpload(files, "package");
          }} filename="app"/>

          <button className="blue waves-effect waves-light btn submit-app-button" onClick={() => {
            this.submitApp();
          }}>Submit App
          </button>
        </div>}

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
