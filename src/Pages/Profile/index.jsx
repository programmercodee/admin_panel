import React, { useContext, useEffect, useState } from 'react'
import usericon from '../../assets/icons/user.png'
import CircularProgress from '@mui/material/CircularProgress';
import { MdCloudUpload } from "react-icons/md";
import { MyContext } from '../../App';
import { editData, fetchDataFromApi, uploadImage } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import Radio from '@mui/material/Radio';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const Profile = () => {

  //radio button
  const [selectedValue, setSelectedValue] = React.useState('');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);

  };
  const [phone, setPhone] = useState('');

  const [address, setAddress] = useState([])
  const context = useContext(MyContext)
  //used in backend 
  const [previews, setPreviews] = useState([])

  const [uploading, setUploading] = useState(false)
  const history = useNavigate()


  //for login button 
  const [isLoading, setIsLoading] = useState(false)
  const [userId, setUserId] = useState("")
  //ths is used in backend.
  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    mobile: ""
  })

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    //no access of "MyAccount" page without login.
    if (token === null) {
      history("/");
    }

  }, [context.isLogin])

  useEffect(() => {
    if (context?.userData?._id !== "" && context?.userData?._id !== undefined) {

      fetchDataFromApi(`/api/address/get?userId=${context?.userData?._id}`).then((res) => {
        setAddress(res?.addresses)
        console.log(res?.addresses)
      })

      setUserId(context?.userData?._id)
      setFormFields({
        name: context?.userData?.name,
        email: context?.userData?.email,
        mobile: context?.userData?.mobile,
      })

      const ph = `"${context?.userData?.mobile}"`

      setPhone(ph)
    }
  }, [context?.userData])




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
    if (formFields.name === "") {
      context.openAlertBox("error", "Please enter Name!")
      return false
    }

    //validation of email
    if (formFields.email === "") {
      context.openAlertBox("error", "Please enter Email ID!")
      return false
    }

    //validation of password
    if (formFields.password === "") {
      context.openAlertBox("error", "Please enter Mobile Number!")
      return false
    }

    //
    editData(`/api/user/${userId}`, formFields, { withCredentials: true }).then((res) => {
      // console.log(res)
      setIsLoading(false)
      //after submit blank all the fields
      if (res?.error !== true) {
        context.openAlertBox("success", res?.data?.message)
        setIsLoading(false)
        // localStorage.setItem("userEmail", formFields.email)



      } else {
        context.openAlertBox("error", res?.message)
        setIsLoading(false)
      }

    })
  }


  //for only image upload and set image
  useEffect(() => {
    const userAvtar = []
    if (context?.userData?.avatar !== "" && context?.userData?.avatar !== undefined) {
      userAvtar.push(context?.userData?.avatar)
      setPreviews(userAvtar)
    }
  }, [context?.userData])



  let selectedImages = []

  const formdata = new FormData()

  const onchangeFile = (e, apiEndPoint) => {
    try {
      //img save in this state varialbe from cloudnary
      setPreviews([])

      const files = e.target.files;
      setUploading(true)
      // console.log(files)
      for (var i = 0; i < files.length; i++) {
        if (files[i] && (files[i].type === "image/jpeg" ||
          files[i].type === "image/jpg" ||
          files[i].type === "image/png" ||
          files[i].type === "image/webp")) {

          const file = files[i]
          selectedImages.push(file)
          formdata.append(`avatar`, file)

          uploadImage("/api/user/user-avatar", formdata).then((res) => {
            setUploading(false)
            //getting image from response
            let avatar = []
            avatar.push(res?.data?.avtar)
            setPreviews(avatar)
            // console.log(res)
            // console.log(avatar)
          })

        } else {

          context.openAlertBox("error", "Please select a valid JPG, JPEG, WEBP or PNG image file.")
          setUploading(false)
          return false;
        }
      }

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="card my-3 sm:rounded-lg bg-white shadow-md p-5 w-[55%]">
        <div className="col1 flex items-center justify-between ">
          <h1 className='font-[700] text-[20px] text-gray-800'>Users Profile</h1>
        </div>
        <br />

        {/* user iamge upload section  */}
        <div className="w-[110px] h-[110px] min-w-[80px] rounded-full overflow-hidden relative  flex justify-center items-center bg-gray-200">

          {
            uploading === true ?
              < CircularProgress color="inherit" className='' /> :
              <>
                {
                  previews?.length !== 0 ? previews?.map((img, index) => {
                    // console.log(img)
                    return (
                      <img className='w-full h-full object-cover' src={img} key={index} />
                    )
                  })

                    :

                    <img className='w-full h-full object-cover' src={usericon} />
                }
              </>
          }


          <div className="w-[100%] h-[100%] overlay bg-[rgba(0,0,0,0.5)] absolute z-50 top-0 left-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-all duration-300">
            <MdCloudUpload className='text-white text-3xl' />
            <input type="file"
              id=""
              className='h-full w-full opacity-0 absolute top-0 left-0'
              onChange={(e) => {
                //route of "user.route.js" in server folder.
                onchangeFile(e, "/api/user/user-avatar")
              }}
              //name of "user.model.js" in server folder.
              name="avatar"
              accept='image/*'
            />
          </div>

        </div>

        <br />

        <form className=' form' onSubmit={handleSubmit}>
          <div className="flex items-center gap-5">
            <div className="w-[50%]">

              <h3 className='text-[14px] font-[600] mb-2 ml-1'>Full Name</h3>

              <input type="text"
                name='name'
                className='w-full h-[40px] p-2 border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-md text-sm '
                //ths is used in backend.
                onChange={onChangeInput}
                value={formFields.name}
              />
            </div>

            <div className="w-[50%]">

              <h3 className='text-[14px] font-[600] mb-2 ml-1'>Email ID</h3>
              <input type="text"
                name='email'
                className='w-full h-[40px] p-2 border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-md text-sm '
                //ths is used in backend.
                onChange={onChangeInput}
                value={formFields.email}
                disabled={true}
              />

            </div>
          </div>

          <div className="flex items-center gap-5 mt-3">
            <div className="w-[50%]">

              <h3 className='text-[14px] font-[600] mb-2 ml-1'>Mobile Number</h3>

              <PhoneInput
                defaultCountry="in"
                value={phone}
                onChange={(phone) => {
                  setPhone(phone);
                  setFormFields({
                    mobile: phone
                  })
                }}
              />

            </div>
            <div className="w-[50%]"></div>
          </div>

          {/* add address fields  */}
          <div className="flex items-center justify-center p-5 border rounded-md border-dashed border-[rgba(0,0,0,0.5)] mt-4 bg-[#f1faff] hover:bg-[#dde8ee] transition-all cursor-pointer" onClick={() => {
            context.setIsOpenFullScreenPanel({
              open: true,
              model: "Add new Address"
            })
          }}>
            <span className='text-[16px] font-[500]'>Add Address</span>
          </div>

          <div className="flex gap-3 mt-3 flex-col">

            {

              address?.length > 0 && address?.map((address, index) => {
                return (
                  <>
                    <label className="addressBox w-full flex items-center justify-center bg-[#f1f1f1] p-3 rounded-md border  border-dashed border-[rgba(0,0,0,0.5)]">
                      <Radio {...label}
                        name='address'
                        checked={selectedValue === (address?._id)}
                        onChange={handleChange}

                        value={address?._id}
                      />
                      <span>
                        {
                          address?.address_line + " , " + address?.city + " , " + address?.state + " , " + address?.pincode + " , " + address?.country
                        }
                      </span>
                    </label>
                  </>
                )
              })

            }

          </div>




          <div className="flex items-center gap-3 mt-5">
            <Button type='submit' className='btn-blue !capitalize w-full'>
              {
                isLoading === true ? <CircularProgress color="inherit" /> : 'Update Profile'
              }
            </Button>

          </div>

        </form>

      </div>
    </>
  )
}

export default Profile
