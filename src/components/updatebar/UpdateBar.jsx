import './UpdateBar.css'
import { DEBUG } from '../../constants_dev'
import { VERSION } from '../../constants'
import { api } from '../../api'
import { connect } from 'react-redux'
import { logIn } from '../../redux/actions'
import React from 'react'

class NavBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = { visible: false, updateUrl: null }
  }

  componentDidMount() {
    api.checkForNewerAlbatross(txResult => {
      const txTagObject = txResult.get('tags').reduce((result, next) => {
        let key = next.get('name', { decode: true, string: true })
        result[key] = next.get('value', { decode: true, string: true })
        return result
      })
      if (txTagObject.version > VERSION) {
        this.setState({ visible: true, updateUrl: txResult.id })
      }
    })
  }

  render() {
    return (
      <div>
        {this.state.visible && (
          <div className="update-bar">
            <p className="update-available">
              An updated version of Albatross is available. Click{' '}
              <a href={(DEBUG ? 'https://arweave.net/' : '/') + this.state.updateUrl}>here</a> to go there!
            </p>
            <a onClick={() => this.setState({ visible: false })} href="#/">
              Close
            </a>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return state.user
}

export default connect(
  mapStateToProps,
  { logIn }
)(NavBar)
