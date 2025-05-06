import React, { useContext, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { IoMdLogIn } from "react-icons/io";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import Button from '@mui/material/Button'
import logo from '../../assets/icons/logo.jpg'
import OtpBox from '../../components/OtpBox';

import shild from '../../assets/icons/shild.png'
import { MyContext } from '../../App';
import { postData } from '../../utils/api';

const VerifyAcount = () => {
  const [otp, setOtp] = useState('')

  const handleOtpChange = (value) => {
    setOtp(value)
  }

  const history = useNavigate()
  const context = useContext(MyContext)

  const verifyOTP = (e) => {
    e.preventDefault();
    if (otp !== "") {
      postData("/api/user/verifyEmail", {
        email: localStorage.getItem("userEmail"),
        otp: otp
      }).then((res) => {

        if (res?.error === false) {
          context.openAlertBox("success", res?.message)
          history("/login")
        } else {
          context.openAlertBox("error", res?.message)
        }
      })
    } else {
      context.openAlertBox("error", "Please enter otp.")
    }

  }


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
      <br />

      <div className="card loginBox w-[50%] h-[300px] mx-auto">
        <div>
          <img src={shild} alt="shild" className='m-auto rounded-lg' width={110} />
        </div>

        <div >
          <h1 className='text-center text-[37px] font-[700] my-3'>
            OTP Verification
          </h1>

          {/* <br /> */}
          <p className='text-[15px] text-center'>OTP has been sent to <span className='text-primary font-bold'>{localStorage.getItem("userEmail")}</span></p>
          <br />
          <form onSubmit={verifyOTP}>

            {/* <div className='text-center '> */}
              <OtpBox length={6} onChange={handleOtpChange} />
            {/* </div> */}
            <br />
            <br />
            <div className="w-[306px] m-auto">
              <Button type="submit" className='btn-blue w-full'>Verify OTP</Button>
            </div>

          </form>
        </div>

      </div>
    </section>
  )
}

export default VerifyAcount
