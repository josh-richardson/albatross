import { ADD_APP, FINISH_LOADING, LOG_IN, LOG_OUT, RESET_APPS, SEARCH } from './actionTypes'

export const logIn = (wallet, pubKey, balance) => ({
  type: LOG_IN,
  payload: {
    wallet: wallet,
    address: pubKey,
    balance: balance,
  },
})

export const addApp = app => ({
  type: ADD_APP,
  payload: {
    app: app,
  },
})

export const finishLoading = () => ({
  type: FINISH_LOADING,
})

export const resetApps = () => ({
  type: RESET_APPS,
})

export const logOut = () => ({
  type: LOG_OUT,
})

export const search = query => ({
  type: SEARCH,
  payload: {
    query: query,
  },
})
