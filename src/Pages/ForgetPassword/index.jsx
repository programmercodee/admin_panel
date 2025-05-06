import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { IoMdLogIn } from "react-icons/io";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import logo from '../../assets/icons/logo.jpg'

const ForgetPassword = () => {

  return (
    <section className='w-full h-full bg-[f1f1f1] select-none'>
      <header className=' w-full px-10 py-4 hidden md:flex items-center justify-between z-50'>
        <Link to="/" className='z-50'>
          <img src={logo} alt="" className='w-[130px]' />
        </Link>

        <div className="flex items-center gap-4 z-50">
          <NavLink to="/login" exact={true} activeClassName="isActive">
            <Link to="/login">
              <Button className='flex items-center gap-2 !rounded-full !text-[rgba(0,0,0,0.7)] !px-5'><IoMdLogIn className='text-[18px]' />Login</Button>
            </Link>
          </NavLink>

          <NavLink to="/signup" exact={true} activeClassName="isActive">
            <Link to="/signup">
              <Button className='flex items-center gap-2 !rounded-full !text-[rgba(0,0,0,0.7)] !px-5'><MdOutlinePersonAddAlt className='text-[18px]' />Sign Up</Button>
            </Link>
          </NavLink>
        </div>

      </header>
     

      <div className="card loginBox w-full md:pt-0 pt-5 md:px-0 px-5 md:w-[600px] h-[300px] mx-auto">
        <div>
          <img src={logo} alt="logo" className='m-auto rounded-lg' width={130} />
        </div>

        <div >
          <h1 className='text-center md:text-[37px] text-[20px] font-[700] mt-3'>
            Having trouble to sign in? <br />
            Reset your password.
          </h1>

          <br />

          <form className=' mx-auto'>
            <div className="form-group  mb-7 ">
              <TextField id="outlined-basic" label="Email *" type='email' variant="outlined" className='w-full' />
            </div>


            <div className="w-full mt-6">
              <Button className='w-full btn-blue !py-3'>Reset Password</Button>
            </div>
            <div className='text-center mt-8 z-50 pb-40 '>
              <h3 className='text-[rgba(0,0,0,0.8)] font-[400] z-50 '>Don’t want to reset?  <span className='text-[#000] font-[600] hover:text-blue-600 transition-all z-50 cursor-pointer'> <Link to={'/login'}> Sign In</Link></span> </h3>
            </div>

          </form>

        </div>

      </div>
    </section>
  )
}

export default ForgetPassword
