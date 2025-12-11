import React from 'react'
import LoadingSpinner from '../../Component/Shared/LoadingSpinner';
import toast from 'react-hot-toast';
import { Link } from 'react-router';
import useAuth from '../../hooks/useAuth';
import useRole from '../../hooks/useRole';
import Title from '../../Component/Shared/Title';
import axios from "axios";

function ProfileManager() {

      Title("Profile")
  
          const { user, signOutUser,setLoading,loading,setUser } = useAuth()
           const [role] = useRole();
 

         

      console.log(user);
           console.log(role);

       const signouthandle = () => {
        // console.log("k")
        setLoading(true);
    signOutUser()
      .then(() => {
        setLoading(false);
        toast.success("successfully signout");
        setUser(null);
        // navigate("/");
      })
      .catch((e) => {
        toast.error(e.message);
        console.log(e.message);
      });
  };

   if(loading){
            return <LoadingSpinner></LoadingSpinner>
          }

  return (


<div className="  image-full w-full shadow-sm">
  <figure>
    <img
      src="https://www.revechat.com/wp-content/uploads/2023/11/Digital-Banking-in-Bangladesh.png"
      alt="Shoes" />
  </figure>
  <h2 className="card-title text-center">Card Title</h2>
  <div className="card-body ">
    <h2 className="card-title text-center border-b-1">YOUR PROFILE</h2>
    <div className='border-b-1 border-gray-100 flex flex-col gap-4 items-center justify-center h-60'>
        <img src={user.photoURL} className='rounded-full h-30 w-30 border-2 border-sky-300' alt="" />
        <h1 className='text-2xl font-bold  my-auto'>{user.displayName}</h1>
        <p className='text-xl'>{role}</p>
    </div>
    <div className="card-actions justify-end">
      <button onClick={signouthandle} className="btn btn-info">
        <Link to="/login">Logout</Link>
      </button>
    </div>
  </div>



   
</div> 



  )
}

export default ProfileManager
