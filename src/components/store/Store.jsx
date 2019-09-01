import React from 'react'
import { connect } from 'react-redux'
import 'jdenticon'
import { logOut } from '../../redux/actions'
import './Store.css'
import AppListing from '../applisting/AppListing'
import { capitalize } from '../../utils'

class Store extends React.Component {
  constructor(props) {
    super(props)
    this.state = { loading: true }
  }

  render() {
    return (
      <div>
        <h2>Apps for {capitalize(this.props.match.params.platform)}</h2>
        <AppListing platform={this.props.match.params.platform} />
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
)(Store)
