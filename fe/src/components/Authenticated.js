import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import socketIOClient from 'socket.io-client'
import '../App.css'
import AgentPanel from './AgentPanel'
import IncomingCall from './Incoming'

import { getCurrentAgent } from '../actions'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentUser: null,
      call: null,
      callState: 'Established',
    }
  }

  componentDidMount() {
    const { getCurrentAgent } = this.props

    getCurrentAgent()
  }

  render() {
    const { call, callState } = this.state
    const socket = socketIOClient('http://localhost:3002')

    socket.on('call-update', data => {
      this.setState({ call: data.call, callState: data.call.state })
    })

    console.log(call, callState)

    return (
      <div className="App">
        {callState === 'Established' ? <AgentPanel /> : null}
        {callState === 'Ringing' ? <IncomingCall call={call} /> : null}
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getCurrentAgent,
    },
    dispatch
  )
}

function mapStateToProps(state) {
  return {
    currentAgent: state.agent,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
