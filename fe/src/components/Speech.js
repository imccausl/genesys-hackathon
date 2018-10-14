import React, { Component } from 'react'
import speechRecognition from 'react-speech-recognition'

class Speech extends Component {
  render() {
    const {
      transcript,
      resetTranscript,
      browserSupportsSpeechRecognition,
    } = this.props

    if (!browserSupportsSpeechRecognition) {
      return null
    }

    return <div>{transcript}</div>
  }
}

const options = {
  autoStart: true,
}

export default speechRecognition(options)(Speech)
