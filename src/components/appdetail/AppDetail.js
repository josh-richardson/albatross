import React from "react";
import "jdenticon";
import "./AppDetail.css";
import { testApps } from "../../constants";
import { BounceLoader } from "react-spinners";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

class AppDetail extends React.Component {


  constructor(props) {
    super(props);
    this.state = { app: null, loading: true };
  }

  componentDidMount() {
    this.setState({ app: testApps.filter(x => x.id === this.props.match.params.uuid)[0], loading: false });
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
          <button className="blue waves-effect waves-light btn app-install-button" onClick={this.updateUsername}>Install
            Now
          </button>
          <div className="app-header-container">
            <img className="app-icon" src={this.state.app.icon} alt="App Icon"/>
            <h4>{this.state.app.name}</h4>
          </div>


          <p><span className="app-info">Author: {this.state.app.author} <span className="app-author">({this.state.app.authorAddr})</span></span> | <span
            className="app-info">Category: {this.state.app.category}</span></p>


          <CarouselProvider
            naturalSlideWidth={100}
            naturalSlideHeight={125}
            totalSlides={3}
            isPlaying={true}
          >
            <Slider>
              {this.state.app.detailImages.map(src => {
                return <Slide><img src={src} alt="App Image"/></Slide>;
              })}
            </Slider>
          </CarouselProvider>

          <p className="app-description">{this.state.app.description}</p>
          <h5>Additional Details:</h5>
          <p>Version: {this.state.app.version}</p>
          {this.state.app.fromStore ? <p>From store: <a target="_blank" rel="noopener noreferrer" href={this.state.app.storeUrl}>{this.state.app.storeUrl}</a></p> : <span/>}

        </div>}

      </div>
    );
  }
}

export default AppDetail;
