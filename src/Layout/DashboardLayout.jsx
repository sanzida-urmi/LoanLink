import React from "react"
import Navbar from "../Component/Shared/Navbar"
import Footer from "../Component/Shared/Footer"

function DashboardLayout (){
    return (


    <div className='flex flex-col min-h-screen'>
  <Navbar/>
    <div className='flex flex-1'>

        <div className='drawer lg:drawer-open w-80'>
        <input id="my-drawer-3" type='checkbox' className='drawer-toggle' />

        <div className='drawer-side'>
        <label htmlFor='my-drawer-3' className='drawer-overlay'></label>

        <ul className='menu bg-base-200 min-h-full w-80 p-4'>
            <li><a>i1</a></li>
            <li><a>i2</a></li>
        </ul>
        </div>
        </div>
 
    <div className='flex-1 p-4'>
        <h1 className='text-2xl font-black'>hhhhhh</h1>
    </div>

    </div>

  <Footer></Footer>

  </div>
  )
}

export default DashboardLayout