import React, { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../Component/Shared/LoadingSpinner';
import { Helmet } from 'react-helmet';
import Title from '../../Component/Shared/Title';
import ExportAppliedLoans from '../../Component/Shared/ExportAppliedLoans';
import useAxiosSecure from '../../hooks/useAxiosSecure';


function PendingLoans() {
   Title("Pending Application")
        const { loading,setLoading } = useAuth()
        const [localLoading, setLocalLoading]= useState(false)

    // const [loans, setLoans]= useState([])
    const {user} = useAuth();
  const axiosSecure = useAxiosSecure()


     const { data: loans = [], isLoading,isFetching, refetch } = useQuery({
    queryKey: ['userloan'],
    queryFn: async () => {
      setLoading(true);
      const result = await axiosSecure.get(`${import.meta.env.VITE_API_URL}/applyloanspending?status=pending`)
      setLoading(false);
      return result.data
    },
  })

       
const handleStatus = async(id,newStatus)=>{
  setLocalLoading(true);

  try{
   
      const {data} = await axiosSecure.patch(`applyloan/status/${id}`,{status: newStatus});
    if(data.success){
      toast.success(`Loan ${newStatus}`);
refetch()
    }
  } catch (error) {
    toast.error("Failed to update status");
    console.log(error)
  } finally {
     setLocalLoading(false);
  }

};

if(loading || localLoading || isLoading || isFetching){
    return <LoadingSpinner></LoadingSpinner>
  }

  return (
   <div>
  

     <ExportAppliedLoans></ExportAppliedLoans>
     <p className='border-b-1'></p>
     
<div className="overflow-x-auto w-full">
  <table className="table table-xs lg:table-zebra table-fixed w-full">
    {/* head */}
    <thead>
      <tr>
        <th>Loan ID</th>
        <th >Borrower <br /> name</th>
        <th >Borrower <br /> email</th>
        <th >Amount</th>
        <th >Date</th>
        <th >Actions</th>

      </tr>
    </thead>

    {
        loans.map((loan,idx)=>   <tbody key={idx}>
      {/* row 1 */}
      <tr >
        <th className='wrap-anywhere'>{loan.loanID}</th>
        <td className='wrap-anywhere'>{loan.fname}</td>
        <td className='wrap-anywhere'>{loan.email}</td>
        <td className='wrap-anywhere'>{loan.amount}</td>
        <td className='wrap-anywhere'>{new Date(loan.addedAt).toLocaleString()}</td>
        <td className='flex flex-col gap-1'>
            <button   onClick= {() =>handleStatus(loan._id, "approved")} className='bg-sky-400 hover:bg-sky-500 rounded-xl mx-auto px-3 text-black'>Approve</button>
        <button onClick={()=> handleStatus(loan._id, "rejected")}  className='bg-sky-400 hover:bg-sky-500 rounded-xl mx-auto px-5 text-black'>Reject</button>

         <Link className='bg-sky-400 hover:bg-sky-500 rounded-xl mx-auto px-6 text-black' to={`/loan/${loan.loanID}`}>View</Link>

        </td>
      </tr>
     
    </tbody>)
    }
  
  </table>
</div>

    </div>
  )
}

export default PendingLoans
