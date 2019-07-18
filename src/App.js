import React from 'react';
import './App.css';
import Arweave from 'arweave/web';
import 'jdenticon';
import {Button} from 'react-materialize';
import 'materialize-css/dist/css/materialize.min.css';
import 'material-design-icons/iconfont/material-icons.css'
import NavBar from "./components/NavBar";


const arweave = Arweave.init({
    host: document.location.host.indexOf('localhost') !== -1 ? 'arweave.net' : document.location.host,
    port: 443,
    protocol: 'https'
}); 


class MainApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {balance: 0};
    }

    componentDidMount() {
        arweave.wallets.getBalance('tIf0wLp418uknaNKxi-GVUM-1Xh7jPyAfISoBozpICU').then((balance) => {
            let ar = arweave.ar.winstonToAr(balance);


            this.setState({balance: ar});
        });
    }

    render() {
        return (
            <div>
                <NavBar />
                <div className="App">
                    <header className="App-header">
                        <svg width="80" height="80" data-jdenticon-value="tIf0wLp418uknaNKxi-GVUM-1Xh7jPyAfISoBozpICU"/>
                        <p className="app-label" rel="noopener noreferrer">
                            Some random wallet balance: {this.state.balance}
                        </p>

                        <Button waves="light" style={{marginRight: '5px'}}>
                            button
                        </Button>

                    </header>
                </div>
            </div>
        );
    }

}


export default MainApp;
