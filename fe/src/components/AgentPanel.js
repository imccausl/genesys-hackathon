import React, { Component } from 'react'
import EmotionCamera from '../lib/clmtracker-react'
import Chat from './Chat'
import { Container, Row, Col } from 'react-grid-system'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getCurrentAgent } from '../actions'
import Speech from './Speech'

class AgentPanel extends Component {
  render() {
    const { currentAgent } = this.props

    return (
      <Container style={{ marginTop: '75px', fontSize: '18px', zIndex: '10' }}>
        <Row>
          <Col md={4}>
            <EmotionCamera
              firstName={currentAgent ? currentAgent.user.firstName : ''}
              lastName={currentAgent ? currentAgent.user.lastName : ''}
            />
          </Col>

          <Col md={4}>
            <Speech />
          </Col>

          <Col md={4} />
        </Row>
      </Container>
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
)(AgentPanel)
