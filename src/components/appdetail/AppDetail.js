import React from "react";
import "jdenticon";
import "./AppDetail.css";
import { BounceLoader } from "react-spinners";
import { CarouselProvider, Slider, Slide } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { connect } from "react-redux";
import { addApp } from "../../redux/actions";
import { arweave } from "../../constants";
import Materialize from "materialize-css";
import ReviewListing from "./reviewlist/ReviewListing";
import { retrieveApps } from "../../utils";

class AppDetail extends React.Component {


  constructor(props) {
    super(props);
    this.state = { app: null, loading: true };
  }


  componentDidMount() {
    if (this.props.apps.length !== 0) {
      this.setState({ app: this.props.apps.filter(x => x.id === this.props.match.params.uuid)[0], loading: false });
    } else {
      retrieveApps(this.props.addApp).then(() => {
        this.setState({ app: this.props.apps.filter(x => x.id === this.props.match.params.uuid)[0], loading: false });
      });
    }
  }

  installApp() {
    arweave.arql({
      op: "equals",
      expr1: "packageId",
      expr2: this.state.app.id
    }).then(queryResult => {
      if (queryResult.length === 0) {
        Materialize.toast({
          html: "Could not retrieve this app. If it's new, it may not have been mined yet!"
        });
      }
      queryResult.forEach(tx => {
        arweave.transactions.get(tx).then(txResult => {
          const txObject = JSON.parse(txResult.get("data", { decode: true, string: true }));
          console.log(txObject);
          window.location.href = txObject.package;
        });
      });
    });
  }

  render() {
    return (
      <div>
        {this.state.loading ? <div className="loader">
          <BounceLoader
            sizeUnit={"px"}
            size={150}
            color={"#123abc"}
          />
        </div> : <div>
          <button className="blue waves-effect waves-light btn app-install-button" onClick={() => {
            this.installApp();
          }}>Install
            Now
          </button>
          <div className="app-header-container">
            <img className="app-icon" src={this.state.app.icon} alt="App Icon"/>
            <h4>{this.state.app.name}</h4>
          </div>


          <p><span className="app-info">Author: {this.state.app.author} <span
            className="app-author">({this.state.app.authorAddr})</span></span> | <span
            className="app-info">Category: {this.state.app.category}</span></p>
          <CarouselProvider
            naturalSlideWidth={100}
            naturalSlideHeight={125}
            totalSlides={3}
            isPlaying={true}
          >
            <Slider>
              {this.state.app.detailImages.map(src => {
                return <Slide key={src}><img src={src} alt="App Screenshots"/></Slide>;
              })}
            </Slider>
          </CarouselProvider>

          <div className="details-review-split">
            <div className="app-details">
              <p className="app-description">{this.state.app.description}</p>
              <h5>Additional Details:</h5>
              <p>Version: {this.state.app.version}</p>
              {this.state.app.fromStore ? <p>From store: <a target="_blank" rel="noopener noreferrer"
                                                            href={this.state.app.storeUrl}>{this.state.app.storeUrl}</a>
              </p> : <span/>}

            </div>
            <div className="app-reviews">
              <ReviewListing/>
            </div>
          </div>

        </div>}

      </div>
    );
  }
}

const mapStateToProps = state => {
  return state.apps;
};

export default connect(
  mapStateToProps,
  { addApp }
)(AppDetail);
