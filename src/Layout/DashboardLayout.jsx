import React from "react"
import Navbar from "../Component/Shared/Navbar"
import Footer from "../Component/Shared/Footer"
import { Link, NavLink, Outlet } from "react-router"
import { Helmet } from 'react-helmet';
import useRole from "../hooks/useRole";
import LoadingSpinner from "../Component/Shared/LoadingSpinner";


function DashboardLayout (){
const [role, isRoleLoading] = useRole();
if(isRoleLoading){
  <LoadingSpinner>

  </LoadingSpinner>
}

    return (


    <div className='flex flex-col min-h-screen'>
     
  <Navbar/>
    <div className='flex flex-1'>

        <div className='drawer lg:drawer-open w-1 lg:w-80'>
        <input id="my-drawer-3" type='checkbox' className='drawer-toggle' />

        <div className='drawer-side'>
        <label htmlFor='my-drawer-3' className='drawer-overlay'></label>

        <ul className='menu bg-base-200 min-h-full w-80 p-4'>


          {role === "borrower" && (
            <>
              <li><NavLink to="/dashboard/my-loans" className={({isActive}) => isActive ? "text-blue-400" : "text-base-contect"}>My Loans</NavLink></li>
              
            
            </>
          )}
          

           {role === "manager" && (
            <>
                <li><NavLink to="/dashboard/add-loan" className={({isActive}) => isActive ? "text-blue-400" : "text-base-contect"}>Add Loan </NavLink></li>

                 <li><NavLink to="/dashboard/manage-loans" className={({isActive}) => isActive ? "text-blue-400" : "text-base-contect"}>Manage Loans</NavLink></li>

                  <li><NavLink to="/dashboard/pending-loans" className={({isActive}) => isActive ? "text-blue-400" : "text-base-contect"}>Pending Applications</NavLink></li>

                   <li><NavLink to="/dashboard/approved-loans" className={({isActive}) => isActive ? "text-blue-400" : "text-base-contect"}>Approved Applications</NavLink></li>
            
            </>
          )}
          

  {role === "admin" && (
            <>
             <li><NavLink to="/dashboard/manage-users" className={({isActive}) => isActive ? "text-blue-400" : "text-base-contect"}>Manage Users</NavLink></li>
            <li><NavLink to="/dashboard/all-loan" className={({isActive}) => isActive ? "text-blue-400" : "text-base-contect"}>All Loan</NavLink></li>
            <li><NavLink to="/dashboard/loan-applications" className={({isActive}) => isActive ? "text-blue-400" : "text-base-contect"}>Loan Applications</NavLink></li>
              
            
            </>
          )}
          

                  
           
            <li><NavLink to="/dashboard/profile" className={({isActive}) => isActive ? "text-blue-400" : "text-base-contect"}>My Profile</NavLink></li>
           
          
            
        </ul>

        </div>

        </div>
 
    <div className='flex-1 py-4 px-1 sm:p-4'>
        <Outlet></Outlet>
    </div>

    </div>

  <Footer></Footer>

  </div>
  )
}

export default DashboardLayout