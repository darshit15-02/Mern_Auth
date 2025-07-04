import React, { use, useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const Hender = () => {

    const {userData} = useContext(AppContext)

    return (
        <div className='flex flex-col items-center mt-20 px-4 text-center text-gray-800'>

            <img src={assets.header_img} alt='header' className='w-36 h-36 rounded-full mb-6' />

            <h1 className='flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2'>Hey {userData ? userData.name : 'Develpoer'}!
                <img className='w-8 aspect-square' src={assets.hand_wave} alt='hand wave' />
            </h1>

            <h2 className='text-3xl sm:text-5xl font-semiblod mb-4'>Welcome to our App</h2>

            <p className='mb-8 max-w-md'>Let's start with a quick produect tour and we will have you up and running in no time!</p>

            <button className='border border-gary-500 rounded-full px-8 py-2.5 hover:bg-gray-100 transition-all '>
                Get Started
            </button>
        </div>
    )
}

export default Hender
