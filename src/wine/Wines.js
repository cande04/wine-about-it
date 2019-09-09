import React, { Component } from 'react'
import axios from 'axios'

class Wines extends Component {
  constructor (props) {
    super(props)

    this.state = {
      wines: [],
      pairingText: null,
      loaded: false
    }
  }

  componentDidMount () {
    axios('https://api.spoonacular.com/food/wine/pairing?food=steak&apiKey=6447eeed093f4db6a0690426c5319196')
      .then(res => this.setState({ wines: res.data.pairedWines, pairingText: res.data.pairingText, loaded: true }))
      .catch(console.err)
  }

  render () {
    const { wines, pairingText, loaded } = this.state
    const wineList = wines.map((wine, index) => (
      <li key={index}>
        {wine}
      </li>
    ))

    if (!loaded) {
      return <h3>...loading...</h3>
    }

    if (wines.length === 0) {
      return <p>could not find a wine pairing!</p>
    }

    return (
      <div>
        <h2>{pairingText}</h2>
        <ul>
          {wineList}
        </ul>
      </div>
    )
  }
}

export default Wines
