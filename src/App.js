import React, { Component } from 'react'
import { Route } from 'react-router'
import { Link } from 'react-router-dom'

import BinaryGap from './components/BinaryGap'
import CyclicRotation from './components/CyclicRotation'
import './App.css'

const COMPONENTS = {
  '/BinaryGap': [BinaryGap, 'Binary Gap'],
  '/CyclicRotation': [CyclicRotation, 'Cyclic Rotation']
}

class App extends Component {
  render () {
    return (
      <div className='App'>
        <div className='nav'>
          { Object.keys(COMPONENTS).map(key => (
            <Link key={key} to={key}>{ COMPONENTS[key][1] }</Link>
          ))}
        </div>

        { Object.keys(COMPONENTS).map(key => (
          <Route key={key} path={key} component={COMPONENTS[key][0]} exact />
        ))}
      </div>
    )
  }
}

export default App
