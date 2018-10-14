import React, { Component } from 'react'
import EmotionCamera from '../lib/clmtracker-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getCurrentAgent } from '../actions'
import { Grid, Card } from 'semantic-ui-react'
import Speech from './Speech'
import { BarChart } from 'react-d3-components'

class AgentPanel extends Component {
  constructor(props) {
    super(props)

    this.state = {
      transcription: '',
      numGood: null,
      numBad: null,
    }

    this.handleAnalyzeText = this.handleAnalyzeText.bind(this)
  }

  handleAnalyzeText(transcription) {
    const badWords = [
      'debt',
      'money',
      'overdue',
      'bankrupt',
      'canceled',
      'cancelled',
      'cancel',
    ]
    const goodWords = ['raise', 'free', 'bonus', 'vacation', 'discount']
    let numGood = []
    let numBad = []
    let words = []
    let newString = ''

    words = transcription.split(' ')

    words.forEach(item => {
      if (badWords.indexOf(item) !== -1) {
        numBad.push(item)
        newString = transcription.replace(
          new RegExp(item, 'g'),
          `<span style="color:red;">${item.toUpperCase()}</span>`
        )
      }
    })

    transcription = newString
    words = transcription.split(' ')

    words.forEach(item => {
      if (goodWords.indexOf(item) !== -1) {
        numGood.push(item)
        newString = transcription.replace(
          new RegExp(item, 'g'),
          `<span style="color:green;">${item.toUpperCase()}</span>`
        )
      }
    })

    this.setState({ transcription: newString, numGood, numBad })

    console.log(numGood, numBad)
  }

  render() {
    const { currentAgent } = this.props

    const data = [
      {
        label: 'Good',
        values: [
          {
            x: 'Good',
            y: this.state.numGood ? this.state.numGood.length : 0,
          },
          { x: 'Bad', y: this.state.numBad ? this.state.numBad.length : 0 },
        ],
      },
      {
        label: 'Bad',
        values: [{ x: 'Good', y: 0 }, { x: 'Bad', y: 0 }],
      },
    ]

    return (
      <Grid columns={3} style={{ marginTop: '10px', marginLeft: '2px' }}>
        <Grid.Row stretched>
          <Grid.Column>
            <Speech
              handleAnalyze={this.handleAnalyzeText}
              transcription={this.state.transcription}
            />
          </Grid.Column>

          <Grid.Column>
            <EmotionCamera
              firstName={currentAgent ? currentAgent.user.firstName : ''}
              lastName={currentAgent ? currentAgent.user.lastName : ''}
            />
          </Grid.Column>
          <Grid.Column>
            <Card>
              <Card.Content>
                <BarChart
                  data={data}
                  width={250}
                  height={400}
                  margin={{ top: 10, bottom: 50, left: 50, right: 10 }}
                />
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getCurrentAgent,
    },
    dispatch
  )
}

function mapStateToProps(state) {
  return {
    currentAgent: state.agent,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AgentPanel)
