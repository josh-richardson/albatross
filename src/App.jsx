import './App.css'
import React from 'react'

import 'material-design-icons/iconfont/material-icons.css'
import 'materialize-css/dist/css/materialize.min.css'
import Login from './components/login/Login'
import NavBar from './components/navbar/NavBar'

import { Redirect, Route } from 'react-router-dom'
import { addApp, finishLoading } from './redux/actions'
import { api } from './api'
import { connect } from 'react-redux'
import AppDetail from './components/appdetail/AppDetail'
import Footer from './components/footer/Footer'
import Profile from './components/profile/Profile'
import SetUser from './components/setuser/SetUser'
import Store from './components/store/Store'
import SubmitApp from './components/submitapp/SubmitApp'
import UpdateBar from './components/updatebar/UpdateBar'
import UserProfile from './components/profile/UserProfile'

function Index() {
  return <Redirect from="/" to="/store/firefox" />
}

class MainApp extends React.Component {
  componentWillMount() {
    document.title = 'Albatross App Store'

    const link = document.querySelector("link[rel*='icon']") || document.createElement('link')
    link.type = 'image/x-icon'
    link.rel = 'shortcut icon'
    link.href =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAapJREFUWIXF1j9sTVEcB/CjaEIsgoi0klqQdBdC/OlQCYOlSRckWGxExCAxWISBGMRi6UQq0alTEwaTTjW2S7tYSJGIlJTnY7jnxenz5PVefed+1/vO7/fJ7953fzeEuoPddfbvCSFcwQscw/rsAmzBnCKLeIZRbMqJ6Me8lVnEHezMhRjAtL+zhEfYlQOxLo7/bRvIZ1zoOiLB7I23YDlB/MKBbIgIOYpGgpjKCoiIyZbbcTw3YLBlCm+yvzMw3jKF27kBe/A9AfzESHL9DF7iOXZ0C3G3ZQoNPMBY/Ic08wHXugHYiNk274g0EziMoTUHRMRwB8ChMvV6Khhed7i+uULN1QcjHSbwFee71bwXCx0AzUzh4FoDbqyyeZoZXPU/a12xJS9auZgotuZpxYP5RPEN8a8s41xVwNmk0EfcxP42v9ugWF4P8a4N4hO2lm3ei1exwHucKHH2CB7Hxs3cKwWIhYZxqvTBP+f34VsELKGvaq3Kwf1kCmN1ALbjSwQ0MFgH4nIyhafZARFxPQJ+oL8uxCXF98StWgARcRLjtQEiYlutgBBC+A0opjzP2yoiWQAAAABJRU5ErkJggg=='
    document.getElementsByTagName('head')[0].appendChild(link)
  }

  componentDidMount() {
    api.retrieveApps(this.props.addApp).then(() => this.props.finishLoading())
  }

  render() {
    return (
      <div className="page-container">
        <div className="content-wrapper">
          <UpdateBar />
          <NavBar />
          <div className="section">
            <div className="container">
              <Route path="/" exact component={Index} />
              <Route path="/login/" component={Login} />
              <Route path="/profile/" component={Profile} />
              <Route path="/setuser/" component={SetUser} />
              <Route path="/store/:platform" component={Store} />
              <Route path="/details/:uuid" component={AppDetail} />
              <Route path="/submit/:uuid?" component={SubmitApp} />
              <Route path="/user/:address/:name" component={UserProfile} />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return state.apps
}

export default connect(
  mapStateToProps,
  { addApp, finishLoading }
)(MainApp)
