import React from 'react'
import { FiGift } from "react-icons/fi";
import { GiBank } from "react-icons/gi";
import { LuChartNoAxesCombined } from "react-icons/lu";
import { GrPieChart } from "react-icons/gr";
import { Swiper, SwiperSlide } from 'swiper/react';
import { GiChart } from "react-icons/gi";
import { GrLineChart } from "react-icons/gr";
import { RiProductHuntLine } from "react-icons/ri";
import { BiNetworkChart } from "react-icons/bi";

import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';
const DashboardBoxs = () => {
  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className="dashboardBoxesSlider"
      >
        <SwiperSlide>
          <div className="box p-6 cursor-pointer rounded-md border border-[rgba(0,0,0,0.3)] flex items-center gap-5  hover:bg-[#456ecf] transition-all bg-[#3872fa] ">
            <FiGift className='text-[35px] text-[#fff]' />
            <div className="info w-[65%] text-[#fff]">
              <h3 className='text-[16px]'>New Orders</h3>
              <b className='text-[20px]'>60</b>
            </div>
            <LuChartNoAxesCombined className='text-[45px] text-[#fff]' />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="box p-6 cursor-pointer rounded-md borderborder-[rgba(0,0,0,0.3)] flex items-center gap-5 hover:bg-[#30a47e] transition-all bg-[#10b981]">
            <GrPieChart className='text-[35px] text-[#fff]' />
            <div className="info w-[65%] text-[#fff]">
              <h3 className='text-[16px]'>Sales</h3>
              <b className='text-[20px]'>3,626/-</b>
            </div>
            <GiChart className='text-[45px] text-[#fff]' />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="box p-6 cursor-pointer rounded-md border border-[rgba(0,0,0,0.3)] flex items-center gap-5 hover:bg-[#6c32a5] transition-all bg-[#7928ca]">
            <GiBank className='text-[35px] text-[#fff]' />
            <div className="info w-[65%] text-[#fff]">
              <h3 className='text-[16px]'>Revenue</h3>
              <b className='text-[20px]'>₹1,026/-</b>
            </div>
            <GrLineChart className='text-[45px] text-[#fff]' />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="box p-6 cursor-pointer rounded-md border border-[rgba(0,0,0,0.3)] flex items-center gap-5 hover:bg-[#e54747] transition-all bg-[#ff5252]">
            <RiProductHuntLine className='text-[37px] text-[#fff]' />
            <div className="info w-[65%] text-[#fff]">
              <h3 className='text-[16px]'>Total Products</h3>
              <b className='text-[20px]'>180</b>
            </div>
            <BiNetworkChart className='text-[45px] text-[#fff]' />
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  )
}

export default DashboardBoxs
