import { logo, menu } from '../assets'
import { navlinks } from '../constants'
import { useNavigate, Link } from 'react-router-dom'
import { useStateContext } from '../context'
import { CustomButton } from './'
import React, { useState } from 'react'
import { useWeb3Modal, useWeb3ModalState } from '@web3modal/ethers/react'
import { formatAddress } from '../utils'

const SmallScreenNav = ({ handleConnect }) => {
  const navigate = useNavigate()
  const [isActive, setIsActive] = useState('dashboard')
  const [toggleDrawer, setToggleDrawer] = useState(false)
  const { open, close } = useWeb3Modal()
  const { open: isOpen } = useWeb3ModalState()

  const { address } = useStateContext()

  return (
    <div className="sm:hidden flex justify-between items-center relative">
      {/* <div className="w-[40px] h-[40px] rounded-[10px] bg-[#2c2f32] flex justify-center items-center cursor-pointer">
        <img
          src={logo}
          alt="user"
          className="w-[60%] h-[60%] rounded-full object-fill"
        />
      </div> */}
      {/* Logo */}
      <Link to="/" className="flex">
        <h1 className="font-epilogue font-bold text-[28px] text-white tracking-[-0.5%]">
          <span className="font-semibold text-[]">arbi</span>
          <span className="text-[#8c6dfd]">Fundr.</span>
        </h1>
      </Link>

      <img
        src={menu}
        alt="menu"
        className="w-[34px] h-[34px] object-contain cursor-pointer"
        onClick={() => setToggleDrawer((prev) => !prev)}
      />

      <div
        className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary py-4 ${
          !toggleDrawer ? '-translate-y-[100vh]' : 'translate-y-0'
        } transition-all duration-700`}
      >
        <ul className="mb-4">
          {navlinks.map((link) => (
            <li
              key={link.name}
              className={`flex p-4 ${isActive === link.name && 'bg-[#3a3a43]'}`}
              onClick={() => {
                setIsActive(link.name)
                setToggleDrawer(false)
                navigate(link.link)
              }}
            >
              <img
                src={link.imgUrl}
                alt={link.name}
                className={`w-[24px] h-[24px] object-contain ${
                  isActive === link.name ? 'grayscale-0' : 'grayscale'
                }`}
              />
              <p
                className={`ml-[20px] font-epilogue font-semibold text-[14px] ${
                  isActive === link.name ? 'text-[#1dc071]' : 'text-[#808191]'
                }`}
              >
                {link.name}
              </p>
            </li>
          ))}
        </ul>

        <div className="flex flex-col mx-4 gap-4">
          {address && (
            <CustomButton
              btnType="button"
              title={'Create Campaign'}
              styles={'bg-[#1dc071] w-full'}
              handleClick={() => {
                setToggleDrawer(false)
                navigate('/create-campaign')
              }}
            />
          )}
          <CustomButton
            btnType="button"
            title={
              isOpen
                ? 'Connecting...'
                : address
                ? formatAddress(address)
                : 'Connect Wallet'
            }
            styles={
              address || isOpen
                ? 'bg-[#28282f] w-full rounded-[10px] text-[#868E91FF] min-h-[40px] px-2 border border-[#4F4F58FF]'
                : 'bg-[#8c6dfd] w-full min-h-[48px] px-3'
            }
            handleClick={() => {
              open()
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default SmallScreenNav
