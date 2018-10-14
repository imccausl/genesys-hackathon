import React, { Component } from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

class Incoming extends Component {
  render() {
    const { call } = this.props

    return (
      <Modal open basic size="small">
        <Header icon="call" content={`Incoming Call: ${call.phoneNumber}`} />
        <Modal.Content>
          <div>{call.userData[23].value}</div>
          <div>{call.userData[27].value}</div>
          <div>{call.userData[28].value}</div>
        </Modal.Content>
        <Modal.Actions>
          <Button basic color="red" inverted>
            <Icon name="remove" /> Hang Up
          </Button>
          <Button basic color="green" inverted>
            <Icon name="checkmark" /> Accept
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default Incoming
