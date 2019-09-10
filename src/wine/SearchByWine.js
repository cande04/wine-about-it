import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import WineForm from './WineForm'

class SearchByWine extends Component {
  constructor (props) {
    super(props)

    this.state = {
      wineSearch: '',
      foodResults: [],
      pairingText: '',
      loaded: false,
      submitted: false
    }
  }

  handleChange = event => {
    this.setState({ wineSearch: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault()
    axios(`https://api.spoonacular.com/food/wine/dishes?wine=${this.state.wineSearch}&apiKey=6447eeed093f4db6a0690426c5319196`)
      .then(res => this.setState({ foodResults: res.data.pairings, pairingText: res.data.text, loaded: true, submitted: true }))
      .catch(console.err)
  }

  render () {
    const { foodResults, pairingText, loaded, submitted } = this.state
    const foodList = foodResults.map((food, index) => (
      <li key={index}>
        <Link to={`/recipes/${food}`}>{food}</Link>
      </li>
    ))

    if (submitted) {
      if (!loaded) {
        return <h3>...loading...</h3>
      }

      if (foodResults.length === 0) {
        return <p>could not find food pairings for this wine</p>
      }

      if (this.state.foodResults.length !== 0) {
        return (
          <div>
            <h5>{pairingText}</h5>
            <ul>
              {foodList}
            </ul>
          </div>
        )
      }
    }

    return (
      <div>
        <h4>search food pairings by wine</h4>
        <WineForm
          food={this.state.wineSearch}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}

export default SearchByWine
