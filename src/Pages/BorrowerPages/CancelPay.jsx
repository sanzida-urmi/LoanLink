import React from 'react'
import { Navigate, useNavigate } from 'react-router';
import { ImCross } from "react-icons/im";


function CancelPay() {
    const navigate = useNavigate()
     const go =()=>{
        navigate('/');
      }

  return (
     <div className='flex justify-center items-center'>
        <div>
          <ImCross className='text-center mt-30' size={70}/>
          <div className='my-3 text-center text-3xl'>Payment Cancel, Try Again</div>
          <button className='btn btn-info' onClick={go}> go back home</button>
        </div>
        </div>
  )
}

export default CancelPay
