import './index.css'
import * as serviceWorker from './service_worker'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './App'
import React from 'react'
import ReactDOM from 'react-dom'
import store from './redux/store'

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById('root')
)

window.jdenticon_config = {
  replaceMode: 'observe',
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
