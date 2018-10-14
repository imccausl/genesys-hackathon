import Clm from 'clmtrackr'
import React, { Component } from 'react'
import _ from 'lodash'

import EmotionClassifier from './utils/emotion_classifier'
import emotionModel from './utils/emotionmodel'
import { Bar } from '../d3-visualize'

class ClmCamera extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currEmotion: '',
      currProfile: [],
      emotionOverTime: [],
      videoTop: 0,
      VideoLeft: 0,
    }
  }

  componentDidMount() {
    const ctrack = new Clm.tracker({ useWebGL: true })
    const overlayCC = this.overlay.getContext('2d')
    const ec = new EmotionClassifier()

    // store left and top of video in state for positioning of canvas
    this.setState({
      videoTop: this.video.offsetTop,
      videoLeft: this.video.offsetLeft,
    })

    delete emotionModel['disgusted']
    delete emotionModel['fear']

    ec.init(emotionModel)

    // use browser api for getting video from the webcam
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then(this.userMediaHandler.bind(this))
      .catch(this.userMediaFailed.bind(this))

    ctrack.init()

    this.ctrack = ctrack
    this.overlayCC = overlayCC
    this.ec = ec

    this.video.addEventListener('canplay', this.startVideo.bind(this), false)
  }

  startVideo() {
    this.video.play()
    this.ctrack.start(this.video)
    this.drawLoop()
  }

  drawLoop() {
    requestAnimationFrame(this.drawLoop.bind(this))

    const width = parseInt(this.props.width) || 400
    const height = parseInt(this.props.height) || 300
    const cp = this.ctrack.getCurrentParameters()
    const er = this.ec.meanPredict(cp)

    this.overlayCC.clearRect(0, 0, width, height)

    if (this.ctrack.getCurrentPosition()) {
      this.ctrack.draw(this.overlay)
    }

    if (er) {
      const currEmotion = _.maxBy(er, o => o.value)
      // this.collectDataOverTime(currEmotion)
      this.setState({ currEmotion, currProfile: er })
    }
  }

  collectDataOverTime(data) {
    const DATA_LIMIT = 120

    let emotionData = this.state.emotionOverTime

    if (this.state.currEmotion.emotion !== data.emotion) {
      if (emotionData.length > DATA_LIMIT) {
        emotionData = [{ time: Date.now(), emotion: data.emotion }]
      } else {
        emotionData.push({ time: Date.now(), emotion: data.emotion })
      }
    }

    this.setState({ emotionOverTime: emotionData })
  }

  userMediaHandler(stream) {
    if ('srcObject' in this.video) {
      this.video.srcObject = stream
    } else {
      this.video.src =
        (window.URL && window.URL.createObjectURL(stream)) || stream
    }

    this.video.play()
  }

  userMediaFailed(err) {
    console.log('Error:', err)
  }

  render() {
    const overlayStyle = {
      display: this.props.hideOverlay ? 'none' : 'block',
      position: 'absolute',
      left: this.state.videoLeft,
      top: this.state.videoTop,
    }

    return (
      <div className="video-output" style={{ zIndex: '10' }}>
        <div>
          Agent: {this.props.firstName} {this.props.lastName}
        </div>
        <video
          className="standard-shadow"
          style={{ borderRadius: '12px' }}
          width={this.props.width || '400'}
          height={this.props.height || '300'}
          ref={video => {
            this.video = video
          }}
        />

        <canvas
          style={overlayStyle}
          width={this.props.width || '400'}
          height={this.props.height || '300'}
          ref={canvas => {
            this.overlay = canvas
          }}
        />
        <Bar data={this.state.currProfile} />
      </div>
    )
  }
}

export default ClmCamera
