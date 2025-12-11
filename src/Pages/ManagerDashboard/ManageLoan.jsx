import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState } from 'react'
import useAuth from '../../hooks/useAuth';
import LoadingSpinner from '../../Component/Shared/LoadingSpinner';
import { Link } from 'react-router';
import DeleteModal from '../../Component/modal/DeleteModal';
import Title from '../../Component/Shared/Title';
import useAxiosSecure from '../../hooks/useAxiosSecure';

function ManageLoan() {
    Title("Manage Loan")
      const axiosSecure = useAxiosSecure()

        const { user , loading,setLoading} = useAuth();
        
    console.log(user?.displayName);



     const { data: loans = [], isLoading, isFetching, refetch } = useQuery({
    queryKey: ['loan', user?.email],
    queryFn: async () => {
      const result = await axiosSecure(`${import.meta.env.VITE_API_URL}/allloan?email=${user?.email}`)
      return result.data
    },
})

 

  let [isOpen, setIsOpen] = useState(false)
      const closeModal = () => setIsOpen(false)
   const [selectedLoan,setSelectedLoan] = useState(null);

   const handleCancel = async () => {

      if (!selectedLoan) return;

      try{

        const res = await axiosSecure.delete(`/oneloan/${selectedLoan._id}`);
         refetch();
          closeModal();
      }  catch (err) {
        console.log(err);
      }
    }

   
const [search,setSearch] = useState('');
const filteredLoans = loans.filter((loan)=> loan.loanCategory.toLowerCase().includes(search.toLocaleLowerCase()))


 if(loading || isLoading || isFetching) {
      return  <LoadingSpinner></LoadingSpinner>
    }

  return (
    <div>
       

    <div>
      <input type="text"
      placeholder='search by category...'
      className=' input input-bordered w-full max-w-xs mb-6'
      value={search}
      onChange={(e)=> setSearch(e.target.value)} />
    </div>
      <div className="overflow-x-auto">
  <table className="table md:table-zebra table-xs table-fixed">
    {/* head */}
    <thead>
      <tr>
       
        <th>Image</th>
        <th>Title </th>
        <th>Interest</th>
        <th>Category</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>

    
    
     { filteredLoans.length === 0? (
      <tr>
        <td colSpan="6" className="text-gray-700 text-center text-4xl font-bold p-6 ">
        not fount
        </td>
      </tr>
     ):(
        filteredLoans.map((l,idx)=> <tr key={idx}>
        
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={l.imgURL}
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
           
          </div>
        </td>
        <td>
         {l.title}          
        </td>
        <td>{l.interest}</td>
        <td>{l.loanCategory}</td>
        <th>
          <div className='flex gap-2 md:flex-row flex-col'>
            <Link  to={`/dashboard/update-loan/${l._id}`} className="btn btn-info btn-xs">Update</Link>
          <button className="btn btn-info btn-xs" onClick={() =>{ setIsOpen(true); setSelectedLoan(l)}}>Delete</button>
         
          </div>
           <DeleteModal onConfirm={handleCancel} isOpen={isOpen} closeModal={closeModal} />
        </th>
      </tr>))
     }
     
    </tbody>
    
  </table>
</div>
    </div>
  )
}

export default ManageLoan
