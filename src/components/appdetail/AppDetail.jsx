import './AppDetail.css'
import 'jdenticon'
import 'pure-react-carousel/dist/react-carousel.es.css'
import { ALBATROSS_APP_PKG_TAG, ALBATROSS_UPDATE_TAG, arweave, isBlink, isFirefox } from '../../constants'
import { BounceLoader } from 'react-spinners'
import { CarouselProvider, Slide, Slider } from 'pure-react-carousel'
import { Link } from 'react-router-dom'
import { addApp } from '../../redux/actions'
import { connect } from 'react-redux'
import Materialize from 'materialize-css'
import React from 'react'
import ReviewListing from './reviewlist/ReviewListing'

class AppDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = { app: null, updates: [], fileNameMappings: { firefox: '.xpi', chrome: '.crx', android: 'apk' } }
  }

  componentDidMount() {
    this.updateCurrentApp()
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.apps.loading && !this.props.app) {
      this.updateCurrentApp(nextProps)
    }
  }

  updateCurrentApp(props) {
    props = props || this.props
    if (props.apps.loading === false) {
      this.setState(
        {
          app: props.apps.entries.filter(x => x.id === props.match.params.uuid)[0],
        },
        () => {
          arweave
            .arql({
              op: 'and',
              expr1: {
                op: 'equals',
                expr1: ALBATROSS_UPDATE_TAG,
                expr2: this.state.app.id,
              },
              expr2: {
                op: 'equals',
                expr1: 'from',
                expr2: this.state.app.authorAddr,
              },
            })
            .then(result => this.handleAppUpdateVersions(result))
        }
      )
    }
  }

  handleAppUpdateVersions(versionTransactions) {
    versionTransactions.forEach(tx => {
      arweave.transactions.get(tx).then(txResult => {
        const updateDetails = JSON.parse(txResult.get('data', { decode: true, string: true }))
        this.setState({
          updates: [...this.state.updates, updateDetails].sort((a, b) => (a.timestamp > b.timestamp ? -1 : 1)),
        })
      })
    })
  }

  saveFile(blob, filename) {
    if (window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob, filename)
    } else {
      const a = document.createElement('a')
      document.body.appendChild(a)
      const url = window.URL.createObjectURL(blob)
      a.href = url
      if (
        this.state.app.platform === 'android' ||
        (this.state.app.platform === 'firefox' && isBlink) ||
        (this.state.app.platform === 'chrome' && isFirefox)
      ) {
        a.download = filename
      }
      a.click()
      setTimeout(() => {
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      }, 30000)
    }
  }

  installApp() {
    const artifactId = (this.state.updates.length !== 0 && this.state.updates[0].updateId) || this.state.app.id
    arweave
      .arql({
        op: 'and',
        expr1: {
          op: 'equals',
          expr1: ALBATROSS_APP_PKG_TAG,
          expr2: artifactId,
        },
        expr2: {
          op: 'equals',
          expr1: 'from',
          expr2: this.state.app.authorAddr,
        },
      })
      .then(queryResult => {
        if (queryResult.length === 0) {
          Materialize.toast({ html: "Could not retrieve this app. If it's new, it may not have been mined yet!" })
        } else {
          arweave.transactions.get(queryResult[0]).then(txResult => {
            const fileData = JSON.parse(txResult.get('data', { decode: true, string: true })).package
            fetch(fileData)
              .then(res => res.blob())
              .then(blob =>
                this.saveFile(blob, `${this.state.app.name}.${this.state.fileNameMappings[this.state.app.platform]} `)
              )
          })
        }
      })
  }

  render() {
    return (
      <div>
        {this.props.apps.loading || !this.state.app ? (
          <div className="loader">
            <BounceLoader sizeUnit={'px'} size={150} color={'#123abc'} />
          </div>
        ) : (
          <div>
            <button className="blue waves-effect waves-light btn app-install-button" onClick={() => this.installApp()}>
              Install Now
            </button>
            <div className="app-header-container">
              <img className="app-icon" src={this.state.app.icon} alt="App Icon" />
              <h4>{this.state.app.name}</h4>
            </div>

            <p>
              <span className="app-info">
                Author: {this.state.app.author}{' '}
                <span className="app-author">
                  <Link to={`/user/${this.state.app.authorAddr}/${this.state.app.author}`}>
                    ({this.state.app.authorAddr})
                  </Link>
                </span>
              </span>{' '}
              | <span className="app-info">Category: {this.state.app.category}</span>
            </p>
            <CarouselProvider naturalSlideWidth={100} naturalSlideHeight={125} totalSlides={3} isPlaying={true}>
              <Slider>
                {this.state.app.detailImages.map(src => {
                  return (
                    <Slide key={src}>
                      <img src={src} alt="App Screenshots" />
                    </Slide>
                  )
                })}
              </Slider>
            </CarouselProvider>

            <div className="details-review-split">
              <div className="app-details">
                <p className="app-description">{this.state.app.description}</p>

                {this.state.updates.length !== 0 && <h5>Changelogs:</h5>}

                {this.state.updates.map((item, index) => (
                  <div key={index}>
                    <p key={item.changelog} className="app-description">
                      <span className="bold">v{index + 2} changelog:</span> {item.changelog}
                    </p>
                  </div>
                ))}

                <h5>Additional Details:</h5>
                <p>Version: {1 + this.state.updates.length}</p>
                {this.state.app.fromStore ? (
                  <p>
                    From store:{' '}
                    <a target="_blank" rel="noopener noreferrer" href={this.state.app.storeUrl}>
                      {this.state.app.storeUrl}
                    </a>
                  </p>
                ) : (
                  <span />
                )}
              </div>
              <div className="app-reviews">
                <ReviewListing currentAppId={this.state.app.id} />
              </div>
            </div>
          </div>
        )}
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
)(AppDetail)
