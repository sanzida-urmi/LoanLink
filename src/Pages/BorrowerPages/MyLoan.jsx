import React from 'react'
import { Helmet } from 'react-helmet';
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from 'react-router';
import DeleteModal from '../../Component/modal/DeleteModal';
import axios from 'axios';
import LoadingSpinner from '../../Component/Shared/LoadingSpinner';
import Title from '../../Component/Shared/Title';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

function MyLoan() {
   Title("My Loans")
const {user,loading,setLoading} = useAuth();
// const [loans, setLoans]= useState([])
     let [isOpen, setIsOpen] = useState(false)
  const closeModal = () => setIsOpen(false)
    const axiosSecure = useAxiosSecure()


     const { data: loans = [], isLoading,isFetching } = useQuery({
    queryKey: ['userloan'],
    queryFn: async () => {
      const result = await axiosSecure.get(`${import.meta.env.VITE_API_URL}/myApplyLoan?email=${user?.email}`)
      setLoading(false);
      return result.data
    },
  })
  



const [selectedLoan,setSelectedLoan] = useState(null);
const handleCancel = async () => {
  if (!selectedLoan) return;
  try{
    const res = await fetch(`http://localhost:3000/applyloan/${selectedLoan._id}`,{
      method: 'DELETE',
    });
    if(res.ok){
      setLoans(loans.filter(loan => loan._id !== selectedLoan._id));
      closeModal();
    } else {
      console.log("Dlt field");
    }
  }  catch (err) {
    console.log(err);
  }
}

 const handlePayment=async (loan)=>{

   const paymentInfo = {
    loanID: loan._id,
    title: loan.title,
    amount: loan.amount,
    status: loan.status,
    borrower: {
      email: user?.email,
      image: user.photoURL
    },
    
    } 
     console.log(paymentInfo);

     const {data} = await axios.post(
      `${import.meta.env.VITE_API_URL}/create-checkout-session`,
      paymentInfo
    )
    window.location.href = data.url 

 }
const [modalLoan,setModalLoan] = useState(null);


 const handleModal =(loan)=>{
setModalLoan(null);
setTimeout(()=>{
  setModalLoan(loan);
},0);
 };

 useEffect(()=>{
if(!modalLoan?._id) return
    document.getElementById('my_modal_5').showModal()

    fetch(`http://localhost:3000/paidmodal/${modalLoan._id}`)
    .then(res => res.json())
    .then(data =>{
        setPaidloan(data[0]);
    });



},[modalLoan])


 let [paidloan, setPaidloan] = useState(null)


  if(loading || isLoading || isFetching){
    return <LoadingSpinner></LoadingSpinner>
  }


   return (
    
    <div>
           <div className="overflow-x-auto w-full">
  <table className="table table-zebra wrap-anywhere table-fixed w-full">
    {/* head */}
    <thead>
      <tr className='wrap-anywhere'>
        <th className='wrap-anywhere'>Loan ID</th>
        <th className='wrap-anywhere'>Title</th>
        <th className='wrap-anywhere'>Amount</th>
        <th className='wrap-anywhere'>Status</th>
        <th className='wrap-anywhere'>Actions </th>
      </tr>
    </thead>

{
   loans.length === 0? (
      <tr>
        <td colSpan="6" className="text-gray-700 wrap-anywhere text-center text-4xl font-bold p-6 ">
        not fount
        </td>
      </tr>
     ):(
    loans.map((loan,idx) =>  (<tbody key={idx}>
      {/* row 1 */}
      <tr className='wrap-anywhere'>
        <th className='wrap-anywhere'>{loan.loanID}</th>
        <td className='wrap-anywhere'>{loan.title}</td>
        <td className='wrap-anywhere'>{loan.amount}</td>
        <td className='wrap-anywhere'>{loan.status}</td>
        <td className='flex gap-3 wrap-anywhere flex-col sm:flex-row'>
            <Link className='btn   btn-info btn-xs' to={`/loan/${loan.loanID}`}>View</Link>

            {loan.status == 'pending' && (<button className='btn btn-info  btn-xs' onClick={() =>{ setIsOpen(true); setSelectedLoan(loan)}}>Cancel</button>
        
        
        )}
         <DeleteModal onConfirm={handleCancel} isOpen={isOpen} closeModal={closeModal} />

{
 (loan.fee !== 'paid') &&
 <button onClick={() => handlePayment(loan)} className='btn btn-info btn-xs'>Pay</button>

}


{
 (loan.fee == 'paid') &&
 <button onClick={() => handleModal(loan)} className='btn btn-info btn-xs'>Paid</button>

}
  


        </td>

      </tr>
      
    </tbody>)
    ))
}
   
  </table>

  <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    <h3 className="font-bold text-lg">{modalLoan?.title}!</h3>
    <p className="py-4"><span className='font-bold'>Borrower email:</span>{modalLoan?.email}</p>
    <p className="py-4"><span className='font-bold'>transactionId:</span> {paidloan?.transactionId}</p>
    <p className="py-4"><span className='font-bold'>Loan ID:</span> {modalLoan?.loanID}</p>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
</div>
    </div>
  )
}
 export default MyLoan;
