import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {Pagination, Autoplay,Navigation} from "swiper/modules";
import Card from '../Component/Card';
import ServiceCard from '../Component/serviceCard';
import SplitTextAnimation from '../Component/Animation';
import Animation from '../Component/Animation';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../Component/Shared/LoadingSpinner';
import { Helmet } from 'react-helmet';
import Title from '../Component/Shared/Title';
import {motion} from 'framer-motion';
import starr from '../assets/image.png'
import useAxiosSecure from '../hooks/useAxiosSecure';
import useRole from '../hooks/useRole';


function Home() {

 
   Title("Home")
 
  const axiosSecure = useAxiosSecure()

  const { data: loan = [], isLoading } = useQuery({
    queryKey: ['loann'],
    queryFn: async () => {
      const result = await axiosSecure.get(`${import.meta.env.VITE_API_URL}/homeloan`)
      return result.data
    },
  })

 


   const [service, setService] = useState([]);

 useEffect(()=>{
    fetch('http://localhost:3000/service').then(res=>res.json()).then(data => {
      setService(data);
    })
    .catch(err => {
      console.log(err);
    })
  },[])


  const [cdata, cdataSet] = useState([]);

 useEffect(()=>{
    fetch('http://localhost:3000/cmnt').then(res=>res.json()).then(data => {
      cdataSet(data);
      console.log(data);
    })
    .catch(err => {
      console.log(err);
    })
  },[])


 if(isLoading ){
    return <LoadingSpinner></LoadingSpinner>
  }
  
  return (
    <div>
    
         <div className='my-10'>
        <Swiper
  modules={[Pagination, Navigation,Autoplay]}
  spaceBetween={50}
  slidesPerView={1}
  navigation
  pagination={{ clickable: true }}
  loop={true}
  autoplay={{ delay: 3000, disableOnInteraction: false }}
  className="h-90 w-full "  // Slide height fix
>
  <SwiperSlide className="flex justify-center items-center h-full">
    <img
      className=" object-contain h-90 w-full object-cover"
      src="https://i.ibb.co.com/Kzy80z2G/Screenshot-2025-12-06-020049.png"
      alt="Slide 1"
    />
  </SwiperSlide>

  <SwiperSlide className="flex justify-center items-center h-full">
    <img
      className=" object-contain h-90 w-full object-cover"
      src="https://i.ibb.co.com/GfxMpQ2N/Screenshot-2025-12-06-014337.png"
      alt="Slide 2"
    />
  </SwiperSlide>

  <SwiperSlide className="flex justify-center items-center h-full">
    <img
      className="object-contain h-80 w-full object-cover"
      src="https://i.ibb.co.com/8Lmc3S5j/Screenshot-2025-12-06-020556.png"
      alt="Slide 3"
    />
  </SwiperSlide>
</Swiper>
      </div>

<Animation></Animation>
     
      <div className='md:w-1/3 w-10/12 mx-auto mt-10'>
        <p className='text-center'>Manage microloans faster and smarter with LoanLink. A unified system for applications, verification & approvals. Designed for NGOs and financial teams to streamline workflows.</p>

        <div className='w-full mt-10'>
       <Link to='alllones' className='btn btn-info w-full mx-auto'>Apply for Loan</Link>
     </div>
      </div>

<div className='relative'>
  <div className=' wrap-anywhere ani m-10 absolute -left-5 z-50'>
  <motion.img
   transition={{
    repeat: Infinity,
    duration: 2,
    ease: "linear",
  }}
      
   animate={{scale: [1,2,1], rotate:360, x: [0,100,-100,0]}}  className='h-10 sm:h-20' src={starr} alt="" />
</div>
</div>

<h1 className='font-bold text-4xl mt-10 mb-5 text-sky-400 text-center'>Available Loans</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
         {loan.map(d => <Card d={d}/>)}

      </div>

      <h1 className='font-bold text-4xl mt-10 mb-5 text-sky-400 text-center'>How it works</h1>

      <ul>
        <li className='text-center'><span className='font-bold'>Browse Loans</span> - Explore available loan options and find the one that fits your needs.</li>
        <li className='text-center'><span className='font-bold'>Apply Online</span> - Fill out a simple application form with your details.</li>
        <li className='text-center'><span className='font-bold'>Verification & Approval</span> - Our team reviews your application and verifies your documents.</li>
        <li className='text-center'><span className='font-bold'>Receive Funds</span> - Once approved, the loan amount is transferred directly to your account.</li>
      </ul>

      <h1 className='font-bold text-4xl mt-10 mb-5 text-sky-400 text-center'>Customer Feedback</h1>

      <div className='w-10/12 md:w-1/2 lg:w-1/3 mx-auto mt-10'>
      {cdata.length > 1 && (
         <Swiper
  modules={[Pagination, Navigation,Autoplay]}
  spaceBetween={30}
  slidesPerView={1}
  navigation
  pagination={{ clickable: true }}
  loop={true}
  autoplay={{ delay: 3000, disableOnInteraction: false }}
  
>

{
  cdata.map((c, idx) => (
    <SwiperSlide key={idx}>
      <div className='flex flex-col items-center text-center p-6 bg-sky-200 rounded-lg shadow-md'>
        <p className='text-black font-bold text-2xl'>{c.name}</p>
        <p className='text-black'>{c.feedback}</p>
      </div>
    </SwiperSlide>
  ))
}

</Swiper>
      )}
      </div>

     


  <div className='flex justify-center items-center my-10'>
<div className="stats stats-vertical lg:stats-horizontal shadow ">
  <div className="stat">
    <div className="stat-title">Partner NGOs</div>
    <div className="stat-value">50+</div>
    <div className="stat-desc">Across multiple regions</div>
  </div>

  <div className="stat">
    <div className="stat-title">Active Borrowers</div>
    <div className="stat-value">22K</div>
    <div className="stat-desc">Growing every month</div>
  </div>

  <div className="stat">
    <div className="stat-title">Approval Success Rate</div>
    <div className="stat-value">97%</div>
    <div className="stat-desc">Smooth digital processing</div>
  </div>
</div>
</div>


 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 justify-items-center  items-center gap-10 my-10 ">
{service.map((d,idx) => <ServiceCard key={idx} d={d}/>)}
 </div>
  
    </div>
  )
}

export default Home
