import React, { useContext, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
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
import CircularProgress from '@mui/material/CircularProgress';
import { postData } from '../../utils/api.js';
import { MyContext } from '../../App.jsx';

const SignUp = () => {
  //for Register button 
  const [isLoading, setIsLoading] = useState(false)

  //ths is used in backend.
  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    password: ""
  })

  //it ensure that every field not empty
  const valideValue = Object.values(formFields).every(el => el)

  const context = useContext(MyContext)
  const history = useNavigate()

  //ths is used in backend.
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(() => {
      return {
        ...formFields,
        [name]: value
      }
    })
  }

  const handleSubmit = (e) => {
    //prevenr the page load or refresh
    e.preventDefault();

    setIsLoading(true)

    //validation of name
    if (formFields.name === "") {
      context.openAlertBox("error", "Please enter full Name!")
      return false
    }
    //validation of email
    if (formFields.email === "") {
      context.openAlertBox("error", "Please enter Email ID!")
      return false
    }

    //validation of password
    if (formFields.password === "") {
      context.openAlertBox("error", "Please enter password!")
      return false
    }

    //
    postData("/api/user/register", formFields).then((res) => {
      // console.log(res)
      setIsLoading(false)
      //after submit blank all the fields
      if (res?.error !== true) {
        context.openAlertBox("success", res?.message)
        setIsLoading(false)
        localStorage.setItem("userEmail", formFields.email)
        //after submit blank all the fields
        setFormFields({
          name: "",
          email: "",
          password: ""
        })
        history('/verify-acount')
      } else {
        context.openAlertBox("error", res?.message)
        setIsLoading(false)
      }



    })
  }




  const [loadingGoogle, setLoadingGoogle] = useState(false);
  function handleClickGoogle() {
    setLoadingGoogle(true);
  }
  const [loadingFB, setLoadingFB] = useState(false);
  function handleClickFB() {
    setLoadingFB(true);
  }

  const [isShowPassword, setIsShowPassword] = useState(false)

  return (
    <section className='w-full h-full bg-[f1f1f1] select-none'>
      <header className=' w-full px-10 py-4 hidden md:flex items-center justify-between z-50'>
        <Link to="/" className='z-50'>
          <img src={logo} alt="" className='w-[130px] z-50' />
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
     

      <div className="card loginBox md:w-[600px] w-full px-5 md:px-0 md:pt-0 pt-5 h-[300px] mx-auto">
        <div>
          <img src={logo} alt="logo" className='m-auto rounded-lg' width={130} />
        </div>

        <div >
          <h1 className='text-center md:text-[37px] text-[18px] font-[700] mt-3'>
            Join us today! Get special <br />benefits and stay up-to-date.
          </h1>

          <div className="flex items-center justify-center w-full gap-8 mt-10">
            <Button
              size="small"
              onClick={handleClickGoogle}
              // endIcon={<FcGoogle />}
              loading={loadingGoogle}
              loadingPosition="end"
              variant="outlined"
              className='!text-[16px] !text-[rgba(0,0,0,0.8)] gap-2 w-full !font-[600] !capitalize !px-8 !py-1'
            >

              <FcGoogle className='!text-[25px]' /> Signin with Google
            </Button>
            
          </div>


          <div className="flex items-center justify-center w-full gap-3 my-12">
            <span className='flex items-center justify-center md:w-[165px] w-[100px] md:h-[1px] h-[2px] bg-[rgba(0,0,0,0.3)]'></span>
            <span className='md:text-[15px] sm:text-[12px] text-[7px] font-[500] text-[rgba(0,0,0,0.8)]'>Or, Sign up with your email</span>
            <span className='flex items-center justify-center md:w-[165px] w-[100px] md:h-[1px] h-[2px] bg-[rgba(0,0,0,0.3)]'></span>
          </div>

          <form className=' mx-auto' onSubmit={handleSubmit}>
            <div className="form-group  mb-7 ">
              <TextField
                label="Full Name *"
                type='text'
                name="name"
                variant="outlined"
                className='w-full'
                //ths is used in backend.
                onChange={onChangeInput}
                value={formFields.name}
              />
            </div>
            <div className="form-group  mb-7 ">
              <TextField
                label="Email *"
                type='email'
                name='email'
                variant="outlined"
                className='w-full'
                //ths is used in backend.
                onChange={onChangeInput}
                value={formFields.email}
              />
            </div>
            <div className="form-group mb-3  relative w-full">
              <TextField
                label="Password *"
                type={isShowPassword === false ? 'password' : 'text'}
                variant="outlined"
                className='w-full'
                name='password'
                //ths is used in backend.
                onChange={onChangeInput}
                value={formFields.password}
              />


              <Button type='submit' className=' !absolute !text-[rgba(0,0,0,0.6)] top-3 right-5 !w-[35px] !min-w-[35px] !h-[35px] !rounded-full' onClick={() => { setIsShowPassword(!isShowPassword) }}>
                {
                  isShowPassword === false ? <FaRegEye className='text-[20px] text-[rgba(0,0,0,0.6)]' /> : <FaRegEyeSlash className='text-[20px] text-[rgba(0,0,0,0.6)]' />
                }
              </Button>

            </div>

            <div className="form-group flex items-center justify-between mx-auto md:pt-0 pt-2 z-50 !text-[10px]">
              <div>
                <FormControlLabel control={<Checkbox />} label="By signing up you have agreed to our  Terms & Privacy Policy" className='!text-[rgba(0,0,0,0.7)] ' />
              </div>


            </div>

            <div className="w-full mt-6">
              <Button type="submit" className='w-full btn-blue !py-3' disabled={!valideValue} >
                {
                  isLoading === true ? <CircularProgress color="inherit" /> : 'Create Account'
                }
              </Button>
            </div>
            <div className='text-center mt-8 pb-40'>
              <h3 className='text-[rgba(0,0,0,0.8)] font-[400]'>Already have an account? <span className='md:text-[#000] text-blue-600 font-[600] md:hover:text-blue-600 transition-all'>
                <Link to={'/login'} className="" >
                  Sign Up
                </Link>

              </span> </h3>
            </div>

          </form>

        </div>

      </div>
    </section>
  )
}

export default SignUp
