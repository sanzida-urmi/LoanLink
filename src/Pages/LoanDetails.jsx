import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router';
import LoadingSpinner from '../Component/Shared/LoadingSpinner';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';

function LoanDetails() {
      const { user, loading} = useAuth()
      const [role,isRoleLoading] = useRole();
      console.log(role);
    

     const { id } = useParams()
     const nagivate = useNavigate();

     const handleClick=()=>{
        nagivate('apply',{
            state: {
                title,interest,maxLoanLimit,id,loanCategory
            }
        })
     }

     const { data: loan = {}, isLoading } = useQuery({
    queryKey: ['loan', id],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/loan/${id}`)
      return result.data
    },
  })
  console.log(loan);

  const { imgURL, title, shortDescription, maxLoanLimit, loanCategory, interest, emiPlans } = loan

  
  console.log(emiPlans);

  if(isLoading || isRoleLoading){
    return <LoadingSpinner></LoadingSpinner>
  }
  return (
   <div className=' wrap-anywhere my-10'>
      <div className="card bg-base-100 w-full gap-20 shadow-sm flex flex-col md:flex-row justify-center items-center mx-auto">
 <div className='md:w-1/2 w-10/12 '>
   <figure>
    <img
    className='h-100 w-full'
      src={imgURL}
      alt="Shoes" />
  </figure>
  </div>
  <div className="card-body wrap-anywhere md:w-1/2 w-10/12">
    <h2 className="card-title text-sky-700 text-4xl font-semibold mb-5 mx-auto">{title}</h2>
    <p><span className='font-bold'>Max Loan Limit:</span> {maxLoanLimit}</p>
    <p className='wrap-anywhere'><span className='font-bold'>shortDescription:</span>{shortDescription}</p>
    <p><span className='font-bold'>loanCategory:</span> {loanCategory}</p>
    <p><span className='font-bold'>interest:</span>{interest}</p>
    <p className='font-semibold mt-4'>Available EMI Plans:</p>
    <div className='grid grid-cols-2 sm:grid-cols-3 gap-4  my-3 '>
        {
            emiPlans?.map((emi,index)=>(
                <div key={index} className='p-3 border border-sky-300 rounded-lg text-center font-bold text-sky-700 shadow'>
                    {emi} BDT
                </div>
            ))
        }
    </div>


<div className="card-actions justify-end">
        <button onClick={handleClick} className="btn btn-active  btn-info" disabled={role == '!borrower'}>Apply Now</button>
    </div>

    


  </div>

</div>
    </div>
  )
}

export default LoanDetails
