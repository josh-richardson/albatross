import React from "react";
import "./App.css";

import "materialize-css/dist/css/materialize.min.css";
import "material-design-icons/iconfont/material-icons.css";
import NavBar from "./components/navbar/NavBar";


import { Redirect, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Footer from "./components/footer/Footer";
import Profile from "./components/profile/Profile";
import SetUser from "./components/setuser/SetUser";
import Store from "./components/store/Store";

function Index() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

class MainApp extends React.Component {

  render() {
    return (
      <div className="page-container">
        <div className="content-wrapper">
          <NavBar/>
          <div className="section">
            <div className="container">
              <Redirect from="/" to="/store/firefox" />
              <Route path="/index/" exact component={Index}/>
              <Route path="/about/" component={About}/>
              <Route path="/login/" component={Login}/>
              <Route path="/profile/" component={Profile}/>
              <Route path="/setuser/" component={SetUser}/>
              <Route path="/store/:platform" component={Store}/>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default MainApp;
