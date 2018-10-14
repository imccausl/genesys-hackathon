import React, { Component } from 'react'

class MessageLoading extends Component {
  render() {
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
          <div className={`message loading new`}>
            {
              // <figure className="avatar">
              //   <img alt="" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80.jpg" />
              // </figure>
            }
            <span />
          </div>
        </div>
      </div>
    )
  }
}

export default MessageLoading
