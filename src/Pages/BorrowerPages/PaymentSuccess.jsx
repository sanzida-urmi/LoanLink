import React,{useEffect} from 'react'
import { IoBagCheckSharp } from "react-icons/io5";
import axios from 'axios'
import { useNavigate,useSearchParams } from 'react-router';


function PaymentSuccess() {

   const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('session_id')

  useEffect(() => {
    if (sessionId) {
      axios.post(`${import.meta.env.VITE_API_URL}/payment-success`, {
        sessionId,
      })
    }
  }, [sessionId])

  const navigate = useNavigate()
     const go =()=>{
        navigate('/');
      }
  return (
    <div className='flex justify-center items-center'>
    <div>
      <IoBagCheckSharp className='text-center mt-30' size={70}/>
      <div className='my-3 text-center text-3xl'>Payment Successful</div>
      <button className='btn btn-info' onClick={go}> go back home</button>
    </div>
    </div>
  )
}

export default PaymentSuccess
