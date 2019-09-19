import { LOG_IN, LOG_OUT } from '../action_types'

const initialState = {
  wallet: {},
  isLoggedIn: false,
  balance: 0,
  address: '',
}

export default function(state = initialState, action) {
  switch (action.type) {
    case LOG_IN: {
      const { wallet, address, balance } = action.payload
      return {
        ...state,
        wallet: wallet,
        balance: balance,
        address: address,
        isLoggedIn: true,
      }
    }
    case LOG_OUT: {
      return initialState
    }
    default:
      return state
  }
}
