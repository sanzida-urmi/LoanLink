import { useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link } from 'react-router';
import DeleteModal from '../../Component/modal/DeleteModal';
import { Helmet } from 'react-helmet';

import LoadingSpinner from '../../Component/Shared/LoadingSpinner';
import Title from '../../Component/Shared/Title';
import ExportAppliedLoans from '../../Component/Shared/ExportAppliedLoans';
import useAxiosSecure from '../../hooks/useAxiosSecure';

function AllLoan() { 
  Title("All Loan")
   const axiosSecure = useAxiosSecure()

      const queryClient = useQueryClient();
      // const [loans, setLoans] = useState([])


    const { data: loans = [], isLoading, isFetching, refetch } = useQuery({
    queryKey: ['loan'],
    queryFn: async () => {
      const result = await axiosSecure(`${import.meta.env.VITE_API_URL}/loan`)
      return result.data
    },
  })


  const handleShowHome = async(id,value)=>{
    try{
        await axiosSecure.patch(
            `${import.meta.env.VITE_API_URL}/loan/show/${id}`,
            {value}
        );
        toast.success(value? "Added to Home Page" : "Removed from Home");
        queryClient.invalidateQueries(["loans"]);
    } catch (err) {
        toast.error("Failed to update");
    }
  };


// React.useEffect(()=>{
// if(loan?.length > 0) {
//   setLoans(loan);
// }
// },[loan])

   let [isOpen, setIsOpen] = useState(false)
    const closeModal = () => setIsOpen(false)

    const [selectedLoan,setSelectedLoan] = useState(null);
    
    const handleCancel = async () => {
      if (!selectedLoan) return;
      try{

        const res = await axiosSecure.delete(`oneloan/${selectedLoan._id}`);

        // const res = await fetch(`http://localhost:3000/oneloan/${selectedLoan._id}`,{
        //   method: 'DELETE',
        // });
        // if(res.data?.success){
                  refetch();

          closeModal();
        // } else {
        //   console.log("Dlt field");
        // }
      }  catch (err) {
        console.log(err);
      }
    }


     if(isLoading || isFetching){
    return <LoadingSpinner></LoadingSpinner>
  }

// console.log(loan)
  return (
    <div>
    

           <ExportAppliedLoans></ExportAppliedLoans>
            <p className='border-b-1'></p>
        <div className="overflow-x-auto">
  <table className="table table-xs table-fixed">
    {/* head */}
    <thead>
      <tr>
        <th>
          Show on Home
        </th>
        <th>Image & title</th>
        <th>Interest </th>
        <th>Category </th>
        <th>Created By </th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
     
     
   

      {  loans.length === 0? (
      <tr>
        <td colSpan="6" className="text-gray-700 wrap-anywhere text-center text-4xl font-bold p-6 ">
        not fount
        </td>
      </tr>
     ):(
        loans.map((l,idx)=> <tr key={l._id}>
        <th>
          <label>
            <input checked={l.showOnHome} onChange={(e) => handleShowHome(l._id,e.target.checked)} type="checkbox" className="toggle" />
          </label>

        </th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={l.imgURL} />
              </div>
            </div>
            <div>
              <div className="font-bold">{l.title}</div>
              
            </div>
          </div>
        </td>
        <td>
          {l.interest}
        </td>
        <td>{l.loanCategory}</td>
        <td>{l.createdBy}</td>
        <th className='flex flex-col'>
          <Link  to={`/dashboard/update-loan/${l._id}`} className="btn btn-info btn-xs">Update</Link>
          <button className="btn mt-1 btn-info btn-xs" onClick={() =>{ setIsOpen(true); setSelectedLoan(l)}}>Delete</button>

           <DeleteModal onConfirm={handleCancel} isOpen={isOpen} closeModal={closeModal} />

        </th>
      </tr>) )
      }
       </tbody>
    
  </table>
      </div>
    </div>
  )
}

export default AllLoan
