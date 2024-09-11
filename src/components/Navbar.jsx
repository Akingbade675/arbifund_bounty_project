import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useStateContext } from '../context'
import { CustomButton, SmallScreenNav } from './'
import { thirdweb } from '../assets'
import { CustomSnackbar, SearchBar } from './index'
import { handleSnackbarClose } from '../utils'

const Navbar = () => {
  const navigate = useNavigate()
  const { connect, address } = useStateContext()

  // State for managing the Snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')

  const handleConnect = () => {
    // if (address) {
    //   navigate('create-campaign')
    // } else {
    //   connect().then((value) => {
    //     if (!value) {
    //       // Show snackbar if connection fails
    //       setSnackbarMessage(
    //         'Failed to connect wallet. Please install Metamask extension'
    //       )
    //       setToggleDrawer(false)
    //       setSnackbarOpen(true)
    //     }
    //   })
    // }
  }

  const path = window.location.pathname
  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      {/* Logo */}
      <Link to="/" className="sm:flex hidden">
        <h1 className="font-epilogue font-bold text-[28px] text-white tracking-[-0.5%]">
          <span className="font-semibold text-[]">arbi</span>
          <span className="text-[#8c6dfd]">Fundr.</span>
        </h1>
      </Link>
      {path === '/' && <SearchBar />}
      <div className="sm:flex hidden flex-row justify-end gap-4">
        {/* {address && (
          <CustomButton
            btnType="button"
            title="Create a campaign"
            styles="bg-[#1dc071]"
            handleClick={handleConnect}
          />
        )} */}

        <w3m-button
          color="#1dc071"
          balance="hide"
          size="md"
          onClick={() => {
            console.log('clicked')
          }}
        />

        <Link to="/profile">
          <div className="w-[48px] h-[48px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer">
            <img
              src={thirdweb}
              alt="user"
              className="w-[70%] h-[70%] rounded-full object-cover"
            />
          </div>
        </Link>
      </div>
      {/* Small screen navigation */}
      <SmallScreenNav handleConnect={handleConnect} />

      {/* Custom Snackbar */}
      <CustomSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        onClose={handleSnackbarClose(setSnackbarOpen)}
      />
    </div>
  )
}

export default Navbar
