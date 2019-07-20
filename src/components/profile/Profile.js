import React from "react";
import { connect } from "react-redux";
import { arweave } from "../../constants";
import "jdenticon";
import { logOut } from "../../redux/actions";
import "./Profile.css";
import { BounceLoader } from "react-spinners";

class Profile extends React.Component {


  constructor(props) {
    super(props);
    this.retrieveProfile = this.retrieveProfile.bind(this);
    this.state = { username: "unset", loading: true };
  }

  componentDidMount() {
    console.log(this.props);
    if (!this.props.isLoggedIn) {
      this.props.history.push("/login/");
    }
    this.retrieveProfile = this.retrieveProfile.bind(this);
    this.retrieveProfile();
  }

  retrieveProfile() {
    arweave.arql({
      op: "and",
      expr1: {
        op: "equals",
        expr1: "from",
        expr2: "hnRI7JoN2vpv__w90o4MC_ybE9fse6SUemwQeY8hFxM"
      },
      expr2: {
        op: "or",
        expr1: {
          op: "equals",
          expr1: "type",
          expr2: "post"
        },
        expr2: {
          op: "equals",
          expr1: "type",
          expr2: "comment"
        }
      }
    }).then((result) => {
      console.log(result);
      this.setState({loading: false})
    });

  }

  render() {
    return (
      <div>
        {this.state.loading ? <div className="loader">
            <BounceLoader
              sizeUnit={"px"}
              size={150}
              color={"#123abc"}
            />
          </div> :
          <div>
            <h1>My Profile:</h1>
            <div className="profile-header">
              <svg width="80" height="80" data-jdenticon-value="tIf0wLp418uknaNKxi-GVUM-1Xh7jPyAfISoBozpICU"/>
              <div className="profile-extra">
                <h4>Username: {this.state.username}</h4>
                <p>Address: {this.props.address}</p>
                <p>Balance: {arweave.ar.winstonToAr(this.props.balance, { decimals: 2 })} AR</p>
              </div>
            </div>

            <button className="blue waves-effect waves-light btn" onClick={() => {
              this.props.logOut();
              this.props.history.push("/");
            }}>Log Out
            </button>
            <button className="blue waves-effect waves-light btn">Submit App</button>
          </div>
        }
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
)(Profile);
