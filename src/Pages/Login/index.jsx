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
import { MyContext } from '../../App';
import { postData } from '../../utils/api';
import CircularProgress from '@mui/material/CircularProgress';

const Login = () => {

  //for login button 
  const [isLoading, setIsLoading] = useState(false)

  const context = useContext(MyContext)

  const history = useNavigate();

  //ths is used in backend.
  const [formFields, setFormFields] = useState({
    email: "",
    password: ""
  })

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

  //it ensure that every field not empty
  const valideValue = Object.values(formFields).every(el => el)

  //ths is used in backend.
  const handleSubmit = (e) => {
    //prevenr the page load or refresh
    e.preventDefault();

    setIsLoading(true)

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
    postData("/api/user/login", formFields, { withCredentials: true }).then((res) => {
      console.log(res)
      setIsLoading(false)
      //after submit blank all the fields
      if (res?.error !== true) {
        context.openAlertBox("success", res?.message)
        setIsLoading(false)
        localStorage.setItem("userEmail", formFields.email)

        //after submit blank all the fields
        setFormFields({
          email: "",
          password: ""
        })

        localStorage.setItem("accessToken", res?.data?.accessToken)
        localStorage.setItem("refreshToken", res?.data?.refreshToken)

        context.setIsLogin(true)

        history('/')
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
      <div className='select-none'>
        <img src="https://images.pexels.com/photos/1939485/pexels-photo-1939485.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" className='w-full h-full fixed top-0 left-0 opacity-10 select-none z-0 hidden' />
      </div>

      <div className="card loginBox w-full md:w-[600px] h-[300px] md:px-0 px-5 md:py-0 py-5 md:mx-auto">
        <div>
          <img src={logo} alt="logo" className='m-auto rounded-lg' width={130} />
        </div>

        <div >
          <h1 className='text-center md:text-[37px] text-[20px] font-[700] mt-3'>
            Welcome Back! <br />
            Sign in with your credentials.
          </h1>

          <div className="flex items-center justify-center w-full gap-8 mt-10">
            <Button
              size="small"
              onClick={handleClickGoogle}
              // endIcon={<FcGoogle />}
              loading={loadingGoogle}
              loadingPosition="end"
              variant="outlined"
              className='md:!text-[16px] !text-[10px] !text-[rgba(0,0,0,0.8)] gap-2 !font-[600] !capitalize w-full md:!px-8  !py-2'
            >

              <FcGoogle className='md:text-[25px] text-[18px]' /> Signin with Google
            </Button>
           
          </div>


          <div className="flex items-center justify-center w-full gap-3 my-12">
            <span className='flex items-center justify-center md:w-[165px] w-[100px] md:h-[1px] h-[2px] bg-[rgba(0,0,0,0.3)]'></span>
            <span className='md:text-[15px] sm:text-[12px] text-[7px] font-[500] text-[rgba(0,0,0,0.8)]'>Or, Sign in with your email</span>
            <span className='flex items-center justify-center md:w-[165px] w-[100px] md:h-[1px] h-[2px] bg-[rgba(0,0,0,0.3)]'></span>
          </div>

          <form className=' mx-auto' onSubmit={handleSubmit}>
            <div className="form-group  mb-7 ">
              <TextField
                label="Email *"
                type='email'
                variant="outlined"
                className='w-full'
                name='email'
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
                className='w-full '
                name='password'
                //ths is used in backend.
                onChange={onChangeInput}
                value={formFields.password}
              />

              <Button className=' !absolute !text-[rgba(0,0,0,0.6)] top-3 right-5 !w-[35px] !min-w-[35px] !h-[35px] !rounded-full' onClick={() => { setIsShowPassword(!isShowPassword) }}>
                {
                  isShowPassword === false ? <FaRegEye className='text-[20px] text-[rgba(0,0,0,0.6)]' /> : <FaRegEyeSlash className='text-[20px] text-[rgba(0,0,0,0.6)]' />
                }
              </Button>

            </div>

            <div className="form-group flex items-center justify-between mx-auto z-50">
              <div>
                <FormControlLabel control={<Checkbox />} label="Remember Me" className='!text-[rgba(0,0,0,0.7)]' />
              </div>

              <Link to="/forget-password" className='text-primary z-50 hover:underline hover:!text-[rgba(0,0,0,0.7)] transition-all font-[500]'>Forgot Password?</Link>
            </div>

            <div className="w-full mt-6">
              <Button type="submit" className='w-full btn-blue text-[#fff] !py-3'>
             {
                isLoading === true ? <CircularProgress color="inherit" /> : ' Sign In'
              }</Button>
               
            
            </div>
            <div className='text-center mt-8 pb-40'>
              <h3 className='text-[rgba(0,0,0,0.8)] font-[400]'>Don’t have an account? <span className='text-[#000] font-[600] hover:text-blue-600 transition-all'> <Link to={"/signup"}> Sign Up</Link></span> </h3>
            </div>

          </form>

        </div>

      </div>
    </section>
  )
}

export default Login
