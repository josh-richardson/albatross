import {LOG_IN, LOG_OUT} from "../actionTypes";

const initialState = {
    wallet: {},
    isLoggedIn: 0
};


export default function (state = initialState, action) {
    switch (action.type) {
        case LOG_IN: {
            const {wallet} = action.payload;
            return {
                ...state, wallet: wallet, isLoggedIn: 1
            }
        }
        case LOG_OUT: {
            return {...state, isLoggedIn: 0}
        }
        default:
            return state;
    }
}
