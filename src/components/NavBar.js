import React from "react";
import { Navbar, NavItem, Icon } from "react-materialize";
import { connect } from "react-redux";
import { logIn } from "../redux/actions";
import "./NavBar.css";

class NavBar extends React.Component {
  render() {
    return (
      <Navbar
        className="blue darken-2"
        brand={
          <span>
            <span className="logo-container">
              <img
                className="albatross-logo"
                src={require("./albatross.svg")}
                alt="Albatross Logo"
              />
              <a>Albatross</a>
            </span>
          </span>
        }
        alignLinks="right"
      >
        <NavItem href="get-started.html">
          <Icon>search</Icon>
        </NavItem>
        <NavItem href="get-started.html">
          <Icon>view_module</Icon>
        </NavItem>
        <NavItem href="get-started.html">
          <Icon>refresh</Icon>
        </NavItem>
        <NavItem
          href={this.state}
          onClick={() => {
            console.log(this.props.user);
            this.props.logIn("test");
          }}
        >
          <Icon>person</Icon>
        </NavItem>
      </Navbar>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps,
  { logIn }
)(NavBar);
