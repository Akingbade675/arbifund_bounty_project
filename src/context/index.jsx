import React, { useContext, createContext, useState, useEffect } from 'react'
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
  useSwitchNetwork,
} from '@web3modal/ethers/react'
import { ethers } from 'ethers'
import arbiFundABI from '../arbiFundABI.json'

const StateContext = createContext()

export const StateContextProvider = ({ children }) => {
  const [contract, setContract] = useState(null)
  const { address, isConnected, chainId } = useWeb3ModalAccount()
  const { walletProvider } = useWeb3ModalProvider()
  const { switchNetwork } = useSwitchNetwork()

  const contractAddress = '0xc40D6Ce7bF33E92E389e3A9208228941F0748116'

  useEffect(() => {
    const init = async () => {
      await initailze()
    }

    init()
  }, [])

  const initailze = async () => {
    const provider = new ethers.JsonRpcProvider(
      'https://arbitrum-sepolia.infura.io/v3/3b568232acda4b79b692133e5250782f',
      {
        chainId: 421614,
        name: 'arbitrumSepolia',
      }
    )

    const contract = new ethers.Contract(contractAddress, arbiFundABI, provider)
    setContract(contract)
  }

  const signContract = async () => {
    console.log('connecting')
    if (isConnected) {
      const ethersProvider = new ethers.BrowserProvider(walletProvider)
      const signer = await ethersProvider.getSigner()
      console.log('signer', signer)

      if (chainId !== 421614) await switchNetwork(421614)

      const contract = new ethers.Contract(contractAddress, arbiFundABI, signer)
      setContract(contract)
      console.log('contract', contract)

      return contract
    }

    return null
  }

  const publishCampaign = async (form) => {
    try {
      if (!isConnected) {
        alert('Please connect to a wallet')
        return
      }

      const w3Contract = await signContract()
      console.log('Signing transaction', w3Contract)

      const data = await w3Contract.createCampaign(
        address,
        form.title,
        form.description,
        form.category,
        form.link,
        form.target,
        new Date(form.deadline).getTime(),
        form.image
      )
      await data.wait()
      console.log('Campaign created successfully', data)
    } catch (error) {
      console.error('Failed to create campaign', error)
    }
  }

  const getCampaigns = async () => {
    try {
      const data = await contract.getCampaigns()
      const parsedCampaigns = data.map((campaign, i) => {
        console.log(campaign)
        return {
          owner: campaign[0],
          title: campaign[1],
          description: campaign[2],
          category: campaign[3] === '' ? 'Technology' : campaign[3], // This is a fallback in case the category is not set
          link: campaign[4],
          target: ethers.formatEther(campaign[5]),
          deadline: Number(campaign[6]),
          amountCollected: ethers.formatEther(campaign[7]),
          image: campaign[8],
          pId: i,
        }
      })
      return parsedCampaigns
    } catch (error) {
      console.log('error', error)
    }
  }

  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns()
    const filteredCampaigns = allCampaigns.filter(
      (campaign) => campaign.owner === address
    )
    return filteredCampaigns
  }

  const donate = async (pId, amount) => {
    try {
      if (!isConnected) {
        alert('Please connect to a wallet')
        return
      }

      const w3Contract = await signContract()

      const data = await w3Contract.donateToCampaign(pId, {
        value: ethers.parseEther(amount),
      })
      await data.wait()
      return data
    } catch (error) {
      console.error('Failed to donate', error)
    }
  }

  const getDonations = async (pId) => {
    const donations = await contract.getDonators(pId)
    const numberOfDonations = donations[0].length
    const parsedDonations = []

    for (let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.formatEther(donations[1][i]),
      })
    }

    return parsedDonations
  }

  return (
    <StateContext.Provider
      value={{
        address,
        isConnected,
        contract,
        createCampaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations,
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext)
