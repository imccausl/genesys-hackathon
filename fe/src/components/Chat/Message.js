import React, { Component } from 'react'

class Message extends Component {
  constructor(props) {
    super(props)

    this.state = {}

    this.parseTimestamp = this.parseTimestamp.bind(this)
  }

  parseTimestamp(timestamp) {
    const date = new Date(timestamp)

    return `${date.getHours()}:${
      date.getMinutes() < 10 ? '0' : ''
    }${date.getMinutes()}`
  }

  render() {
    const { timestamp, message, type } = this.props
    const displayAvatar = () => {
      if (type !== 'USER_MESSAGE') {
        return (
          <figure className="avatar">
            <img
              alt=""
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80.jpg"
            />
          </figure>
        )
      } else {
        return null
      }
    }

    return (
      <div
        className="mCustomScrollBox mCS-light mCSB_vertical mCSB_inside"
        tabIndex="0"
        style={{ maxHeight: 'none' }}
      >
        <div
          className="mCSB_container mCS_y_hidden mCS_no_scrollbar_y"
          style={{ position: 'relative', top: '0', left: '0' }}
          dir="ltr"
        >
          <div
            className={`message ${
              type === 'USER_MESSAGE' ? 'message-personal' : 'new'
            }`}
          >
            {displayAvatar()}
            <div className="timestamp">{this.parseTimestamp(timestamp)}</div>

            {message}
          </div>
        </div>
      </div>
    )
  }
}

export default Message
