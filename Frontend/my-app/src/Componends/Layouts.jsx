import React, { Children } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const Layouts = ({children}) => {
  return (
    <div className=''>
      <Navbar/>
      {children}
      <Footer/>
    </div>
  )
}

export default Layouts
