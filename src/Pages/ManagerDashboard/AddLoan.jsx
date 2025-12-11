import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { imageUpload } from '../../utils';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import LoadingSpinner from '../../Component/Shared/LoadingSpinner';
import toast from 'react-hot-toast';
import Title from '../../Component/Shared/Title';
import ExportAppliedLoans from '../../Component/Shared/ExportAppliedLoans';
import useAxiosSecure from '../../hooks/useAxiosSecure';

function AddLoan() {
    Title("Add Loan")
  
    const { user , loading, setLoading} = useAuth();
    

    console.log(user?.displayName);
     const axiosSecure = useAxiosSecure()

     const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm()


  const [emiPlans, setEmiPlans] = useState([]);

 
  const handleEMIInput =(e)=>{
    const input = e.target.value;
    const arr = input.split(",").map(i => i.trim()).filter(i => i!== "");
    const invalid = arr.some(i => isNaN(Number(i)));
    if(invalid) {
      toast.error("enter only number, separated by commas!");
      setEmiPlans([]);
    } else {
      setEmiPlans(arr.map(Number));
    }
  }

  
  const [showOnHome, setShowOnHome] = useState(false);


  const onSubmit = async (data) =>{
    setLoading(true)
    try{
        const imgFile = data.image[0];
        const imgURL = await imageUpload(imgFile);

        const finalData ={
            title: data.title,
            shortDescription: data.shortDescription,
            loanCategory: data.loanCategory,
            document: data.document,
            createdBy: user?.displayName,
            createdByEmail: user?.email,
            interest: Number(data.interest),
            maxLoanLimit: Number(data.maxLoanLimit),
            emiPlans: emiPlans,
            showOnHome: showOnHome,
            imgURL
        };

        console.log(finalData);

 const result = await axiosSecure.post(`${import.meta.env.VITE_API_URL}/addLoan`,finalData);
                toast.success("successfully added")
                reset()


    } catch (error) {
        toast.error('error', error);
        setLoading(false)
    } finally {
      setLoading(false)
    }
  }


    if(loading) {
      return  <LoadingSpinner></LoadingSpinner>
    }


  return (
    <div>
     
      <div className="card border my-10 border-sky-400 bg-base-100 w-11/12 sm:w-full max-w-md mx-auto shadow-2xl rounded-2xl wrap-anywhere">
      <div className="card-body p-6 relative">
        <h2 className="text-2xl font-bold text-center mb-6 text-sky-500  wrap-anywhere">Add Loan Here</h2>
        <form onSubmit={handleSubmit(onSubmit)}   className="space-y-4 ">
             {/* title Field */}
          <div>
            <label className="label font-medium">Title</label>
            <input
              type="text"
              {...register("title")}
              required            
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200 text-sky-500"
              placeholder="Enter Title"
            />
          </div>

{/* shortDescription  */}
          <div>
            <label className="label font-medium">Description</label>
            <input
              type="text"
              {...register("shortDescription")}
              required            
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200 text-sky-500"
              placeholder="Enter shortDescription"
            />
          </div>


            {/* loanCategory */}
           <div>
            <label className="label font-medium">Loan Category</label>
            <input
              type="text"
              {...register("loanCategory")}
              required                         
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200 text-sky-500"
              placeholder="Enter loanCategory"
            />
          </div>
            {/* document */}
           <div>
            <label className="label font-medium">Required Documents</label>
            <input
              type="text"
              {...register("document")}
              required  
                        
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200 text-sky-500"
              placeholder="Enter document"
            />
          </div>

          {/* interest  */}
           <div>
            <label className="label font-medium">Interest</label>
            <input
              type="number"
              {...register("interest")}
              required   
              
            //   defaultValue={title}         
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200 text-sky-500"
              placeholder="Enter interest"
            />
          </div>
          {/* Max Loan Limit  */}
           <div>
            <label className="label font-medium">Max Loan Limit</label>
            <input
              type="number"
              {...register("maxLoanLimit")}
              required   
              
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200 text-sky-500"
              placeholder="Enter max Loan Limit"
            />
          </div>

         

{/* emi  */}
<div>
<label className='label font-medium'>EMI Plans (comma separated)</label>
<input type="text" className="input input-bordered w-full" placeholder="e.g. 12,2,36" onChange={handleEMIInput}/>
</div>

          {/* Image */}
            <div>
              <label
                htmlFor='image'
                className='label font-medium'
              >
                 Image
              </label>
              <input
                name='image'
                type='file'
                id='image'
                accept='image/*'
                className='block w-full text-sm text-gray-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-md file:border-0
      file:text-sm file:font-semibold
      file:bg-sky-50 file:text-sky-700
      hover:file:bg-sky-100
      bg-gray-100 border border-dashed border-sky-300 rounded-md cursor-pointer
      focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400
      py-2'
       {...register('image')}
              />
              {/* <p className='mt-1 text-xs text-gray-400'>
                PNG, JPG or JPEG (max 2MB)
              </p> */}
            </div>

         

    {/* show  */}
    <div>
        <label className='flex items-center gap-2 cursor-pointer '>
            <span>Show on Home</span>
            <input type="checkbox" className='toggle toggle-info' checked={showOnHome} onChange={(e)=> setShowOnHome(e.target.checked)}/>
        </label>
    </div>

          
                  {/* Submit Button */}
          <button
            type="submit"
            className="btn w-full text-sky-5 mt-6 rounded-full btn-info"
          >
            ADD 
          </button>
        </form>
      </div>
    </div>
    </div>
  )
}

export default AddLoan
