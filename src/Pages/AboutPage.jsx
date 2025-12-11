import React from 'react'
import { Link } from 'react-router'

function AboutPage() {
  return (
    <div>
      <div>
<img className='w-10/12 md:w-2/6 rounded-md mx-auto my-10' src="https://i.ibb.co.com/F43TJmGL/money-2724241-1280.jpg" alt="" />
      </div>

      <div>
<p className='w-10/12 md:w-2/4 text-center text-2xl mx-auto'>We are a dedicated team of innovators, designers, and developers focused on building impactful digital products. From strategy to execution, we deliver modern , efficient, and user-friendly solutions that help businesses grow.</p>

<p className='text-center w1/2 my-10 font-bold'>

Our approach is simple:
 <br />
 listen deeply, thik boldly, and deliver responsibly.
</p>
<div className='flex justify-center items-center'><Link to='/alllones' className='btn btn-info mx-auto'>Go For Loan</Link></div>
      </div>

<div className='bg-sky-200 text-black rounded-md py-10 my-10'>
    <div className='flex w-3/4 mx-auto  gap-10 flex-col md:flex-row '>
    <div>
        <p className='font-bold'>Who We Are</p>
        <p>We are a team of dedicated developers, designers, and thinkers who believe in the power of technology. Our mission is to create user-friendly and elegant solutions that solve real-word problems. We combine creativity with technical expertise to deliver products that stand out.</p></div>
    <div>
        <p className='font-bold'>What We Do</p>
        <p>From web development to custom software solutions, we help businesses transform their ideas into powerful applications.We focus on performance, aesthetics, and long-term scalability—ensuring your digital presence grows with your goals.</p></div>
</div>
</div>

<div>
    <p className='font-bold text-center mb-10'>
      
      We continuously explore new ideas, tools, and technologies to build better solutions.
      </p>
    <p className='text-center w-3/4 mx-auto'>
    Our mission is to empower individuals and businesses through modern technology.We aim to deliver smart, scalable, and elegant solutions that solve real-word problems and elevate user experiences.
    </p>
</div>

 <div className='flex justify-center items-center my-10'>
<div className="stats stats-vertical lg:stats-horizontal shadow ">
  <div className="stat">
    <div className="stat-title">Partner NGOs</div>
    <div className="stat-value">50+</div>
    <div className="stat-desc">Across multiple regions </div>
  </div>

  <div className="stat">
    <div className="stat-title">Active Borrowers</div>
    <div className="stat-value">22K</div>
    <div className="stat-desc">Growing every month</div>
  </div>

  <div className="stat">
    <div className="stat-title">Approval Success Rate </div>
    <div className="stat-value">97%</div>
    <div className="stat-desc">Smooth digital processing </div>
  </div>
</div>
</div>



    </div>
  )
}

export default AboutPage
