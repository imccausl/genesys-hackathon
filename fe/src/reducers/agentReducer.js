import types from '../ActionTypes'

function currentAgentReducer(state = null, action = null) {
  switch (action.type) {
    case types.user.CURRENT_USER:
      return { user: action.payload }
    default:
      return state
  }
}

export default currentAgentReducer
