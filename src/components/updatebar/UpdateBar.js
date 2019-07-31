import React from "react";
import { connect } from "react-redux";
import { logIn } from "../../redux/actions";
import "./UpdateBar.css";



class NavBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = { visible: false, updateResult: null };
  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
        {this.state.visible &&
        <div className="update-bar">
          <p className="update-available">
            An updated version of Albatross is available. Click <a href={this.state.updateResult.url}>here</a> to go there!
          </p>
          <a onClick={() => {
            this.setState({ visible: false });
          }} href="#">Close</a>
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
  { logIn }
)(NavBar);
