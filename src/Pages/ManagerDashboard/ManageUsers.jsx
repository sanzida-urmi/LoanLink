import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { Link } from 'react-router'
import LoadingSpinner from '../../Component/Shared/LoadingSpinner'
import useAuth from '../../hooks/useAuth'
import { Helmet } from 'react-helmet';
import Title from '../../Component/Shared/Title'
import useAxiosSecure from '../../hooks/useAxiosSecure'


function ManageUsers() {

  Title("Manage Users");
 const axiosSecure = useAxiosSecure()
  const [filterRole,setFilterRole] = React.useState("all");
  const [search,setSearch] = React.useState("");

    const { data: users = [], isLoading , isFetching} = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const result = await axiosSecure(`${import.meta.env.VITE_API_URL}/users`)
     
      return result.data
    },
    refetchOnMount: 'always',
  })

   console.log(users)

  
const filteredUsers = users.filter(user=>{
  const matchesSearch = user.name
  .toLowerCase()
  .includes(search.toLowerCase());

  const matchesRole = filterRole === "all" ? true : user.role === filterRole;
  return matchesSearch && matchesRole;
});


    if(isLoading || isFetching){
    return <LoadingSpinner></LoadingSpinner>
  }

 

  return (
    <div>
      
<div className=' flex flex-row gap-4'>
  <select
className='select select-bordered mb-4'
value={filterRole} onChange={(e)=> setFilterRole(e.target.value)}>
  <option value="all">All</option>
  <option value="admin">Admin</option>
  <option value="borrower">Borrower</option>
  <option value="customer">Customer</option>
</select>
<input type="text" placeholder='search by name...' className='input input-bordered ml-4 mb-4 w-full max-w-xs'
value={search} onChange={(e)=> setSearch(e.target.value)} />
</div>


<div className="overflow-x-auto">
  <table className="table table-zebra table-fixed w-full">
    {/* head */}
    <thead>
      <tr className='wrap-anywhere'>
        <th className='wrap-anywhere'>Name</th>
        <th className='wrap-anywhere'>Email</th>
        <th className='wrap-anywhere'>Role</th>
        <th className='wrap-anywhere'>Actions</th>
      </tr>
    </thead>

{ filteredUsers.length === 0? (
      <tr>
        <td colSpan="6" className="text-gray-700 wrap-anywhere text-center text-4xl font-bold p-6 ">
        not fount
        </td>
      </tr>
     ):(
    filteredUsers.map((user,idx) => <tbody key={idx}>
      {/* row 1 */}
      <tr className='wrap-anywhere'>
        <th className='wrap-anywhere'>{user.name }</th>
        <td className='wrap-anywhere'>{user.email}</td>
        <td className='wrap-anywhere'>{user.role}</td>
        <td className='wrap-anywhere'>
            <Link state={{email: user.email}} to="/dashboard/updateUser" className='btn btn-info wrap-anywhere btn-xs'>Update</Link>
        </td>
      </tr>   
    </tbody> ))
}
   

  </table>
</div>
      
    </div>
  )
}

export default ManageUsers
