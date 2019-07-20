import React from "react";
import { Navbar, NavItem, Icon } from "react-materialize";
import { connect } from "react-redux";
import { logIn } from "../../redux/actions";
import "./NavBar.css";
import { Link } from "react-router-dom";
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
              <a href="#/index/">Albatross</a>
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
        <Link to="/about/">Firefox</Link>
        <Link to="/index/">Chrome</Link>
        <Link to="/about/">Android</Link>

        <Link to="/login/" >
          {this.props.isLoggedIn === 1 ? (<span className="user-icon"><Icon>person</Icon> Account</span>) : "Login"}
        </Link>
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
