import React from 'react'
import { connect } from 'react-redux'
import 'jdenticon'
import { resetApps } from '../../redux/actions'
import './SubmitApp.css'
import { TextInput, Textarea, Select } from 'react-materialize'
import Dropzone from '../dropzone/Dropzone'
import { arweave, appTypes } from '../../constants'

import Materialize from 'materialize-css'
import { BounceLoader } from 'react-spinners'
import { capitalize, uuidv4 } from '../../utils'

class SubmitApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: 'unset',
      deploying: false,
      platform: 'firefox',
      category: 'accessibility',
    }

    if (this.props.match.params.uuid) {
      this.state = {
        ...this.state,
        updating: true,
        complexUpdating: false,
        appToUpdate: this.props.apps.entries.filter(a => a.id === this.props.match.params.uuid)[0],
      }
    }

    this.submitApp = this.submitApp.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleFileUpload = this.handleFileUpload.bind(this)
    this.retrieveProfile = this.retrieveProfile.bind(this)
  }

  componentDidMount() {
    if (!this.props.user.isLoggedIn) {
      this.props.history.push('/login/')
    }
    this.retrieveProfile()
  }

  submitApp() {
    let appProperties = this.state.updating
      ? {
          changelog: this.state.changelog,
          id: this.state.appToUpdate.id,
          updateId: uuidv4(),
        }
      : Object.assign(this.state, {
          authorAddr: this.props.address,
          author: this.state.username,
          updated: new Date(),
          version: 1,
          detailImages: this.state.detailImages.split(' '),
          fromStore: false,
          storeUrl: null,
          id: uuidv4(),
          debug: true,
        })

    delete appProperties.username
    delete appProperties.package
    delete appProperties.deploying

    this.setState({ deploying: true })
    arweave
      .createTransaction(
        {
          data: JSON.stringify(appProperties),
        },
        this.props.user.wallet
      )
      .then(tx => {
        tx.addTag('Content-Type', 'application/json')
        if (this.state.updating) {
          tx.addTag('albatross-update-dev', appProperties.id)
        } else {
          tx.addTag('store', 'albatross-v2-beta')
        }
        arweave.transactions.sign(tx, this.props.user.wallet).then(() => {
          arweave.transactions.post(tx).then(response => {
            if (response.status === 200) {
              this.checkForTransactionProgress(tx, this.state.package, appProperties)
            }
          })
        })
      })
  }

  checkForTransactionProgress(tx, appPackage, appProperties) {
    let checkInterval = setInterval(() => {
      arweave.transactions.getStatus(tx.id).then(response => {
        if (response.status === 200) {
          clearInterval(checkInterval)
          this.uploadAppPayload(appPackage, appProperties)
        } else if (response.status === 202) {
          Materialize.toast({ html: 'App is deploying. Progress is being made!' })
        } else {
          Materialize.toast({ html: 'Something went wrong!' })
        }
      })
    }, 15000)
  }

  uploadAppPayload(appPackage, appProperties) {
    let packageTx = JSON.stringify({ package: appPackage })
    arweave
      .createTransaction(
        {
          data: packageTx,
        },
        this.props.user.wallet
      )
      .then(pTx => {
        pTx.addTag('packageId', this.state.updating ? appProperties.updateId : appProperties.id)
        arweave.transactions.sign(pTx, this.props.user.wallet).then(() => {
          arweave.transactions.post(pTx).then(pResponse => {
            if (pResponse.status === 200) {
              this.props.resetApps()
              Materialize.toast({ html: 'App successfully uploaded to Arweave!' })
              this.props.history.push('/store/firefox')
            }
          })
        })
      })
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleFileUpload(files, stateName) {
    const fr = new FileReader()
    fr.onloadend = () => {
      this.setState({ [stateName]: fr.result })
    }
    fr.readAsDataURL(files[0])
  }

  retrieveProfile() {
    const username = localStorage.getItem('albatross_username')
    if (username) {
      this.setState({ username: username })
    } else {
      this.props.history.push('/setuser/')
    }
  }

  renderDeploying() {
    return (
      <div>
        <div className="loader">
          <BounceLoader sizeUnit={'px'} size={150} color={'#123abc'} />
        </div>
        <p className="center">Currently uploading your app... this may take up to 10 minutes.</p>
      </div>
    )
  }

  renderSubmitForm() {
    return (
      <div>
        <h1>{this.state.updating ? 'Update' : 'Submit'} an App!</h1>
        <TextInput label="App Name" onChange={this.handleChange} name="name" />
        <TextInput label="App Tagline" onChange={this.handleChange} name="tagline" />

        <p>App Category:</p>
        <Select onChange={this.handleChange} name="category">
          {appTypes.map(appType => {
            return (
              <option key={appType} value={appType.toLowerCase()}>
                {capitalize(appType)}
              </option>
            )
          })}
        </Select>

        <TextInput label="App Detail Images (space-separated URLs)" onChange={this.handleChange} name="detailImages" />

        <p>App Icon:</p>
        <Dropzone onSelected={files => this.handleFileUpload(files, 'icon')} filename="icon" />

        <p>App Small Image:</p>
        <Dropzone onSelected={files => this.handleFileUpload(files, 'image')} filename="small image" />

        <p>App platform:</p>
        <Select onChange={this.handleChange} name="platform">
          <option value="firefox">Firefox</option>
          <option value="chrome">Chrome</option>
          <option value="android">Android</option>
        </Select>

        <Textarea label="App Description (multiline)" onChange={this.handleChange} name="description" />

        <p>App file (under 2mb):</p>
        <Dropzone onSelected={files => this.handleFileUpload(files, 'package')} filename="app" />

        <button className="blue waves-effect waves-light btn submit-app-button" onClick={this.submitApp}>
          Submit App
        </button>
      </div>
    )
  }

  renderUpdateForm() {
    return (
      <div>
        <h1>Update an app</h1>

        <p>App update file (under 2mb):</p>
        <Dropzone onSelected={files => this.handleFileUpload(files, 'package')} filename="app" />

        <Textarea label="App changelog (multiline)" onChange={this.handleChange} name="changelog" />

        <button className="blue waves-effect waves-light btn submit-app-button" onClick={this.submitApp}>
          Submit App
        </button>
      </div>
    )
  }

  render() {
    if (this.state.deploying) {
      return this.renderDeploying()
    } else if (this.state.updating && !this.state.complexUpdating) {
      return this.renderUpdateForm()
    } else {
      return this.renderSubmitForm()
    }
  }
}

const mapStateToProps = state => {
  return state
}

export default connect(
  mapStateToProps,
  { resetApps }
)(SubmitApp)
