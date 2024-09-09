// // create the client with your clientId, or secretKey if in a server environment
// export const client = createThirdwebClient({
//   clientId: '28df26bf44c5627b913f92425d208eb0',
// })

// // connect to your contract
// export const contract = getContract({
//   client,
//   chain: defineChain(421614),
//   address: '0xf765d07d2FD92A859a50B38631db40FBFA40312A',
// })

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react'

import { StateContextProvider } from './context'
import App from './App'
import './index.css'

const CHAINID = 421614

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <ThirdwebProvider
    desiredChainId={CHAINID}
    clientId="28df26bf44c5627b913f92425d208eb0"
  >
    <Router>
      <StateContextProvider>
        <App />
      </StateContextProvider>
    </Router>
  </ThirdwebProvider>
)
