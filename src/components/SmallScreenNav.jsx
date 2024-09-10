import { logo, menu } from '../assets'
import { navlinks } from '../constants'
import { useNavigate, Link } from 'react-router-dom'
import { useStateContext } from '../context'
import { CustomButton } from './'
import React, { useState } from 'react'

const SmallScreenNav = ({ toggleDrawer, setToggleDrawer, handleConnect }) => {
  const navigate = useNavigate()
  const [isActive, setIsActive] = useState('dashboard')
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

        <div className="flex mx-4">
          <CustomButton
            btnType="button"
            title={address ? 'Create a campaign' : 'Connect'}
            styles={address ? 'bg-[#1dc071] w-full' : 'bg-[#8c6dfd] w-full'}
            handleClick={handleConnect}
          />
        </div>
      </div>
    </div>
  )
}

export default SmallScreenNav
