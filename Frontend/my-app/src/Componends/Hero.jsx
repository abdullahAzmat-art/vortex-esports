import React from 'react'


const Hero = () => {
  return (
    <div>
      <div data-aos="fade-up"  className='min-h-96 mt-18 grid place-items-center text-center px-4 py-40' >

        <h1 className='text-5xl md:text-8xl  font-extrabold text-white mb-6 addthefont '>Enter the <span >Vort<span className=' '>x</span> </span>
Where Gamers Rise.</h1>
        <p className='text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto addthefont uppercase '>Join thousands of gamers worldwide who trust Vortex for seamless, high-performance cloud gaming. Play anywhere, anytime.</p>
        <div className='flex justify-center space-x-4'>
          <button className='bg-indigo-600 text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-indigo-600  addthefont '>Get Started</button>
          <a  href={"#about"} className='bg-gray-700 text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-gray-600 transition addthefont '>Learn More</a>
        </div>
      </div>
    </div>
  )
}

export default Hero
