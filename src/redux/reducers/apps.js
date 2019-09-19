import { ADD_APP, FINISH_LOADING, RESET_APPS } from '../action_types'

const initialState = {
  entries: [],
  loading: true,
}

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_APP: {
      const { app } = action.payload
      return {
        ...state,
        entries: [...state.entries, app],
      }
    }
    case RESET_APPS: {
      return initialState
    }
    case FINISH_LOADING: {
      return {
        ...state,
        loading: false,
      }
    }
    default:
      return state
  }
}
