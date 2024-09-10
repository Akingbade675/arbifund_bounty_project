import React, { useContext, createContext, useState, useEffect } from 'react'
import { ethers } from 'ethers'
import arbiFundABI from '../arbiFundABI.json'

const StateContext = createContext()

export const StateContextProvider = ({ children }) => {
  const [provider, setProvider] = useState(null)
  const [signer, setSigner] = useState(null)
  const [contract, setContract] = useState(null)
  const [address, setAddress] = useState(null)

  const contractAddress = '0xc40D6Ce7bF33E92E389e3A9208228941F0748116'

  useEffect(() => {
    const init = async () => {
      await initailze()
    }

    init()
  }, [])

  const initailze = async () => {
    if (typeof window.ethereum === 'undefined') {
      // connect only to the arbitrum sepolia testnet
      const provider = new ethers.providers.JsonRpcProvider(
        'https://arbitrum-sepolia.infura.io/v3/3b568232acda4b79b692133e5250782f'
      )
      setProvider(provider)

      const contract = new ethers.Contract(
        contractAddress,
        arbiFundABI,
        provider
      )
      setContract(contract)
    }
  }

  const connect = async () => {
    console.log('connecting')
    if (typeof window.ethereum !== 'undefined') {
      await window.ethereum.request({ method: 'eth_requestAccounts' })
      const provider = new ethers.providers.Web3Provider(window.ethereum, {
        chainId: 421614,
      })
      setProvider(provider)

      const signer = provider.getSigner()
      const chainId = await signer.getChainId()
      if (chainId !== 421614) {
        alert('Please connect to the Arbitrum Sepolia testnet')
        return
      }
      setSigner(signer)

      const contract = new ethers.Contract(contractAddress, arbiFundABI, signer)
      setContract(contract)

      const address = await signer.getAddress()
      setAddress(address)
      return address
    }

    return null
  }

  const publishCampaign = async (form) => {
    try {
      if (!signer) {
        await connect()
      }

      const address = provider.getSigner().getAddress()

      const data = await contract.createCampaign(
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
        let deadline
        if (i === 0) {
          deadline = new Date('2024-09-29').getTime()
        } else {
          deadline = campaign[6].toNumber()
        }
        return {
          owner: campaign[0],
          title: campaign[1],
          description: campaign[2],
          category: campaign[3],
          link: campaign[4],
          target: ethers.utils.formatEther(campaign[5]),
          deadline: deadline,
          amountCollected: ethers.utils.formatEther(campaign[7]),
          image: campaign[8],
          pId: i,
        }
      })
      return parsedCampaigns
    } catch (error) {
      console.log(error, error)
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
      if (!signer) {
        await connect()
      }
      const data = await contract.donateToCampaign(pId, {
        value: ethers.utils.parseEther(amount),
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
        donation: ethers.utils.formatEther(donations[1][i]),
      })
    }

    return parsedDonations
  }

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
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
