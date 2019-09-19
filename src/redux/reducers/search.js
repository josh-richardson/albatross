import { SEARCH } from '../action_types'

const initialState = {
  query: '',
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SEARCH: {
      const { query } = action.payload
      return {
        ...state,
        query: query,
      }
    }
    default:
      return state
  }
}
