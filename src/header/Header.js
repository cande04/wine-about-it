import React from 'react'
import { Link } from 'react-router-dom'

import './Header.scss'

const alwaysOptions = (
  <React.Fragment>
    <Link to="/wine-pairing-list">Wine Pairings</Link>
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
