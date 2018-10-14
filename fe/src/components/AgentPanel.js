import React, { Component } from 'react'
import EmotionCamera from '../lib/clmtracker-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getCurrentAgent } from '../actions'
import { Grid } from 'semantic-ui-react'
import Speech from './Speech'

class AgentPanel extends Component {
  render() {
    const { currentAgent } = this.props

    return (
      <Grid columns={2} style={{ marginTop: '10px', marginLeft: '10px' }}>
        <Grid.Row stretched>
          <Grid.Column>
            <Speech />
          </Grid.Column>

          <Grid.Column>
            <EmotionCamera
              firstName={currentAgent ? currentAgent.user.firstName : ''}
              lastName={currentAgent ? currentAgent.user.lastName : ''}
            />
          </Grid.Column>

        </Grid.Row>
      </Grid>
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
