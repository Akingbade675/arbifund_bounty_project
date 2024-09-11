import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'

import { StateContextProvider } from './context'
import App from './App'
import './index.css'
import './scrollbar-hide.css'
import initializeWeb3Modal from './utils/wallet-connect'

initializeWeb3Modal()

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <Router>
    <StateContextProvider>
      <App />
    </StateContextProvider>
  </Router>
)
