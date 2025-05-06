import React, { useContext, useEffect, useState } from 'react'
import UploadBox from '../../components/UploadBox'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { IoMdClose } from "react-icons/io";
import Button from '@mui/material/Button';
import { IoCloudUploadOutline } from "react-icons/io5";
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { MyContext } from '../../App';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { fetchDataFromApi, postData } from '../../utils/api';

const AddAddress = () => {
  const context = useContext(MyContext)
  const [phone, setPhone] = useState('');
  
  //select status
  const [status, setStatus] = useState(false);
 
  const [isLoading, setIsLoading] = useState(false)

  const [formFields, setFormFields] = useState({
    address_line: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    mobile: "",
    status: "",
    userId:"",
    selected : false
  })

  useEffect(()=>{
    setFormFields((prevState)=>({
      ...prevState,
      userId : context?.userData?._id
    }))


  },[context?.userData])

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
    setFormFields((prevState)=>({
      ...prevState,
      status : event.target.value
    }))
  };

 


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

  //ths is used in backend.
  const handleSubmit = (e) => {
    //prevenr the page load or refresh
    e.preventDefault();

    setIsLoading(true)

    //validation of email
    if (formFields.address_line === "") {
      context.openAlertBox("error", "Please enter Address Line!")
      return false
    }

    //validation of email
    if (formFields.city === "") {
      context.openAlertBox("error", "Please enter City!")
      return false
    }

    //validation of State
    if (formFields.state === "") {
      context.openAlertBox("error", "Please enter State!")
      return false
    }

    //validation of pincode
    if (formFields.pincode === "") {
      context.openAlertBox("error", "Please enter Pincode!")
      return false
    }

    //validation of country
    if (formFields.country === "") {
      context.openAlertBox("error", "Please enter Country!")
      return false
    }

    //validation of mobile
    if (phone === "") {
      context.openAlertBox("error", "Please enter 10 digit mobile number!")
      return false
    }

    console.log(formFields)
    postData("/api/address/add", formFields, { withCredentials: true }).then((res) => {
      // console.log(res)
      setIsLoading(false)
      //after submit blank all the fields
      if (res?.error !== true) {
        context.openAlertBox("success", res?.data?.message)
        setIsLoading(false)
        localStorage.setItem("userEmail", formFields.email)

      } else {
        context.openAlertBox("error", res?.message)
        setIsLoading(false)
      }

    })
  }


  return (
    <section className='p-5 bg-gray-50'>
      <form className='form p-5' onSubmit={handleSubmit}>
        <div className='grid grid-cols-2 gap-4 mb-6'>
          {/* User Address Input  */}
          <div className="col w-full">
            <h3 className='text-[14px] font-[600] mb-2'>Address Line 1</h3>
            <input type="text"
              className='w-full h-[40px] p-2 border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-md text-sm '
              name='address_line'
              //ths is used in backend.
              onChange={onChangeInput}
              value={formFields.address_line}
            />
          </div>
          <div className="col w-full">
            <h3 className='text-[14px] font-[600] mb-2'>City</h3>
            <input type="text"
              className='w-full h-[40px] p-2 border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-md text-sm '
              name='city'
              //ths is used in backend.
              onChange={onChangeInput}
              value={formFields.city}
            />
          </div>
        </div>

        <div className='grid grid-cols-3 gap-4 mb-3'>
          {/* User Address Input  */}
          <div className="col w-full">
            <h3 className='text-[14px] font-[600] mb-2'>State</h3>
            <input type="text"
              className='w-full h-[40px] p-2 border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-md text-sm '
              name='state'
              //ths is used in backend.
              onChange={onChangeInput}
              value={formFields.state}
            />
          </div>

          <div className="col w-full">
            <h3 className='text-[14px] font-[600] mb-2'>Pincode</h3>
            <input type="text"
              className='w-full h-[40px] p-2 border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-md text-sm '
              name='pincode'
              //ths is used in backend.
              onChange={onChangeInput}
              value={formFields.pincode}
            />
          </div>

          <div className="col w-full">
            <h3 className='text-[14px] font-[600] mb-2'>Country</h3>
            <input type="text"
              className='w-full h-[40px] p-2 border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-md text-sm '
              name='country'
              //ths is used in backend.
              onChange={onChangeInput}
              value={formFields.country}
            />
          </div>

          <div className="col w-full">
            <h3 className='text-[14px] font-[600] mb-2'>Mobile</h3>
            <PhoneInput
              defaultCountry="in"
              value={phone}
              onChange={(phone) => {
                setPhone(phone); {
                  setFormFields((prevState)=>({
                    ...prevState,
                    mobile : phone
                  }))
                }

              }}
            />
          </div>

          <div className="col w-full">
            <h3 className='text-[14px] font-[600] mb-2'>Status</h3>
            <Select
              value={status}
              onChange={handleChangeStatus}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              size='small'
              className='w-full'
            >

              <MenuItem value={true}>Active</MenuItem>
              <MenuItem value={false}>Diactive</MenuItem>
            </Select>
          </div>

        </div>

        <br />
        <div className='w-[270px]'>
          <Button type='submit' className='btn-blue w-full btn flex items-center gap-2' ><IoCloudUploadOutline className='text-[18px]' />Publish and View</Button>
        </div>
      </form>
    </section>
  )
}

export default AddAddress
