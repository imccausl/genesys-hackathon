import axios from 'axios'
import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Authenticated from './Authenticated'
import './App.css'

import EmotionCamera from './lib/clmtracker-react'
import Chat from './components/Chat'
class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/Accept" component={Authenticated} />
      </Router>
    )
  }
}

export default App
