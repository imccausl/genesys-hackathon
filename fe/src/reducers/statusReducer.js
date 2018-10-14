import types from '../ActionTypes'

function currentAgentStateReducer(state = null, action = null) {
  switch (action.type) {
    case types.user.CURRENT_STATE:
      return { status: action.payload }
    default:
      return state
  }
}

export default currentAgentStateReducer
