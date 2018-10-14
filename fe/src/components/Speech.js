import React, { Component } from 'react'
import speechRecognition from 'react-speech-recognition'
import { Card } from 'semantic-ui-react'

class Speech extends Component {
  constructor(props) {
    super(props)

    this.state = {
      transcription: this.props.transcript,
      badKeywords: [],
    }
  }
  componentWillReceiveProps(nextProps) {
    const { newTranscript } = nextProps
    const { transcript } = this.props
    const { badKeywords } = this.state
    const badWords = ['debt', 'money', 'overdue', 'bankrupt']
    const goodWords = ['raise', 'free', 'bonus', 'vacation', 'discount']

    let words = null
    let newString = ''

    if (newTranscript === transcript) {
      return
    }

    words = transcript.split(' ')

    words.forEach(item => {
      if (badWords.indexOf(item) !== -1) {
        newString = transcript.replace(
          new RegExp(item, 'g'),
          `<span style="color:red;">${item}</span>`
        )
        //badKeywords.push(item)
      }

      if (goodWords.indexOf(item) !== -1) {
        newString = transcript.replace(
          new RegExp(item, 'g'),
          `<span style="color:green;">${item}</span>`
        )
      }

      if (newString) {
        this.setState({ transcription: newString, badKeywords })
      }
    })
  }

  render() {
    console.log(this.state.badKeywords)
    const {
      resetTranscript,
      listening,
      recognition,
      transcript,
      interimTranscript,
      browserSupportsSpeechRecognition,
    } = this.props

    const { transcription } = this.state

    if (!browserSupportsSpeechRecognition) {
      return null
    }

    if (!listening) {
      recognition.start()
    }

    return (
      <Card style={{ width: '400px', height: '200px' }} centered>
        <Card.Content>
          <div dangerouslySetInnerHTML={{ __html: transcription }} />
        </Card.Content>
      </Card>
    )
  }
}

const options = {
  autoStart: true,
}

export default speechRecognition(options)(Speech)
