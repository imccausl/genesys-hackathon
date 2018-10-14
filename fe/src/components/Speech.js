import React, { Component } from 'react'
import speechRecognition from 'react-speech-recognition'
import { Card } from 'semantic-ui-react'

class Speech extends Component {
  
  componentWillReceiveProps(nextProps) {
    // const { transcript } = this.state
    // const badWords = ['debt', 'money', 'overdue', 'bankrupt']
    // const goodWords = ['raise', 'free', 'bonus', 'vacation', 'discount']

    // let words = []
    // let newString = ''

    // words = transcript.split(' ')

    // words.forEach(item => {
    //   if (badWords.indexOf(item) !== -1) {
    //     newString = transcript.replace(
    //       new RegExp(item, 'g'),
    //       `<span style="color:red;">${item}</span>`
    //     )
    //   }

    //   this.setState({ transcription: newString })
    // })

    //   words.forEach(item => {
    //     if (goodWords.indexOf(item) !== -1) {
    //       newString = transcript.replace(
    //         new RegExp(item, 'g'),
    //         `<span style="color:red;">${item}</span>`
    //       )
    //     }

    //     this.setState({ transcription: newString })
    //   })
  }

  render() {
    const {
      resetTranscript,
      listening,
      recognition,
      transcript,
      interimTranscript,
      browserSupportsSpeechRecognition,
    } = this.props

    if (!browserSupportsSpeechRecognition) {
      return null
    }

    return (
      <Card style={{ width: '400px', height: '200px' }} centered>
        <Card.Content>
          <div>{ transcript }</div>
        </Card.Content>
      </Card>
    )
  }
}

const options = {
  autoStart: true,
}

export default speechRecognition(options)(Speech)
