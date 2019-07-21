import { ADD_APP } from "../actionTypes";

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
    default:
      return state;
  }
}
