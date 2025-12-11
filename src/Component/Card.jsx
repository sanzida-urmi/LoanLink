import React from 'react'
import { Link } from 'react-router'

function Card({d}) {
    const {imgURL,title,shortDescription,maxLoanLimit,_id} = d
  return (
    <div className='wrap-anywhere'>
      <div className="card bg-base-300 w-full h-110 shadow-md
      overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-2
                     ">
  <figure>
    <img className='h-50 w-50 mt-10'
      src={imgURL}
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title mb-5">{title}</h2>
    <p className='font-semibold'>shortDescription: {shortDescription}</p>
    <p className='font-semibold'>maxLoanLimit: {maxLoanLimit}</p>
    
    
    <div className="card-actions justify-end">
      <Link
      to={`/loan/${_id}`}
        className="btn btn-active  btn-info">View Details</Link>

    </div>
  </div>
</div>
    </div>
  )
}

export default Card
