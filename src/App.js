import React from "react";
import "./App.css";

import "materialize-css/dist/css/materialize.min.css";
import "material-design-icons/iconfont/material-icons.css";
import NavBar from "./components/navbar/NavBar";


import { Route } from "react-router-dom";
import Login from "./components/Login";
import Footer from "./components/footer/Footer";

function Index() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

class MainApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { balance: 0 };
  }


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
            </div>
          </div>
        </div>
        <Footer/>
        {/*<p className="app-label" rel="noopener noreferrer">*/}
        {/*  Some random wallet balance: {this.state.balance}*/}
        {/*</p>*/}

        {/*<Button waves="light" style={{ marginRight: "5px" }}>*/}
        {/*  button*/}
        {/*</Button>*/}
      </div>
    );
  }
}

export default MainApp;
