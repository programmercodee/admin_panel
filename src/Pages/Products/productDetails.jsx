import React, { useEffect, useRef, useState } from 'react'
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import InnerImageZoom from 'react-inner-image-zoom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useParams } from 'react-router-dom';
import { fetchDataFromApi } from '../../utils/api';
import { MdOutlineBrandingWatermark } from "react-icons/md";
import { MdOutlineCategory } from "react-icons/md";
import { GrSystem } from "react-icons/gr";
import { MdOutlineReviews } from "react-icons/md";
import { MdPublishedWithChanges } from "react-icons/md";
import Rating from '@mui/material/Rating';
import CircularProgress from '@mui/material/CircularProgress';

const ProductDetails = () => {

  const [product, setProduct] = useState()
  const [slideIndex, SetSlideIndex] = useState(0)
  const zoomSliderBig = useRef();
  const zoomSliderSml = useRef();

  const { id } = useParams()

  const goto = (index) => {
    SetSlideIndex(index)
    zoomSliderBig.current.swiper.slideTo(index)
    zoomSliderSml.current.swiper.slideTo(index)
  }

  useEffect(() => {
    fetchDataFromApi(`/api/product/${id}`).then((res) => {
      setProduct(res?.product)
    })
  }, [])

  return (
    <>
      <div className="col1 flex items-center justify-between my-3">
        <h1 className='font-[700] text-[22px] text-gray-800'>Products Details</h1>
      </div>

      <br />
      <div className="productDetails flex gap-5">
        <div className="col w-[40%]">

          {
            product?.images?.length !== 0 && <div className="flex gap-3 select-none">
              <div className="slider w-[15%] ">
                <Swiper
                  ref={zoomSliderSml}
                  slidesPerView={4}
                  spaceBetween={10}
                  direction={'vertical'}
                  navigation={true}

                  modules={[Navigation]}
                  className="zoomProductSliderThubs h-[500px] overflow-hidden"
                >

                  {
                    product?.images?.map((item, index) => {
                      return (
                        <SwiperSlide key={index}>
                          <div className={`item rounded-md overflow-hidden cursor-pointer group  ${slideIndex === index ? 'opacity-1' : 'opacity-30'}`} onClick={() => { goto(index) }}>
                            <img src={item} alt="" className='group-hover:scale-105 transition-all w-full' />
                          </div>
                        </SwiperSlide>
                      )
                    })
                  }



                </Swiper>
              </div>

              <div className="zoomContainer w-[85%] h-[500px] overflow-hidden">

                <Swiper
                  ref={zoomSliderBig}
                  slidesPerView={1}
                  spaceBetween={0}
                  navigation={false}

                >

                  {
                    product?.images?.map((item, index) => {
                      return (
                        <SwiperSlide key={index}>
                          <InnerImageZoom src={item} zoomScale={1} zoomType='hover' />
                        </SwiperSlide>
                      )
                    })
                  }


                </Swiper>

              </div>
            </div>
          }


        </div>
        <div className="col w-[60%]">
          <h2 className='text-[23px] font-[500] mb-3'>{product?.name}</h2>

          <div className="flex items-center py-2">
            <span className='w-[20%] font-[500] flex items-center gap-1'><MdOutlineBrandingWatermark className='opacity-65' /> Brand : </span>
            <span className=''>{product?.brand}</span>
          </div>
          <div className="flex items-center py-2">
            <span className='w-[20%] font-[500] flex items-center gap-1'><MdOutlineCategory className='opacity-65' /> Category : </span>
            <span className=''>{product?.catName}</span>
          </div>

          {
            product?.productRam?.length !== 0 &&
            <div className="flex items-center py-2">
              <span className='w-[20%] font-[500] flex items-center gap-1'><GrSystem className='opacity-65' /> Ram : </span>

              <div className="flex items-center gap-3">
                {
                  product?.productRam?.map((ram, index) => {
                    return (
                      <span className='p-1 px-2 bg-[#fff] shadow-md rounded-md text-[14px] font-[500]' key={index}>{ram}</span>
                    )
                  })
                }
              </div>
            </div>
          }


          {
            product?.size?.length !== 0 &&
            <div className="flex items-center py-2">
              <span className='w-[20%] font-[500] flex items-center gap-1'><GrSystem className='opacity-65' /> Size : </span>

              <div className="flex items-center gap-3">
                {
                  product?.size?.map((size, index) => {
                    return (
                      <span className='p-1 px-2 bg-[#fff] shadow-md rounded-md text-[14px] font-[500]' key={index}>{size}</span>
                    )
                  })
                }
              </div>
            </div>
          }



          {
            product?.productWeight?.length !== 0 &&
            <div className="flex items-center py-2">
              <span className='w-[20%] font-[500] flex items-center gap-1'><GrSystem className='opacity-65' /> Weight : </span>

              <div className="flex items-center gap-3">
                {
                  product?.productWeight?.map((weight, index) => {
                    return (
                      <span className='p-1 px-2 bg-[#fff] shadow-md rounded-md text-[14px] font-[500]' key={index}>{weight}</span>
                    )
                  })
                }
              </div>
            </div>
          }


          <div className="flex items-center py-2">
            <span className='w-[20%] font-[500] flex items-center gap-1'><MdOutlineReviews className='opacity-65' /> Review : </span>
            <span className=''>({product?.reviews?.length > 0 ? product?.reviews?.length : 0})</span>
          </div>

          <div className="flex items-center py-2">
            <span className='w-[20%] font-[500] flex items-center gap-1'><MdPublishedWithChanges className='opacity-65' /> Published : </span>
            <span className=''>{product?.dateCreated?.split("T")[0]}</span>
          </div>


          <h2 className='text-[22px] font-[600] mt-3'>Product Description</h2>

          <p className='text-[15px] w-[95%] pt-1'>{product?.description}</p>


        </div>
      </div>

      <br />
      <br />

      <h2 className='text-[23px] font-[600]'>Customer Reviews</h2>

      <div className="reviewsWrapper">
        <div className="review w-full flex justify-between shadow-md px-8 my-9 border-b border-[rgba(0,0,0,0.1)]">
          <div className="info w-[80%] flex gap-4 ">

            <div className="img w-[80px] h-[80px] overflow-hidden rounded-full mt-4">
              <img src="https://technoglobalhospital.com/assets/src_sir.jpg" alt="" className='w-full' />
            </div>

            <div className='w-[90%]  py-4'>
              <h2 className='text-[18px] font-[600]'>Shubham Yadav</h2>
              <h4 className='text-[13px] text-gray-400 py-1'>2025-01-10</h4>
              <p className='text-[14px] font-[500]'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores culpa qui, ea velit libero voluptatibus inventore cum neque, omnis corporis, tempora ipsa mollitia modi nesciunt veniam adipisci hic nihil blanditiis quos autem veritatis numquam dolore placeat dicta. Ab corrupti a rerum nobis, eum asperiores laborum.</p>
            </div>

          </div>

          <Rating className='ml-4' name="size-small" defaultValue={3}  readOnly />
        </div>
        <div className="review w-full flex justify-between shadow-md px-8 my-9 border-b border-[rgba(0,0,0,0.1)]">
          <div className="info w-[80%] flex gap-4 ">

            <div className="img w-[80px] h-[80px] overflow-hidden rounded-full mt-4">
              <img src="https://technoglobalhospital.com/assets/src_sir.jpg" alt="" className='w-full' />
            </div>

            <div className='w-[90%]  py-4'>
              <h2 className='text-[18px] font-[600]'>Shubham Yadav</h2>
              <h4 className='text-[13px] text-gray-400 py-1'>2025-01-10</h4>
              <p className='text-[14px] font-[500]'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores culpa qui, ea velit libero voluptatibus inventore cum neque, omnis corporis, tempora ipsa mollitia modi nesciunt veniam adipisci hic nihil blanditiis quos autem veritatis numquam dolore placeat dicta. Ab corrupti a rerum nobis, eum asperiores laborum.</p>
            </div>

          </div>

          <Rating className='ml-4' name="size-small" defaultValue={3}  readOnly />
        </div>
      </div>

      <br />
      <br />
      <br />
    </>
  )
}

export default ProductDetails