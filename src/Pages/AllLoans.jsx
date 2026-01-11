import React, { useEffect, useState } from 'react'
import AllSingleCard from '../Component/AllSingleCard';
import { useQuery } from '@tanstack/react-query'
import axios from 'axios';
import LoadingSpinner from '../Component/Shared/LoadingSpinner';
import { Helmet } from 'react-helmet';
import Title from '../Component/Shared/Title';



function AllLoans() {
 Title("All Loans")
    const { data: loan = [], isLoading } = useQuery({
    queryKey: ['loan'],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/loan`)
      return result.data
    },
  })

 
  const [searchText,setSearchText] = useState("");
  const [currentPage,setCurrentPage] = useState(1);
  const loansPerPage = 8;

    if(isLoading){
    return <LoadingSpinner></LoadingSpinner>
  }

  
  const searchedLoans = loan.filter(item => 
    (item?.title || "")
    .toLowerCase().includes(searchText.toLowerCase())
    
    )
 
const indexOfLastLoan = currentPage * loansPerPage;
const indexOfFirstLoan = indexOfLastLoan - loansPerPage;
const currentLoans = searchedLoans.slice(indexOfFirstLoan, indexOfLastLoan);
const totalPages = Math.ceil(searchedLoans.length / loansPerPage);

const handleSearch = (e) => {
  setSearchText(e.target.value);
  setCurrentPage(1);
};

  return (
    <div>
         <div className='flex justify-center mt-5'>
        <input type="text"
        placeholder='Search loan bt title...'
        value={searchText}
        onChange={handleSearch}
        className='input input-bodered w-full max-w-xs' />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-10">
         {currentLoans.map(d => <AllSingleCard key={d._id}  d={d}/>)}

      </div>


<div className='flex justify-center mt-8 gap-2'>
  <button className='btn btn-sm' disabled={currentPage === 1} onClick={()=> setCurrentPage(currentPage - 1)}>Prev</button>
  {[...Array(totalPages)].map((_, i) => (
    <button key={i} className={`btn btn-sm ${currentPage === i+1 ? "btn-info" : ""}`}
    onClick={()=> setCurrentPage(i+1)}
    > {i+1}</button>
  ))}


  <button className='btn btn-sm ' disabled={currentPage === totalPages} onClick={()=> setCurrentPage(currentPage+1)}>
    Next
  </button>


</div>
      
    </div>
  )
}

export default AllLoans
