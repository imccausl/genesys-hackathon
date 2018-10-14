import React, { Component } from 'react'
import speechRecognition from 'react-speech-recognition'
import { Card, Button } from 'semantic-ui-react'

class Speech extends Component {
  constructor(props) {
    super(props)

    this.state = {
      transcription: null,
      numGood: [],
      numBad: [],
    }
  }

  render() {
    const {
      resetTranscript,
      listening,
      recognition,
      transcript,
      interimTranscript,
      browserSupportsSpeechRecognition,
      transcription,
    } = this.props

    if (!browserSupportsSpeechRecognition) {
      return null
    }

    return (
      <Card style={{ width: '400px', height: '200px' }} centered>
        <Card.Content>
          <div
            dangerouslySetInnerHTML={{
              __html: transcription || transcript,
            }}
          />
        </Card.Content>
        <Card.Content extra>
          <Button
            primary
            onClick={() => {
              this.props.handleAnalyze(transcript)
            }}
          >
            Analyze
          </Button>
        </Card.Content>
      </Card>
    )
  }
}

const options = {
  autoStart: true,
}

export default speechRecognition(options)(Speech)
