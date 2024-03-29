import './NavBar.css'
import { NavItem, Navbar } from 'react-materialize'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { logIn, search } from '../../redux/actions'
import AlbatrossIcon from './AlbatrossIcon'
import PersonIcon from './PersonIcon'
import React from 'react'
import SearchIcon from './SearchIcon'

class NavBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = { search: false }
  }

  render() {
    return (
      //todo: remove react-materialize as it isn't customizable enough - insert custom menu icon
      <Navbar
        className="blue darken-2"
        brand={
          <span>
            <span className="logo-container">
              <AlbatrossIcon />
              <a href="#/store/firefox">Albatross</a>
            </span>
          </span>
        }
        // search={this.state.search}
        alignLinks="right"
      >
        {/*todo : implement search*/}
        {this.state.search ? (
          <div className="input-field col">
            <input id="searchBox" type="search" onChange={e => this.props.search(e.target.value.toLowerCase())} />
          </div>
        ) : (
          <span />
        )}

        <NavItem
          onClick={() => {
            this.setState({ search: true }, () => {
              document.getElementById('searchBox').focus()
            })
          }}
        >
          <SearchIcon />
        </NavItem>
        <NavLink exact={true} activeClassName="blue darken-3" to="/store/firefox">
          Firefox
        </NavLink>
        <NavLink exact={true} activeClassName="blue darken-3" to="/store/chrome">
          Chrome
        </NavLink>
        <NavLink exact={true} activeClassName="blue darken-3" to="/store/android">
          Android
        </NavLink>

        <NavLink exact={true} activeClassName="blue darken-3" to={this.props.isLoggedIn ? '/profile/' : '/login/'}>
          {this.props.isLoggedIn ? (
            <span className="user-icon">
              <PersonIcon /> My Profile
            </span>
          ) : (
            'Login'
          )}
        </NavLink>
      </Navbar>
    )
  }
}

const mapStateToProps = state => {
  return state.user
}

export default connect(
  mapStateToProps,
  { logIn, search }
)(NavBar)
