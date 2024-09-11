import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'

export default function initializeWeb3Modal() {
  const projectId = '5e7140981893c6d37097aeab309a81fe'

  const metadata = {
    name: 'ArbiFund',
    description: 'AppKit Example',
    url: 'https://arbifund.netlify.app', // origin must match your domain & subdomain
    icons: ['https://avatars.githubusercontent.com/u/37784886'],
  }

  const arbitrumSepolia = {
    name: 'Arbitrum Sepolia',
    chainId: 421614,
    shortName: 'arbsep',
    chain: 'ARBITRUM',
    network: 'testnet',
    networkId: 421614,
    nativeCurrency: {
      name: 'Arbitrum Ether',
      symbol: 'ARETH',
      decimals: 18,
    },
    rpcUrls: ['https://sepolia-rollup.arbitrum.io/rpc'],
    blockExplorerUrls: ['https://sepolia.arbiscan.io'],
  }

  // 4. Create Ethers config
  const ethersConfig = defaultConfig({
    /*Required*/
    metadata,

    /*Optional*/
    enableEIP6963: true, // true by default
    enableInjected: true, // true by default
    enableCoinbase: true, // true by default
    rpcUrl: '...', // used for the Coinbase SDK
    defaultChainId: 41, // used for the Coinbase SDK
  })

  // 5. Create a Web3Modal instance
  createWeb3Modal({
    ethersConfig,
    chains: [arbitrumSepolia],
    projectId,
    enableAnalytics: true, // Optional - defaults to your Cloud configuration
    themeVariables: {
      '--w3m-accent': '#8c6dfd',
      '--w3m-font-family': 'Epilogue',
      '--w3m-border-radius-master': '100px',
    },
  })
}
