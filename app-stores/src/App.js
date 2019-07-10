import React from 'react';
import logo from './logo.svg';
import './App.css';
import Arweave from 'arweave/web';


const arweave = Arweave.init({
  host: document.location.host.indexOf('localhost') !== -1 ? 'arweave.net' : document.location.host,
  port: 1984
});


class MainApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = { balance: 0 };
  }

  componentDidMount() {
    arweave.wallets.getBalance('1seRanklLU_1VTGkEk7P0xAwMJfA7owA1JHW5KyZKlY').then((balance) => {
      let winston = balance;
      let ar = arweave.ar.winstonToAr(balance);

      console.log(winston);
      //125213858712

      console.log(ar);
      //0.125213858712
    });
  }

  render() {
    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
            >
              Some random wallet balance: {this.state.balance}
            </a>
          </header>
        </div>
    );
  }

}



export default MainApp;
