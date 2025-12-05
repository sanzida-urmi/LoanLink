import React from 'react'
import { FaXTwitter } from "react-icons/fa6";
import { Link } from 'react-router';
import { GiReceiveMoney } from "react-icons/gi";

function Footer() {
  return (
   <footer className="footer sm:footer-horizontal  bg-base-300 text-base-content p-10 rounded-2xl  wrap-anywhere">

      <nav>
     <GiReceiveMoney size={35} />
    <h6 className="footer-title">LoanLink</h6>
    <p>LoanLink is a webb-based microloan management system that streamlines loan requests, verification, approvals and EMI tracking</p>
    <p className='mb-10'>Copyright © {new Date().getFullYear()} - All right reserved by ACME Industries Ltd</p>
  </nav>
    
  {/* <nav>
   <p>LoanLink is a webb-based microloan management system that streamlines loan requests, verification, approvals and EMI tracking</p>
  </nav> */}

  <nav>
       

    <h6 className="footer-title">Social</h6>
    <div className="grid grid-flow-row gap-4">
      <div className='flex gap-5'>
        <div className='mt-1'>
                
        <FaXTwitter />
      
        </div>
      <p>
        <Link to="https://x.com" className='border-b-1 border-b-gray-400'>Twitter</Link>
      </p>
      </div>
      
      <div  className='flex gap-5'>
        <div>
          <a>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="fill-current">
          <path
            d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
        </svg>
      </a>
        </div>
        <p>
        <Link to="https://www.youtube.com/" className='border-b-1 border-b-gray-400'>YouTube</Link>
      </p>
      </div>

      <div  className='flex gap-5'>
        <div>
          <a>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="fill-current">
          <path
            d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
        </svg>
      </a>
        </div>
         <p>
        <Link to="https://www.facebook.com/" className='border-b-1 border-b-gray-400'>Facebook</Link>
      </p>
      </div>

    </div>
  </nav>
</footer>
  )
}

export default Footer
