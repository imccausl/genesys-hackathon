import React, { Component } from 'react'
import { Container, Row, Col } from 'react-grid-system'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import socketIOClient from 'socket.io-client'
import './App.css'

import EmotionCamera from './lib/clmtracker-react'
import Chat from './components/Chat'
import { getCurrentAgent } from './actions'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentUser: null,
    }
  }

  componentDidMount() {
    const { getCurrentAgent } = this.props

    getCurrentAgent()
  }

  render() {
    const { currentAgent } = this.props
    const socket = socketIOClient('http://localhost:3002')

    socket.on('call-update', data => {
      console.log(data)
    })

    return (
      <div className="App">
        <Container
          style={{ marginTop: '75px', fontSize: '18px', zIndex: '10' }}
        >
          <Row>
            <Col md={4}>
              <EmotionCamera
                firstName={currentAgent ? currentAgent.user.firstName : ''}
                lastName={currentAgent ? currentAgent.user.lastName : ''}
              />
            </Col>

            <Col md={4}>
              <Chat />
            </Col>

            <Col md={4} />
          </Row>
        </Container>
        <div className="bg" />
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
