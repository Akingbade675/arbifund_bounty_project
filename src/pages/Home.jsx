import React, { useState, useEffect, useMemo } from 'react'
import { DisplayCampaigns } from '../components'
import { useStateContext } from '../context'

const allCategories = [
  'All',
  'Technology',
  'Health',
  'Education',
  'Environment',
  'Community',
  'Creative',
  'Business',
  'Other',
]

const Home = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [campaigns, setCampaigns] = useState([])
  const [activeCategory, setActiveCategory] = useState('All')

  const { address, contract, getCampaigns } = useStateContext()

  const fetchCampaigns = async () => {
    setIsLoading(true)
    console.log('getting data......')
    const data = await getCampaigns()
    console.log(data, data)
    setCampaigns(data)
    setIsLoading(false)
  }

  useEffect(() => {
    if (contract) fetchCampaigns()
  }, [address, contract])

  const availableCategories = useMemo(() => {
    const categories = new Set(campaigns.map((campaign) => campaign.category))
    return [
      'All',
      ...allCategories.filter((category) => categories.has(category)),
    ]
  }, [campaigns])

  const filteredCampaigns =
    activeCategory === 'All'
      ? campaigns
      : campaigns.filter((campaign) => campaign.category === activeCategory)

  return (
    <div>
      {campaigns.length !== 0 && (
        <div className="overflow-x-auto whitespace-nowrap pb-4 scrollbar-hide">
          <div className="inline-flex space-x-4 pb-2">
            {availableCategories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                  activeCategory === category
                    ? 'font-inter font-semibold bg-gradient-to-r from-[#1dc071] to-[#6fdf60] text-white'
                    : 'font-epilogue hover:font-bold bg-[#2c2f32] text-[#808191] hover:bg-[#3a3d41]'
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}

      <DisplayCampaigns
        // title={`${activeCategory} Campaigns`}
        isLoading={isLoading}
        campaigns={filteredCampaigns}
      />
    </div>
  )
}

export default Home

// import React, { useState, useEffect } from 'react'

// import { DisplayCampaigns } from '../components'
// import { useStateContext } from '../context'

// const Home = () => {
//   const [isLoading, setIsLoading] = useState(false)
//   const [campaigns, setCampaigns] = useState([])

//   const { address, contract, getCampaigns } = useStateContext()

//   const fetchCampaigns = async () => {
//     setIsLoading(true)
//     const data = await getCampaigns()
//     setCampaigns(data)
//     setIsLoading(false)
//   }

//   useEffect(() => {
//     if (contract) fetchCampaigns()
//   }, [address, contract])

//   return (
//     <DisplayCampaigns
//       title="All Campaigns"
//       isLoading={isLoading}
//       campaigns={campaigns}
//     />
//   )
// }

// export default Home
