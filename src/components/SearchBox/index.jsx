import React from 'react'
import { CiSearch } from "react-icons/ci";


const SearchBox = () => {
  return (
    <div className='w-full h-auto  relative overflow-hidden'>
      <input type="text" className='w-full h-[40px] p-3 pl-9 border border-[rgba(0,0,0,0.1)] bg-[#f1f1f1] focus:outline-none focus:border-[rgba(0,0,0,0.3)] rounded-md text-[15px] ' placeholder='Search here...'/>
      <CiSearch className='absolute top-[10px] left-3 text-[20px] text-[rgba(0,0,0,0.7)] pointer-events-none'/>
    </div>
  )
}

export default SearchBox
