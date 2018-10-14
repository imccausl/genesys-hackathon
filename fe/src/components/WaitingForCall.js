import React, { Component } from 'react'
import { Dimmer, Loader, Modal, Header, Icon, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import axios from 'axios'
class Waiting extends Component {
  constructor(props) {
    super(props)

    this.handleSetStatus = this.handleSetStatus.bind(this)
  }

  handleSetStatus() {
    axios
      .get('http://localhost:3002/voice/state', {
        params: 'Ready',
      })
      .then(response => {
        console.log(response)
      })
  }

  render() {
    if (this.props.agentStatus !== 'Ready') {
      return (
        <Modal open basic size="small">
          <Header
            icon="ban"
            content="Uh oh! You're not ready to take a call!"
          />
          <Modal.Content>
            Please set yourself into ready status to receive a call. The phones
            aren't going to answer themselves!
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.handleSetStatus} color="green" inverted>
              <Icon name="checkmark" />
              Ready!
            </Button>
          </Modal.Actions>
        </Modal>
      )
    }

    return (
      <div>
        <Dimmer active>
          <Loader>Waiting for Call...</Loader>
        </Dimmer>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    status: state.status,
  }
}

export default connect(
  mapStateToProps,
  null
)(Waiting)
