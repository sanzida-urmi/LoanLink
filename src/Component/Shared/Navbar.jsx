import React from 'react'
import { Link, NavLink } from 'react-router'
import { GiReceiveMoney } from "react-icons/gi";
import useAuth from '../../hooks/useAuth';
import { DotLoader } from 'react-spinners';
import { TbLayoutSidebarLeftExpand } from "react-icons/tb";



function Navbar() {
      const { user, loading } = useAuth()

     const links = <>
    <li className='font-semibold'><NavLink className={({isActive})=> isActive ? "active" : ""} end to="/">Home</NavLink></li>
     <li className='font-semibold'><NavLink to="/movies"  className={({isActive})=> isActive ? "active" : ""} end>All-Loans</NavLink></li>
  <li className='font-semibold'><NavLink className={({isActive})=> isActive ? "active" : ""} end to="/movies/my-collection">About Us</NavLink></li>
        <li className='font-semibold'><NavLink className={({isActive})=> isActive ? "active" : ""} end to="/movies/add" >Contact</NavLink></li>

        <li className='font-semibold'><NavLink className={({isActive})=> isActive ? "active" : ""} end to="/dashboard" >Dashboard</NavLink></li>
        </>

  const signouthandle = () => {
        console.log("k")
    //     setLoading(true);
    // signOutUser()
    //   .then(() => {
    //     setLoading(false);
    //     toast.success("successfully signout");
    //     setUser(null);
    //     navigate("/");
    //   })
    //   .catch((e) => {
    //     toast.error(e.message);
    //     console.log(e.message);
    //   });
  };
  return (
    <div className="navbar shadow-sm   bg-base-300 rounded-2xl mt-0  flex flex-col md:flex-row items-start gap-3 md:items-stretch">

  <div className="navbar-start nav  flex flex-col  sm:flex-row justify-start items-start">

    <label htmlFor="my-drawer-3" className="btn btn-ghost lg:hidden">
    <TbLayoutSidebarLeftExpand size={20}/>
  </label>

    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost xl:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
     
  <ul tabIndex="-1" className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-60 p-3 shadow xl:hidden">
{links}
<div className='divider my-2'></div>




         
      {loading ? (
          <div className='flex justify-center py-3'>
            <DotLoader size={30} />
          </div>
        )
      
      : user ? (
        <>
        <li className='flex flex-col mb-2'>
          <div className='flex items-center gap-3'>
              <img 
              className='w-10 h-10 rounded-full border-2 border-red-300'
              src={user.photoURL || "https://via.placeholder.com/88"} referrerPolicy='no-referrer' />


              <div>
                <p className='font-bold text-sm'>{user.displayName}</p>
                <p className='text-xs'>{user.email}</p>
              </div>
              </div>
              </li>

            <li>
              <button onClick={signouthandle} className='btn btn-info btn-sm w-full mt-1'>
                Logout
              </button>
            </li>

         

          <li className='mt-2'>
            <label className='flex items-center gap-3 cursor-pointer'>
              <span className='font-semibold'>Dark Mode</span>
              <input
              onChange={(e)=> handleTheme(e.target.checked)}
              type='checkbox'
              defaultChecked={localStorage.getItem('theme') === "dark"}
              className='toggle'
              />
            </label>
          </li>
          </>

          )  : (

   

        <li className='mt-2'>
          <Link to="login" className='btn btn-info btn-sm w-full'>
          Login
          </Link>
        </li>


          )}
          </ul>

    </div>
    <div className='flex flex-col sm:flex-row justify-center items-start'>
     
     <GiReceiveMoney size={35} />
 
    <a className="btn btn-ghost text-sm sm:text-xl wrap-anywhere sm:word-wrap ">LoanLink</a>
    </div>
  </div>

  <div className="navbar-end hidden xl:flex">

      <ul className="menu menu-horizontal px-1 ">
      {links}
    </ul>
    
     {loading ? (
          <DotLoader color='#8b0000' className='mr-2' />
        ) : user ? 
        
                 (
                  <div className='flex flex-col gap-3 sm:flex-row justify-start items-start'>
            <div className='dropdown drawer-end z-50 '>


                       <div tabIndex={0} role="button" className='btn btn-ghost btn-circle avatar'>
              <div className='w-9 border-2 border-red-300 rounded-full'>
                <img referrerPolicy='no-referrer' src={user?.photoURL || "https://via.placeholder.com/88"} alt="" />

              </div>
            </div>

                     <ul
           tabIndex="-1"
           className='menu menu-sm dropdown-content bg-red-300 rounded-box z-50 mt-3 w-52 p-2 shadow'>


              <div className='pb-3 border-b border-b-red-300'>
                <li className='text-sm font-bold'>{user.displayName}</li>
                <li className='text-xs'>{user.email}</li>
               

              </div>

              </ul>
</div>

              <button onClick={signouthandle} className="btn wrap-anywhere  btn-info ">
             <Link to="/login">Logout</Link>
           </button>  
              </div>

         )
        
        
        : (
         
          <button className="btn btn-info">
            <Link to="/login">Login</Link>
          </button>

        )}

    <input
           onChange={(e)=> handleTheme(e.target.checked)}
           type="checkbox"
           defaultChecked={localStorage.getItem('theme') === "dark"}
           className="toggle ml-3"/>
  </div>
  
</div>
  )
}

export default Navbar
