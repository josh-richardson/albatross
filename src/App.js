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
import UpdateBar from "./components/updatebar/UpdateBar";

function Index() {
  return <Redirect from="/" to="/store/firefox"/>;
}

class MainApp extends React.Component {

  componentWillMount() {
    document.title = "Albatross App Store";

    const link = document.querySelector("link[rel*='icon']") || document.createElement("link");
    link.type = "image/x-icon";
    link.rel = "shortcut icon";
    link.href = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAapJREFUWIXF1j9sTVEcB/CjaEIsgoi0klqQdBdC/OlQCYOlSRckWGxExCAxWISBGMRi6UQq0alTEwaTTjW2S7tYSJGIlJTnY7jnxenz5PVefed+1/vO7/fJ7953fzeEuoPddfbvCSFcwQscw/rsAmzBnCKLeIZRbMqJ6Me8lVnEHezMhRjAtL+zhEfYlQOxLo7/bRvIZ1zoOiLB7I23YDlB/MKBbIgIOYpGgpjKCoiIyZbbcTw3YLBlCm+yvzMw3jKF27kBe/A9AfzESHL9DF7iOXZ0C3G3ZQoNPMBY/Ic08wHXugHYiNk274g0EziMoTUHRMRwB8ChMvV6Khhed7i+uULN1QcjHSbwFee71bwXCx0AzUzh4FoDbqyyeZoZXPU/a12xJS9auZgotuZpxYP5RPEN8a8s41xVwNmk0EfcxP42v9ugWF4P8a4N4hO2lm3ei1exwHucKHH2CB7Hxs3cKwWIhYZxqvTBP+f34VsELKGvaq3Kwf1kCmN1ALbjSwQ0MFgH4nIyhafZARFxPQJ+oL8uxCXF98StWgARcRLjtQEiYlutgBBC+A0opjzP2yoiWQAAAABJRU5ErkJggg==";
    document.getElementsByTagName("head")[0].appendChild(link);
  }

  render() {
    return (
      <div className="page-container">
        <div className="content-wrapper">
          <UpdateBar/>
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
