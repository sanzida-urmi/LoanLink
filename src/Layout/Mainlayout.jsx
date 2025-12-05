import React from 'react'
import Navbar from '../Component/Shared/Navbar'
import { Outlet } from 'react-router'
import Footer from '../Component/Shared/Footer'

function Mainlayout() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar></Navbar>
      <div className='flex-grow'>
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default Mainlayout
