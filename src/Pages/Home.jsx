import React from 'react'
import { Link } from 'react-router'

function Home() {
  return (
    <div>
      <h1 className='text-red-300'>hi</h1>
      <Link to='/signup'>sign up</Link>
      <Link to='/login'>login</Link>
      
    </div>
  )
}

export default Home
