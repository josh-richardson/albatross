import { LOG_IN, LOG_OUT, INVALID_WALLET } from "./actionTypes";

export const logIn = wallet => ({
  type: LOG_IN,
  payload: {
    wallet: wallet
  }
});

export const logOut = () => ({
  type: LOG_OUT
});
