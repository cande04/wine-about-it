import React, { Component } from 'react'
import './App.scss'
import { Route } from 'react-router-dom'

import Header from './header/Header'
import Wines from './wine/Wines'

import Alert from 'react-bootstrap/Alert'

class App extends Component {
  constructor () {
    super()

    this.state = {
      alerts: []
    }
  }

  alert = (message, type) => {
    this.setState({ alerts: [...this.state.alerts, { message, type }] })
  }

  render () {
    const { alerts, user } = this.state

    return (
      <React.Fragment>
        <Header user={user} />
        {alerts.map((alert, index) => (
          <Alert key={index} dismissible variant={alert.type}>
            <Alert.Heading>
              {alert.message}
            </Alert.Heading>
          </Alert>
        ))}
        <main className="container">
          <Route path='/wine-pairing-list' render={() => (
            <Wines alert={this.alert} />
          )} />
        </main>
      </React.Fragment>
    )
  }
}

export default App
