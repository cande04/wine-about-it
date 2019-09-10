import React from 'react'
import { Link } from 'react-router-dom'

import './Header.scss'

const alwaysOptions = (
  <React.Fragment>
    <Link to="/wine-pairing-list">Wine Pairings</Link>
    <Link to="/find-wine">Find Wine</Link>
    <Link to="/find-food">Find Dish Pairings</Link>
  </React.Fragment>
)

const Header = ({ user }) => (
  <header className="main-header">
    <h1>Wine About It</h1>
    <nav>
      { alwaysOptions }
    </nav>
  </header>
)

export default Header
