import { ADD_APP, RESET_APPS } from "../actionTypes";

const initialState = {
  apps: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_APP: {
      const { app } = action.payload;
      return {
        ...state,
        apps: [...state.apps, app]
      };
    }
    case RESET_APPS: {
      return initialState;
    }
    default:
      return state;
  }
}
