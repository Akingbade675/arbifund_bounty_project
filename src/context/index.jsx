import React, { useContext, createContext, useState, useEffect } from 'react'
import { ethers } from 'ethers'
import contractABI from '../contractABI.json'

const StateContext = createContext()

export const StateContextProvider = ({ children }) => {
  const [provider, setProvider] = useState(null)
  const [signer, setSigner] = useState(null)
  const [contract, setContract] = useState(null)
  const [address, setAddress] = useState(null)

  const contractAddress = '0xf765d07d2FD92A859a50B38631db40FBFA40312A'

  useEffect(() => {
    const init = async () => {
      await connect()
    }

    init()
  }, [])

  const connect = async () => {
    if (typeof window.ethereum !== 'undefined') {
      await window.ethereum.request({ method: 'eth_requestAccounts' })
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      setProvider(provider)

      const signer = provider.getSigner()
      setSigner(signer)

      const contract = new ethers.Contract(contractAddress, contractABI, signer)
      setContract(contract)

      const address = await signer.getAddress()
      setAddress(address)
    }
  }

  const publishCampaign = async (form) => {
    try {
      const data = await contract.createCampaign(
        address,
        form.title,
        form.description,
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
    const data = await contract.getCampaigns()
    const parsedCampaigns = data.map((campaign, i) => {
      console.log(campaign)
      let deadline
      if (i === 0) {
        deadline = new Date('2024-09-29').getTime()
      } else {
        deadline = campaign[4].toNumber()
      }
      return {
        owner: campaign[0],
        title: campaign[1],
        description: campaign[2],
        target: ethers.utils.formatEther(campaign[3]),
        deadline: deadline,
        amountCollected: ethers.utils.formatEther(campaign[5]),
        image: campaign[6],
        pId: i,
      }
    })
    return parsedCampaigns
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
