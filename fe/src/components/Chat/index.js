import React, { Component } from 'react'

import ChatWindow from './ChatWindow'
import Message from './Message'
import MessageLoading from './MessageLoading'

class Chat extends Component {
  constructor(props) {
    super(props)

    this.state = {
      messages: [],
      loading: true,
    }

    this.handleSubmitChat = this.handleSubmitChat.bind(this)
  }

  componentDidMount() {
    setTimeout(() => {
      const { messages } = this.state
      const agentMessage = {
        message: 'testing',
        timestamp: Date.now(),
        type: 'AGENT_MESSAGE',
      }

      messages.push(agentMessage)

      this.setState({ messages, loading: false })
    }, 2500)
  }

  handleSubmitChat(newMessage) {
    const { messages } = this.state

    messages.push(newMessage)

    this.setState({ messages })
  }

  render() {
    const { messages, loading } = this.state

    return (
      <ChatWindow handleSubmitChat={this.handleSubmitChat}>
        {messages.length > 0
          ? messages.map((m, i) => (
              <Message
                key={i}
                type={m.type}
                message={m.message}
                timestamp={m.timestamp}
              />
            ))
          : null}
        {loading ? <MessageLoading /> : null}
      </ChatWindow>
    )
  }
}

export default Chat
