import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useLocation } from 'react-router';
import LoadingSpinner from '../../Component/Shared/LoadingSpinner'
import useAxiosSecure from '../../hooks/useAxiosSecure';
// import hh from "../";


function Updateuser() {
    const [status, setStatus] = useState("");
    const [localLoading, setLocalLoading]= useState(false)
    const [reason, setReason] = useState("");
    const [feedback, setFeedback] = useState("");
    const location = useLocation();
             const axiosSecure = useAxiosSecure()
    const email = location.state?.email

    

    const handle= async (e)=>{
        e.preventDefault();
                
setLocalLoading(true)

        console.log(status)

try {
  let info = {email,status};
  if(status === "suspend") {

  info = {
            ...info,reason,feedback

        }
  }

   

  const {data} = await axiosSecure.patch(
      `${import.meta.env.VITE_API_URL}/updateuser`,
      info
    )
toast.success("submitted")
} catch(error){
  toast.error("Failed to submit")
} finally {
  setLocalLoading(false)
}
       
    }


    if(localLoading){
    return <LoadingSpinner></LoadingSpinner>
  }


  return (
    <div>
      <p className='text-xl mt-10 font bold text-sky-500 text-center'>update user </p>

   <div className='flex justify-center items-center mt-3'>
      <label className="select">
  <span className="label">Type</span>
  <select onChange={(e) => setStatus(e.target.value)}>
    <option selected disabled>select</option>
    <option value='approve'>Approve</option>
    <option value="suspend">Suspend</option>
  </select>
</label>
   </div>

   {
    status === "suspend" && (
        <div className='flex justify-center items-center'>
             <fieldset className="fieldset mt-10">
         
          <input value={reason} onChange={(e) => setReason(e.target.value)} className="input" placeholder="suspend reason" />

          <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} className="textarea w-80" placeholder="why suspend feedback"></textarea>

          
        </fieldset>
            </div>
    )
   }

   <button onClick={handle} className="btn btn-info btn-xs mt-4 w-20">Submit</button>

    </div>
  )
}

export default Updateuser
