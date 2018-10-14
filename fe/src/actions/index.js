import axios from 'axios'
import types from '../ActionTypes'

const API_URL = 'http://localhost:3002'

export function getCurrentAgent() {
  return function(dispatch) {
    axios.get(`${API_URL}/current-session`).then(response => {
      dispatch({
        type: types.user.CURRENT_USER,
        payload: response.data,
      })
    })
  }
}

export function getCurrentStatus() {
  return function(dispatch) {
    axios.get(`${API_URL}/voice/state`).then(response => {
      console.log(response.data)
      dispatch({
        type: types.user.CURRENT_STATE,
        payload: response.data.dn,
      })
    })
  }
}
