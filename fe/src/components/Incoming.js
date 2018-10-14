import React, { Component } from 'react'
import { Header, Modal } from 'semantic-ui-react'

class Incoming extends Component {
  render() {
    const { call } = this.props

    return (
      <Modal open basic size="small">
        <Header icon="call" content={`Incoming Call: ${call.phoneNumber}`} />
        <Modal.Content>
          <div>
            {call.userData[23].value} {call.userData[27].value}
          </div>
          <div />
          <div>Location: {call.userData[28].value}</div>
        </Modal.Content>
      </Modal>
    )
  }
}

export default Incoming
