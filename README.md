# ArbiFundr - Decentralized Crowdfunding Platform

ArbiFundr is a decentralized crowdfunding platform built on the Arbitrum network, leveraging the power of blockchain technology to create transparent, efficient, and global fundraising campaigns.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Smart Contract](#smart-contract)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Overview

ArbiFundr allows users to create and contribute to fundraising campaigns for various causes, from charity and social impact projects to personal and entrepreneurial ventures. By utilizing blockchain technology, ArbiFundr ensures transparency, reduces intermediary costs, and enables global participation.

## Features

- Create and manage fundraising campaigns
- Contribute to campaigns using cryptocurrency
- Real-time tracking of campaign progress
- Transparent fund allocation and usage
- User-friendly interface for easy navigation and interaction
- Integration with Arbitrum wallet for secure transactions
- Detailed campaign analytics and reporting

## Technology Stack

- Frontend:
  - React.js
  - Tailwind CSS for styling
  - Ethers.js for blockchain interactions
- Backend:
  - Smart Contract written in Rust using Arbitrum Stylus
  - Deployed on Arbitrum Sepolia Testnet

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- An Ethereum wallet (e.g., MetaMask) configured for Arbitrum Sepolia Testnet

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/Akingbade675/arbifundr-frontend.git
   ```

2. Navigate to the project directory:

   ```
   cd arbifundr-frontend
   ```

3. Install dependencies:

   ```
   npm install
   ```

4. Create a `.env` file in the root directory and add the following:

   ```
   REACT_APP_CONTRACT_ADDRESS=your_deployed_contract_address
   REACT_APP_RPC_URL=https://sepolia-rollup.arbitrum.io/rpc
   ```

5. Start the development server:
   ```
   npm start
   ```

## Usage

1. Connect your Arbitrum-compatible wallet (e.g., MetaMask configured for Arbitrum Sepolia).
2. Browse existing campaigns or create a new one.
3. To create a campaign, fill in the required details and set your funding goal.
4. To contribute to a campaign, select the desired amount and confirm the transaction.
5. Track the progress of campaigns you've created or contributed to in your profile.

## Smart Contract

The backend smart contract for ArbiFundr is written in Rust using Arbitrum Stylus and deployed on the Arbitrum Sepolia Testnet.

- **Contract Address**: `0xc40D6Ce7bF33E92E389e3A9208228941F0748116`
- **Arbitrum Sepolia Explorer Link**: [View Contract on Arbitrum Sepolia Explorer](https://sepolia-explorer.arbitrum.io/address/0xc40D6Ce7bF33E92E389e3A9208228941F0748116)

For more details on the smart contract implementation and ABI, please refer to the [arbifundr-contract](https://github.com/Akingbade675/arbiFund_smart_contract) repository.

## Contributing

We welcome contributions to ArbiFundr! Please follow these steps to contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
5. Push to the branch (`git push origin feature/AmazingFeature`)
6. Open a Pull Request

## License

This project is licensed under the Apache License - see the [LICENSE](https://github.com/Akingbade675/arbifund_bounty_project/LICENSE.md) file for details.

---

Thank you for your interest in ArbiFundr! We're excited to see how this platform can revolutionize crowdfunding through blockchain technology.
