import { Button } from '@headlessui/react';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';
import LoadingSpinner from '../../Component/Shared/LoadingSpinner';
import Title from '../../Component/Shared/Title';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';

function ApprovedLoan() {
    Title("Approved Applications")
  
  const {loading,setLoading} = useAuth();
    const axiosSecure = useAxiosSecure()

        // const [loans, setLoans]= useState([])
    
    //  useEffect(()=>{
    //   setLoading(true)
    //         fetch(`http://localhost:3000/applyloanspending?status=approved`)
    //         .then(res => res.json())
    //         .then(data =>{
    //             setLoans(data);
    //             setLoading(false);
    //             console.log(data);
    //         });
    //     },[]);

          const { data: loans = [], isLoading,isFetching, refetch } = useQuery({
    queryKey: ['userloan'],
    queryFn: async () => {
      setLoading(true);
      const result = await axiosSecure.get(`${import.meta.env.VITE_API_URL}/applyloanspending?status=approved`)
      setLoading(false);
      return result.data
    },
  })



        const handleStatus = async(id,newStatus)=>{
          setLoading(true)
          try{
            // const res = await fetch(`${import.meta.env.VITE_API_URL}/applyloan/status/${id}`,{
            //   method: "PATCH",
            //   headers:{ "Content-Type": "application/json"},
            //   body: JSON.stringify({status: newStatus})
            // });
            const {res} = await axiosSecure.patch(`applyloan/status/${id}`,{status: newStatus});

           refetch()
          } catch (error) {
            toast.error("Failed to update status");
            console.log(error)
          } finally {
            setLoading (false)
          }
        };

        
        if(loading){
            return <LoadingSpinner></LoadingSpinner>
          }

  return (
    <div>
      
      <div className="overflow-x-auto">
        <table className="table sm:table-zebra table-xs table-fixed">
          {/* head */}
          <thead>
            <tr>
              <th>Loan ID</th>
              <th className='wrap-anywhere'>Borrower <br /> Name <br /> & Email</th>
              {/* <th>User Email</th> */}
              {/* <th>Loan Category</th> */}
              <th>Amount</th>
              <th className='wrap-anywhere'> Approved <br /> Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {
             loans.length === 0? (
      <tr>
        <td colSpan="6" className="text-gray-700 text-center text-4xl font-bold p-6 ">
        not fount
        </td>
      </tr>
     ):(
            loans.map((loan,idx)=>(
            
            
            <tr  key={idx}>
              <th className='wrap-anywhere'>{loan.loanID}</th>
               <td className='wrap-anywhere'>
                {loan.email}
                <br />
                <span className="badge badge-ghost badge-sm">{loan.fname} </span>
              </td>
      
              <td className='wrap-anywhere'>{loan.amount}</td>
              <td className='wrap-anywhere'>{new Date(loan.approved_at).toLocaleString()}</td>
              <td>
                 <Button onClick={()=> handleStatus(loan._id, "rejected")}  
                  className="btn btn-info btn-xs">Reject</Button>
              </td>
            </tr>
           
          )))
          }
         </tbody>
        </table>
      
       
      
      </div>
    </div>
  )
}

export default ApprovedLoan
