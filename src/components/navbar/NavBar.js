import React from "react";
import { Navbar, NavItem, Icon } from "react-materialize";
import { connect } from "react-redux";
import { logIn } from "../../redux/actions";
import "./NavBar.css";
import { Link, NavLink } from "react-router-dom";
import AlbatrossIcon from "./AlbatrossIcon";

class NavBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = { search: false };
  }


  render() {
    return (

      <Navbar
        className="blue darken-2"
        brand={
          <span>
            <span className="logo-container">
              <AlbatrossIcon/>
              <a href="#/store/firefox">Albatross</a>
            </span>
          </span>
        }
        // search={this.state.search}
        alignLinks="right"
      >
        {this.state.search ?
          <div className="input-field col">
            <input id="searchBox" type="search" onChange={() => {
            //  search pls
            }}/>
          </div>
          : <span/>}

        <NavItem onClick={() => {
          this.setState({ search: true }, () => {
            document.getElementById("searchBox").focus();
          });
        }}>
          <Icon>search</Icon>
        </NavItem>
        <NavLink exact={true} activeClassName='blue darken-3' to="/store/firefox">Firefox</NavLink>
        <NavLink exact={true} activeClassName='blue darken-3' to="/store/chrome">Chrome</NavLink>
        <NavLink exact={true} activeClassName='blue darken-3' to="/store/android">Android</NavLink>

        <NavLink exact={true} activeClassName='blue darken-3' to={this.props.isLoggedIn ? "/profile/" : "/login/"} >
          {this.props.isLoggedIn ? (<span className="user-icon"><Icon>person</Icon> My Profile</span>) : "Login"}
        </NavLink>
      </Navbar>
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
