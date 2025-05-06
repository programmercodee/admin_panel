import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { IoMdLogIn } from "react-icons/io";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import Button from '@mui/material/Button'
import logo from '../../assets/icons/logo.jpg'

const ChangePassword = () => {


  const [isShowPassword, setIsShowPassword] = useState(false)

  return (
    <section className='w-full h-full bg-[f1f1f1] select-none'>
      <header className=' w-full px-10 py-4 flex items-center justify-between z-50'>
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

      <div className="card loginBox w-[50%] h-[300px] mx-auto">
        <div>
          <img src={logo} alt="logo" className='m-auto rounded-lg' width={130} />
        </div>

        <div >
          <h1 className='text-center text-[33px] font-[700] mt-3'>
            Welcome Back! <br />
            You can change your password from here
          </h1>

          <br />
          <form className=' w-[75%] mx-auto'>
            <div className="form-group mb-3  relative w-full">
              <TextField id="outlined-basic" label="NewPassword *" type='password' variant="outlined" className='w-full' />

            
            </div>
            <br />
            <div className="form-group mb-3  relative w-full">
              <TextField id="outlined-basic" label="Confirm Password *" type={isShowPassword === false ? 'password' : 'text'} variant="outlined" className='w-full' />

              <Button className=' !absolute !text-[rgba(0,0,0,0.6)] top-3 right-5 !w-[35px] !min-w-[35px] !h-[35px] !rounded-full' onClick={() => { setIsShowPassword(!isShowPassword) }}>
                {
                  isShowPassword === false ? <FaRegEye className='text-[20px] text-[rgba(0,0,0,0.6)]' /> : <FaRegEyeSlash className='text-[20px] text-[rgba(0,0,0,0.6)]' />
                }
              </Button>
            </div>



            <div className="w-full mt-6">
              <Button className='w-full btn-blue !py-3'>Change Password</Button>
            </div>
            

          </form>

        </div>

      </div>
    </section>
  )
}

export default ChangePassword
