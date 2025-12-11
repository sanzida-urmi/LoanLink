import { Button } from '@headlessui/react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router';
import LoadingSpinner from '../../Component/Shared/LoadingSpinner';
import Title from '../../Component/Shared/Title';
import useAxiosSecure from '../../hooks/useAxiosSecure';

function LoanApllication() {
    Title("Loan Applications")
     const axiosSecure = useAxiosSecure()
    
  
  const { data: loan = [], isLoading, isFetching } = useQuery({
    queryKey: ['alltypeLoans'],
    queryFn: async () => {
      const result = await axiosSecure(`${import.meta.env.VITE_API_URL}/applyloanspending`)
      return result.data
    },
  })
  console.log(loan);
      
  const [selectedLoan, setSelectedLoan] = useState(null);

   const openModal = (loan) => {
    setSelectedLoan(loan);
    document.getElementById("my_modal_5").showModal();
  };

   const [statusFilter,setStatusFilter] = useState('All');

  const filteredLoans = loan.filter((l)=>{
    if(statusFilter === 'All') return true;
    return l.status === statusFilter;
  })


  if(isLoading || isFetching ){
      return <LoadingSpinner></LoadingSpinner>
    }

  return (
    <div>


      <div className='flex gap-2 mb-4'>
        {['All','pending','approved','rejected'].map((status)=>(
          <button key={status} className={`btn btn-sm ${statusFilter === status ? 'btn-info' : 'btn-ghost'}`} onClick={()=> setStatusFilter(status)}>{status}</button>
        ))}
      </div>

      <div className="overflow-x-auto">
  <table className="table table-zebra table-xs table-fixed">
    {/* head */}
    <thead>
      <tr>
        <th>Loan ID</th>
        <th className='wrap-anywhere'>User Name <br />& Email</th>
        {/* <th>User Email</th> */}
        <th className='wrap-anywhere'>Loanbr <br /> Category</th>
        <th>Amount</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
    {
      filteredLoans.map((l,idx)=>(
      
      
      <tr  key={idx}>
        <th className='wrap-anywhere'>{l.loanID}</th>
         <td className='wrap-anywhere'>
          {l.email}
          <br />
          <span className="badge badge-ghost badge-sm">{l.fname} </span>
        </td>

        <td>{l.loanCategory}</td>
        <td>{l.amount}</td>
        <td>{l.status}</td>
        <td>
           <Button 
           onClick={()=> openModal(l)}
            className="btn btn-info btn-xs">View</Button>
          {/* <button className="btn m-2 btn-info btn-xs" >Update</button> */}
        </td>
      </tr>
     
    ))
    }
   </tbody>
  </table>

  <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Loan Details</h3>
    {selectedLoan && (
      <div className='py-4'>
      <p><strong>Loan ID:</strong>{selectedLoan.loanID}</p>
      <p><strong>Title:</strong>{selectedLoan.title}</p>
      <p><strong>Amount:</strong>{selectedLoan.amount}</p>
      <p><strong>Fee:</strong>{selectedLoan.fee}</p>
      <p><strong>First Name:</strong>{selectedLoan.fname}</p>
      <p><strong>Last Name:</strong>{selectedLoan.lname}</p>
      <p><strong>Income:</strong>{selectedLoan.income}</p>
      <p><strong>Interest:</strong>{selectedLoan.interest}</p>
      <p><strong>National ID:</strong>{selectedLoan.national}</p>
      <p><strong>Note:</strong>{selectedLoan.note}</p>
      <p><strong>Phone Number:</strong>{selectedLoan.phn}</p>
      <p><strong>Reason:</strong>{selectedLoan.reason}</p>
      <p><strong>Source:</strong>{selectedLoan.source}</p>
      <p><strong>Status:</strong>{selectedLoan.status}</p>
      <p><strong>Email</strong>{selectedLoan.email}</p>
      <p><strong>Address:</strong>{selectedLoan.address}</p>
      
      </div>
     
    )}
    <div className="modal-action">
      <form method="dialog">
       
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>

</div>
    </div>
  )
}

export default LoanApllication
