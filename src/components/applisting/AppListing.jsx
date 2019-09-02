import './AppListing.css'
import 'jdenticon'
import { addApp } from '../../redux/actions'
import { connect } from 'react-redux'
import AppBadge from './appbadge/AppBadge'
import React from 'react'

class AppListing extends React.Component {
  render() {
    let relevantApps = this.props.apps.entries

    if (this.props.platform) {
      relevantApps = relevantApps.filter(app => app.platform.toLowerCase() === this.props.platform.toLowerCase())
    } else if (this.props.address) {
      relevantApps = relevantApps.filter(app => app.authorAddr.toLowerCase() === this.props.address.toLowerCase())
    }

    return (
      <div className="app-listing">
        {relevantApps &&
          relevantApps
            .filter(
              app =>
                app.name.toLowerCase().indexOf(this.props.search.query) !== -1 ||
                app.description.toLowerCase().indexOf(this.props.search.query) !== -1
            )
            .map(app => <AppBadge key={app.id} app={app} showUpdate={this.props.showUpdate} />)}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return state
}

export default connect(
  mapStateToProps,
  { addApp }
)(AppListing)
