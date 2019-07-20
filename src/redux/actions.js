import { LOG_IN, LOG_OUT } from "./actionTypes";

export const logIn = (wallet, pubKey) => ({
  type: LOG_IN,
  payload: {
    wallet: wallet,
    pubKey: pubKey
  }
});

export const logOut = () => ({
  type: LOG_OUT
});
