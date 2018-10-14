import agentReducer from './agentReducer'
import { combineReducers } from 'redux'

export default combineReducers({
  agent: agentReducer,
})
