import './Store.css'
import 'jdenticon'
import { capitalize } from '../../utils'
import { connect } from 'react-redux'
import { logOut } from '../../redux/actions'
import AppListing from '../applisting/AppListing'
import React from 'react'

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
