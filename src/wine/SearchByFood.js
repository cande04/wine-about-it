import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import FoodForm from './FoodForm'

class SearchByFood extends Component {
  constructor (props) {
    super(props)

    this.state = {
      foodSearch: '',
      wineResults: [],
      pairingText: '',
      loaded: false,
      submitted: false
    }
  }

  handleChange = event => {
    const updatedField = event.target.value
    this.setState({ foodSearch: updatedField })
  }

  handleSubmit = event => {
    event.preventDefault()
    axios(`https://api.spoonacular.com/food/wine/pairing?food=${this.state.foodSearch}&apiKey=6447eeed093f4db6a0690426c5319196`)
      .then(res => this.setState({ wineResults: res.data.pairedWines, pairingText: res.data.pairingText, loaded: true, submitted: true }))
      .catch(console.err)
  }

  render () {
    const { wineResults, pairingText, loaded, submitted } = this.state
    const wineList = wineResults.map((wine, index) => (
      <li key={index}>
        <Link to={`/recommendations/${wine}`}>{ wine }</Link>
      </li>
    ))

    if (submitted) {
      if (!loaded) {
        return <h3>...loading...</h3>
      }

      if (wineResults.length === 0) {
        return <p>could not find a wine pairing!</p>
      }

      if (this.state.wineResults.length !== 0) {
        return (
          <div>
            <h5>{pairingText}</h5>
            <ul>
              {wineList}
            </ul>
          </div>
        )
      }
    }

    return (
      <div>
        <h4>search wine pairings by food</h4>
        <FoodForm
          food={this.state.foodSearch}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}

export default SearchByFood
