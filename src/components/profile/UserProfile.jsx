import './Profile.css'
import 'jdenticon'
import { connect } from 'react-redux'
import { logOut } from '../../redux/actions'
import AppListing from '../applisting/AppListing'
import React from 'react'
import ReviewListing from '../appdetail/reviewlist/ReviewListing'

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = { username: 'unset', loading: true }
  }

  render() {
    return (
      <div>
        <div className="profile-header">
          <svg width="80" height="80" data-jdenticon-value={this.props.match.params.address} />
          <div className="profile-extra">
            <h4>{this.props.match.params.name}</h4>
            <p>Address: {this.props.match.params.address}</p>
          </div>
        </div>

        <h4>Submitted Apps:</h4>
        <AppListing address={this.props.match.params.address} showUpdate={true} />

        <h4>Submitted Reviews:</h4>

        <ReviewListing hidePost={true} />
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
