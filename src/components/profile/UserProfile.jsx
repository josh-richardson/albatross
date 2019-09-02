import './Profile.css'
import 'jdenticon'
import { arweave } from '../../constants'
import { connect } from 'react-redux'
import { logOut } from '../../redux/actions'
import AppListing from '../applisting/AppListing'
import React from 'react'

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = { username: 'unset', loading: true }
  }

  render() {
    return (
      <div>
        <div className="profile-header">
          <svg width="80" height="80" data-jdenticon-value={this.props.address} />
          <div className="profile-extra">
            <h4>{this.state.username}</h4>
            <p>Address: {this.props.address}</p>
            <p>Balance: {arweave.ar.winstonToAr(this.props.balance, { decimals: 2 })} AR</p>
          </div>
        </div>

        <button
          className="blue waves-effect waves-light btn"
          onClick={() => {
            this.props.logOut()
            this.props.history.push('/store/firefox')
          }}
        >
          Log Out
        </button>
        <button className="blue waves-effect waves-light btn" onClick={() => this.props.history.push('/submit/')}>
          Submit an App
        </button>

        <h4>Submitted Apps:</h4>
        <AppListing address={this.props.address} showUpdate={true} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return state.user
}

export default connect(
  mapStateToProps,
  { logOut }
)(Profile)
