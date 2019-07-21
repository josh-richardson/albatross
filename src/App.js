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
import AppDetail from "./components/appdetail/AppDetail";
import SubmitApp from "./components/submitapp/SubmitApp";

function Index() {
  return <Redirect from="/" to="/store/firefox"/>;
}

class MainApp extends React.Component {

  componentWillMount() {
    document.title = "Albatross App Store";
  }

  render() {
    return (
      <div className="page-container">
        <div className="content-wrapper">
          <NavBar/>
          <div className="section">
            <div className="container">
              <Route path="/" exact component={Index}/>
              <Route path="/login/" component={Login}/>
              <Route path="/profile/" component={Profile}/>
              <Route path="/setuser/" component={SetUser}/>
              <Route path="/store/:platform" component={Store}/>
              <Route path="/details/:uuid" component={AppDetail}/>
              <Route path="/submit/" component={SubmitApp}/>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default MainApp;
