import { ADD_APP, LOG_IN, LOG_OUT, RESET_APPS } from "./actionTypes";

export const logIn = (wallet, pubKey, balance) => ({
  type: LOG_IN,
  payload: {
    wallet: wallet,
    address: pubKey,
    balance: balance
  }
});

export const addApp = (app) => ({
  type: ADD_APP,
  payload: {
    app: app
  }
});

export const resetApps = () => ({
  type: RESET_APPS
});


export const logOut = () => ({
  type: LOG_OUT
});
