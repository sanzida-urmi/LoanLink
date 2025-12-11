import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useLocation, useParams } from 'react-router'
import LoadingSpinner from '../../Component/Shared/LoadingSpinner';
import useAxiosSecure from '../../hooks/useAxiosSecure';

function UpdateLoanForm() {
    // const location = useLocation();
    // const loanid = location.state?.id;
            const [localLoading, setLocalLoading]= useState(false)
                     const axiosSecure = useAxiosSecure()

    const {id: loanid} = useParams();

     const { data: loan = {}, isLoading, isFetching } = useQuery({
        queryKey: ['loan', loanid],
        queryFn: async () => {
          const result = await axiosSecure(`${import.meta.env.VITE_API_URL}/loan/${loanid}`)
          return result.data
        },
      })
      console.log(loan);

      const { imgURL, title, shortDescription, maxLoanLimit, loanCategory, interest, emiPlans } = loan


      const handleSubmit=async (e)=>{
        // suru 
        e.preventDefault();
        const form = e.target;
 

  const updateData = {
    image: form.image.value,
    title: form.title.value,
    shortDescription: form.shortDescription.value,
    maxLoanLimit: form.number.value,
    loanCategory: form.loanCategory.value,
    interest: form.interest.value,
    emiPlans: emiPlanss,
  }

        console.log(updateData)

       
       try{
        setLocalLoading(true)
         await axiosSecure.patch(
          `/loan/update/${loanid}`, {updateData}
        );
        toast.success("updated successfully")
       } catch(error) {
        toast.error("could not updated")
       } finally {
setLocalLoading(false);
       }

      }

     

      const [emiPlanss,setEmiPlans] = React.useState([]);



React.useEffect(()=>{
  if(loan?.emiPlans) {
    setEmiPlans(loan.emiPlans)
  }
},[loan])

const handleEmiChange =(index,value) =>{
  const updated = [...emiPlanss];
  updated[index] = Number(value);
  setEmiPlans(updated)
}


if(isLoading || isFetching || localLoading){
    return <LoadingSpinner></LoadingSpinner>
  }


  return (

<div className="card border my-10 border-sky-400 bg-base-100 w-full max-w-md mx-auto shadow-2xl rounded-2xl wrap-anywhere">
      <div className="card-body p-6 relative">
        <h2 className="text-2xl font-bold text-center mb-6 text-sky-500">Update Loan Here</h2>
        <form onSubmit={handleSubmit} className="space-y-4 ">



            <div>
  <label className="label font-medium">Available EMI Plans</label>

  {emiPlanss.map((emi, idx) => (
    <input
      key={idx}
      type="number"
      name="emi"
      defaultValue={emi}
      onChange={(e) => handleEmiChange(idx, e.target.value)}
      className="input w-full my-2 rounded-full focus:outline-gray-200 text-sky-500"
    />
  ))}

  
</div>
             {/* image Field */}
          <div>
            <label className="label font-medium">Image</label>
            <input
              type="text"
              name="image"
              defaultValue={imgURL}             
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200 text-sky-500"
              placeholder="Enter image link"
            />
          </div>

          <div>
            <label className="label font-medium">ShortDescription</label>
            <textarea
            rows={5}
              type="text"
              name="shortDescription"
              defaultValue={shortDescription}            
              className="input w-full rounded-md focus:border-0 focus:outline-gray-200 text-sky-500"
            />
          </div>


            {/* maxLoanLimit */}
           <div>
            <label className="label font-medium">Max Loan Limit</label>
            <input
              type="text"
              name="number"
                
              defaultValue={maxLoanLimit}
                        
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200 text-sky-500"
            />
          </div>

          {/* loanCategory  */}
           <div>
            <label className="label font-medium">Loan Category</label>
            <input
              type="text"
              name="loanCategory"
              
              defaultValue={loanCategory}         
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200 text-sky-500"
            />
          </div>

          {/* interest  */}
           <div>
            <label className="label font-medium">Interest Rate</label>
            <input
              type="text"
              name="interest"
              
              defaultValue={interest}          
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200 text-sky-500"
            />
          </div>

          {/* phn  */}
          <div>
            <label className="label font-medium">Title</label>
            <input
              type="text"
              name="title"
              defaultValue={title}
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200 text-sky-500"
            />
          </div>

        
                  {/* Submit Button */}
          <button
            type="submit"
            className="btn w-full text-sky-5 mt-6 rounded-full btn-info"
          >
            Submit
          </button>
        </form>
      </div>
    </div>



  )
}

export default UpdateLoanForm
