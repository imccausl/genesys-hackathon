import agentReducer from './agentReducer'
import currentStatusReducer from './statusReducer'
import { combineReducers } from 'redux'

export default combineReducers({
  agent: agentReducer,
  status: currentStatusReducer,
})
