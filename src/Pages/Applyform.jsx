import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import useAuth from '../hooks/useAuth';
import LoadingSpinner from '../Component/Shared/LoadingSpinner';
import toast from 'react-hot-toast';
import Confetti from 'react-confetti';
import useAxiosSecure from '../hooks/useAxiosSecure';


function Applyform() {
            const { user,setLoading, loading} = useAuth()

    const [showConfetti, setShowConfetti] = useState(false);
     const location = useLocation();
       const axiosSecure = useAxiosSecure()
    const {title,interest, maxLoanLimit,id,loanCategory} = location.state

    
    console.log(title,interest,maxLoanLimit);


  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: document.body.scrollHeight
  });

  useEffect(()=>{
    const handleResize =()=>{
      setDimensions({
         width: window.innerWidth,
    height: document.body.scrollHeight
      })
    };

    window.addEventListener("resize", handleResize);
    return()=> window.removeEventListener("resize", handleResize);
  },[]);

 

   

      const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit")
    setLoading(true);

    const formData = {
      title: e.target.title.value,
      interest: e.target.interest.value,
      phn: Number(e.target.phn.value),
    //   maxLoanLimit: e.target.maxLoanLimit.value,
      fname: e.target.fname.value,
      national: Number(e.target.national.value),
      income: Number(e.target.income.value),
      amount: Number(e.target.amount.value),
      lname: e.target.lname.value,
      source: e.target.source.value,
      reason: e.target.reason.value,
      address: e.target.address.value,
      note: e.target.note.value,
      status: "pending",
      fee: "unpaid",
      email : e.target.email.value,
      title: e.target.title.value,
      loanCategory: e.target.loanCategory.value,
      loanID : id,
    //   interest: e.target.interest.value,
      addedAt: new Date().toISOString(),
    //   addedBy: user.email
    }
    console.log(formData);

    try{
      const {data} = await axiosSecure.post('/applyloan',formData);
      setLoading(false);
      console.log(data);
      toast.success('successfully apply');

            setDimensions({width: window.innerWidth, height: document.body.scrollHeight})

      setShowConfetti(true)
      setTimeout(()=> setShowConfetti(false), 6000);

    }  catch(err)  {
      // console.log(err)
      setLoading(false);
      toast.error('cound not add');
    }

  
   

  }

   if(loading){
    return <LoadingSpinner></LoadingSpinner>
  }

  return (
     <div>


      {
        showConfetti && (
          <Confetti
          width={dimensions.width}
          height={dimensions.height}
          />
        )
      }


      <div className="card border my-10 border-sky-400 bg-base-100 w-full max-w-md mx-auto shadow-2xl rounded-2xl wrap-anywhere">
      <div className="card-body p-6 relative">
        <h2 className="text-2xl font-bold text-center mb-6 text-sky-500">Apply Loan Here</h2>
        <form onSubmit={handleSubmit} className="space-y-4 ">
             {/* name Field */}
          <div>
            <label className="label font-medium">First Name</label>
            <input
              type="text"
              name="fname"
              required            
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200 text-sky-500"
              placeholder="Enter Your First Name"
            />
          </div>

          <div>
            <label className="label font-medium">Last Name</label>
            <input
              type="text"
              name="lname"
              required            
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200 text-sky-500"
              placeholder="Enter Your Last Name"
            />
          </div>


            {/* email */}
           <div>
            <label className="label font-medium">Email</label>
            <input
              type="text"
              name="email"
              required  
              defaultValue={user.email}
              readOnly          
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200 text-sky-500"
              placeholder="Enter Your Last Name"
            />
          </div>

          {/* title  */}
           <div>
            <label className="label font-medium">Title</label>
            <input
              type="text"
              name="title"
              required   
              readOnly
              defaultValue={title}         
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200 text-sky-500"
              placeholder="Enter Your Last Name"
            />
          </div>
          {/* loanCategory  */}
           <div>
            <label className="label font-medium">Loan Category</label>
            <input
              type="text"
              name="loanCategory"
              required   
              readOnly
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
              required  
              readOnly
              defaultValue={interest}          
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200 text-sky-500"
              placeholder="Enter Your Last Name"
            />
          </div>

          {/* phn  */}
          <div>
            <label className="label font-medium">Phone Number</label>
            <input
              type="number"
              name="phn"
              required            
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200 text-sky-500"
              placeholder="Enter Your Phone Number"
            />
          </div>

          {/* national id  */}
          <div>
            <label className="label font-medium">National ID</label>
            <input
              type="number"
              name="national"
              required            
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200 text-sky-500"
              placeholder="Enter Your National Id"
            />
          </div>

          {/* income source */}
          <div>
            <label className="label font-medium">Income Source</label>
            <input
              type="text"
              name="source"
              required            
              className="input w-full rounded-full focus:border-0 text-sky-500 focus:outline-gray-200"
              placeholder="Enter Your Income Source"
            />
          </div>

          {/* Monthly Income  */}
          <div>
            <label className="label font-medium">Monthly Income</label>
            <input
              type="number"
              name="income"
              required            
              className="input w-full rounded-full focus:border-0 text-sky-500 focus:outline-gray-200"
              placeholder="Enter Your Monthly Income"
            />
          </div>

           {/* Loan Amount  */}
          <div>
            <label className="label font-medium">Loan Amount</label>
            <input
              type="number"
              name="amount"
              required            
              className="input w-full rounded-full focus:border-0 text-sky-500 focus:outline-gray-200"
              placeholder="Enter Loan Amount"
            />
          </div>

          {/* Reason for Loan Field */}
          <div>
            <label className="label font-medium">Reason for Loan</label>
            <input
              type="text"
              name="reason"
              required            
              className="input w-full rounded-full focus:border-0 text-sky-500 focus:outline-gray-200"
              placeholder="Enter Reason for Loan"
            />
          </div>

          {/* Address Field */}
          <div>
            <label className="label font-medium">Address</label>
            <input
              type="text"
              name="address"
              required            
              className="input w-full rounded-full focus:border-0 text-sky-500 focus:outline-gray-200"
              placeholder="Enter Your Address"
            />
          </div>

          {/* note Field */}
          <div>
            <label className="label font-medium">Extra Notes</label>
            <input
              type="text"
              name="note"
              required            
              className="input w-full rounded-full focus:border-0 text-sky-500 focus:outline-gray-200"
              placeholder="Extra Notes"
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
    </div>
  )
}

export default Applyform
