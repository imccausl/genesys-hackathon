import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import socketIOClient from 'socket.io-client'
import '../App.css'
import AgentPanel from './AgentPanel'
import IncomingCall from './Incoming'
import Waiting from './WaitingForCall'
import { getCurrentAgent, getCurrentStatus } from '../actions'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentUser: null,
      call: null,
      callState: null,
      socket: socketIOClient('http://localhost:3002'),
    }
  }

  componentDidMount() {
    const { getCurrentAgent } = this.props

    getCurrentAgent()
    getCurrentStatus()

    this.state.socket.on('call-update', data => {
      this.setState({ call: data.call, callState: data.call.state })
    })

    this.state.socket.on('voice-update', data => {
      this.setState({ status: data.dn.agentState })
    })
  }

  render() {
    const { call, callState } = this.state

    if (callState === 'Established') {
      return (
        <div className="App">
          <AgentPanel />
        </div>
      )
    }

    if (callState === 'Ringing') {
      return (
        <div className="App">
          <IncomingCall call={call} />
        </div>
      )
    }

    return (
      <div className="App">
        <Waiting agentStatus={this.state.status || this.props.initialState} />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getCurrentAgent,
      getCurrentStatus,
    },
    dispatch
  )
}

function mapStateToProps(state) {
  return {
    currentAgent: state.user,
    initialState: state.status,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
