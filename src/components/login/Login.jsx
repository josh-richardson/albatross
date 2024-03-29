import { arweave } from '../../constants'
import { connect } from 'react-redux'
import { logIn } from '../../redux/actions'
import Dropzone from '../dropzone/Dropzone'
import Materialize from 'materialize-css'
import React from 'react'

class Login extends React.Component {
  performLogin(file) {
    const reader = new FileReader()
    reader.readAsBinaryString(file)
    reader.onloadend = () => {
      try {
        const wallet = JSON.parse(reader.result)
        arweave.wallets.jwkToAddress(wallet).then(address => {
          arweave.wallets.getBalance(address).then(balance => {
            if (balance < 100000) {
              Materialize.toast({
                html: 'Wallet loaded, but your balance looks very low. You may not be able to publish anything.',
                classes: 'yellow darken-4',
              })
            }
            Materialize.toast({ html: 'Login successful!', classes: 'green darken-2' })
            this.props.logIn(wallet, address, balance)
            this.props.history.push('/profile/')
          })
        })
      } catch (err) {
        Materialize.toast({
          html: "Sorry, that doesn't seem to be an Arweave keyfile. Please try again.",
          classes: 'red darken-4',
        })
      }
    }
  }

  render() {
    return (
      <div>
        <h1>Log In</h1>
        <Dropzone onSelected={files => this.performLogin(files[0])} filename="keyfile" />
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
)(Login)
