import React from 'react'
import Navbar from '../componemts/Navbar'
import Hender from '../componemts/Hender'

const Home = () => {
    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-[url("/bg_img.png")] bg-cover bg-center'>
            <Navbar />
            <Hender />
        </div>
    )
}

export default Home
