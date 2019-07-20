import React from "react";
import "./App.css";

import "materialize-css/dist/css/materialize.min.css";
import "material-design-icons/iconfont/material-icons.css";
import NavBar from "./components/navbar/NavBar";


import { Route } from "react-router-dom";
import Login from "./components/login/Login";
import Footer from "./components/footer/Footer";
import Profile from "./components/profile/Profile";

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
              <Route path="/index/" exact component={Index}/>
              <Route path="/about/" component={About}/>
              <Route path="/login/" component={Login}/>
              <Route path="/profile/" component={Profile}/>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default MainApp;
