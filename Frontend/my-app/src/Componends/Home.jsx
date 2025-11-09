import React from 'react'
import Hero from './Hero'

import Aboutus from './Abdoutus'
import Announcement from './Announcement'
import Tournamentcard from './Tournamentcard'

const Home = () => {
  return (
    <div className='z-10 relative'>
      <Hero/>
      <Aboutus/>
      <Announcement/>
      <Tournamentcard/>
    </div>
  )
}

export default Home
