import React from 'react'
import Navbar from '../Component/Shared/Navbar'
import { Outlet } from 'react-router'
import Footer from '../Component/Shared/Footer'

function Mainlayout() {
  return (
    <div className='flex flex-col min-h-screen px-7'>
      <div className='sticky top-0 z-50'>
        <Navbar></Navbar>
      </div>
      <div className='flex-grow'>
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default Mainlayout
