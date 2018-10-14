import React, { Component } from 'react'

class ChatWindow extends Component {
  constructor(props) {
    super(props)

    this.state = { message: '' }

    this.handleTextInput = this.handleTextInput.bind(this)
    this.formatNewMessage = this.formatNewMessage.bind(this)
  }

  handleTextInput(e) {
    this.setState({ message: e.target.value })
  }

  formatNewMessage() {
    const { message } = this.state

    return {
      message,
      timestamp: Date.now(),
      type: 'USER_MESSAGE',
    }
  }

  render() {
    const { message } = this.state

    return (
      <div>
        <div className="chat">
          <div className="chat-title">
            <h1>{this.props.name}</h1>
            <h2>{this.props.location}</h2>
            <figure className="avatar">
              <img
                alt=""
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80.jpg"
              />
            </figure>
          </div>

          <div className="messages">{this.props.children}</div>

          <div className="message-box">
            <textarea
              type="text"
              className="message-input"
              value={message}
              onChange={this.handleTextInput}
              placeholder="Type message..."
            />
            <button
              type="submit"
              className="message-submit"
              onClick={() => {
                this.props.handleSubmitChat(this.formatNewMessage())
                this.setState({ message: '' })
              }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default ChatWindow
