import './UpdateBar.css'
import { ALBATROSS_RELEASE_TAG, VERSION, arweave } from '../../constants'
import { DEBUG } from '../../constants_dev'
import { connect } from 'react-redux'
import { logIn } from '../../redux/actions'
import React from 'react'

class NavBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = { visible: false, updateUrl: null }
  }

  componentDidMount() {
    arweave
      .arql({
        op: 'and',
        expr1: {
          op: 'equals',
          expr1: 'from',
          expr2: 'tIf0wLp418uknaNKxi-GVUM-1Xh7jPyAfISoBozpICU',
        },
        expr2: {
          op: 'equals',
          expr1: ALBATROSS_RELEASE_TAG,
          expr2: DEBUG ? 'beta' : 'production',
        },
      })
      .then(queryResult => {
        queryResult.forEach(tx => {
          arweave.transactions.get(tx).then(txResult => {
            const txTagObject = txResult.get('tags').reduce((result, next) => {
              let key = next.get('name', { decode: true, string: true })
              result[key] = next.get('value', { decode: true, string: true })
              return result
            })
            if (txTagObject.version > VERSION) {
              this.setState({ visible: true, updateUrl: txResult.id })
            }
          })
        })
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
