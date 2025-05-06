import React from 'react'
import UploadBox from '../../components/UploadBox'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Rating from '@mui/material/Rating';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { IoMdClose } from "react-icons/io";
import Button from '@mui/material/Button';
import { IoCloudUploadOutline } from "react-icons/io5";

const AddHomeSlide = () => {
  return (
    <section className='p-5 bg-gray-50'>
      <form className='form p-5'>
        <div className="col w-full p-5 px-0 rounded-md">
          <h3 className='font-[700] text-[20px] mb-2'>Media & Images</h3>
          <div className="grid grid-cols-8 gap-4">

            {/* Porduct img models  */}
            <div className="uploadBoxWrapper relative">
              <span className='h-[20px] w-[20px] rounded-full overflow-hidden bg-red-600 hover:bg-red-500 transition-all absolute -top-[8px] -right-[8px] flex items-center justify-center z-50 cursor-pointer'><IoMdClose className=' text-[12px] text-[#fff]' /></span>
              <div className=' uploadBox h-[150px] w-[100%] rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.5)] bg-gray-100 cursor-pointer hover:bg-gray-200 transition-all flex items-center justify-center flex-col relative z-10'>
                <LazyLoadImage
                  alt={"image"}
                  effect='blur'
                  src={"https://i.pinimg.com/736x/5a/1e/86/5a1e86e1bd6ba371916bb9906ef5ec11.jpg"} // use normal <img> attributes as props
                  wrapperProps={{
                    // If you need to, you can tweak the effect transition using the wrapper style.
                    style: { transitionDelay: "0.5s" },
                  }}
                  className='!w-full !h-full !object-cover hover:scale-105 transition-all duration-700'
                />
              </div>
            </div>



            <UploadBox multiple={true} />
          </div>
        </div>
        <br />
        <div className='w-[270px]'>
          <Button type='submit' className='btn-blue w-full btn flex items-center gap-2'><IoCloudUploadOutline className='text-[18px]' />Publish and View</Button>
        </div>
      </form>
    </section>
  )
}

export default AddHomeSlide
