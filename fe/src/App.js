import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Authenticated from './components/Authenticated'

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/accept" component={Authenticated} />
      </Router>
    )
  }
}

export default App
