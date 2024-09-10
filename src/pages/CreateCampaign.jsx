import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ethers } from 'ethers'

import { useStateContext } from '../context'
import { money } from '../assets'
import { CustomButton, FormField, Loader } from '../components'
import { checkIfImage } from '../utils'
import CustomSnackbar from '../components/SnackBar'

const CreateCampaign = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const { createCampaign } = useStateContext()
  const [form, setForm] = useState({
    name: '',
    title: '',
    description: '',
    target: '',
    deadline: '',
    image: '',
    category: '',
    link: '',
  })

  const categories = [
    'Technology',
    'Health',
    'Education',
    'Environment',
    'Community',
    'Creative',
    'Business',
    'Other',
  ]

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    checkIfImage(form.image, async (exists) => {
      if (exists) {
        setIsLoading(true)
        await createCampaign({
          ...form,
          target: ethers.utils.parseUnits(form.target, 18),
        })
        setIsLoading(false)
        navigate('/')
      } else {
        ;<CustomSnackbar message="Please provide a valid image URL" />
        setForm({ ...form, image: '' })
      }
    })
  }

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && <Loader />}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
          Start a Campaign
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full mt-[65px] flex flex-col gap-[30px]"
      >
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Your Name *"
            placeholder="John Doe"
            inputType="text"
            value={form.name}
            handleChange={(e) => handleFormFieldChange('name', e)}
          />
          <FormField
            labelName="Campaign Title *"
            placeholder="Write a title"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange('title', e)}
          />
        </div>

        <FormField
          labelName="Story *"
          placeholder="Write your story"
          isTextArea
          value={form.description}
          handleChange={(e) => handleFormFieldChange('description', e)}
        />

        <div className="flex flex-wrap gap-[40px] w-full">
          <div className="flex flex-col w-full">
            <label
              htmlFor="category"
              className="flex-1 w-full font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]"
            >
              Category *
            </label>
            <select
              id="category"
              value={form.category}
              onChange={(e) => handleFormFieldChange('category', e)}
              className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option
                  key={category}
                  value={category}
                  className="bg-[#1c1c24]"
                >
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full flex justify-start items-center p-4 bg-gradient-to-r from-[#4a0e78] via-[#6a1b9a] to-[#7b1fa2] h-[120px] rounded-[10px] shadow-lg">
            <img
              src={money}
              alt="money"
              className="w-[40px] h-[40px] object-contain"
            />
            <h4 className="font-epilogue font-bold text-[25px] text-white ml-[20px]">
              You will get 100% of the raised amount
            </h4>
          </div>

          <FormField
            labelName="Goal (ETH) *"
            placeholder="0.50"
            inputType="text"
            value={form.target}
            handleChange={(e) => handleFormFieldChange('target', e)}
          />
          <FormField
            labelName="End Date *"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange('deadline', e)}
          />
        </div>

        <FormField
          labelName="Campaign image *"
          placeholder="Place image URL of your campaign"
          inputType="url"
          value={form.image}
          handleChange={(e) => handleFormFieldChange('image', e)}
        />

        <FormField
          labelName="Relevant Link"
          placeholder="Your website, social media, etc."
          inputType="url"
          value={form.link}
          handleChange={(e) => handleFormFieldChange('link', e)}
        />

        <div className="flex justify-center items-center mt-[40px]">
          <CustomButton
            btnType="submit"
            title="Submit new campaign"
            styles="bg-gradient-to-r from-[#1dc071] to-[#4aed88]"
            // styles="bg-gradient-to-r from-[#95C01DFF] to-[#4aed88]"
          />
        </div>
      </form>
    </div>
  )
}

export default CreateCampaign
