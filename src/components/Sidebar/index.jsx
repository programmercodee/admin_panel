import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/icons/logo.jpg'
import { LuLayoutDashboard } from "react-icons/lu";
import Button from '@mui/material/Button';
import { FaRegImages } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { TbBrandProducthunt } from "react-icons/tb";
import { TbCategory } from "react-icons/tb";
import { TbTruckDelivery } from "react-icons/tb";
import { AiOutlineLogout } from "react-icons/ai";
import { TfiAngleDown } from "react-icons/tfi";
import { TfiAngleUp } from "react-icons/tfi";
import { Collapse } from 'react-collapse';
import { GoDot } from "react-icons/go";
import { MyContext } from '../../App';

const Sidebar = () => {
  const [isOpenSubMenuIndex, setIsOpenSubMenuIndex] = useState(null)
  const isOpenSubMenu = (index) => {
    if (isOpenSubMenuIndex === index) {
      setIsOpenSubMenuIndex(null)
    } else {
      setIsOpenSubMenuIndex(index)
    }
  }

  const context = useContext(MyContext)

  return (
    <>
      <div className=' sidebar md:w-[18%]  h-full bg-[#fff] fixed top-0 left-0 shadow-md border-r border-[rgba(0,0,0,0.1)] z-[999]'>
        <div className='py-4 px-3 flex items-center'>
          <Link to='/'>
            <img src={logo} alt="" width={120} className='' />
          </Link>
        </div>

        <div className=''>
          <ul className='list-none mt-4'>
            <li >
              <Link to='/'>
                <Button className='w-full !px-5 !py-2 !capitalize text-[18px] !text-[rgba(0,0,0,0.8)] flex gap-2 items-center !justify-start !font-[500] hover:!bg-[#f1f1f1]'> <LuLayoutDashboard className='text-[18px]' /><span className='text-[17px]'>Dashboard</span></Button></Link>
            </li>

            <li ><Button className='w-full !px-5 !py-2 !capitalize text-[18px] !text-[rgba(0,0,0,0.8)] flex gap-2 items-center !justify-start !font-[500] hover:!bg-[#f1f1f1]' onClick={() => { isOpenSubMenu(1) }}> <FaRegImages className='text-[18px]' /><span className='text-[17px]'>Home Sildes</span>
              <span className='flex items-center justify-center w-[35px] h-[35px] ml-auto' >

                {
                  isOpenSubMenuIndex === 1 ? <TfiAngleUp /> : <TfiAngleDown />
                }


              </span></Button>
              <Collapse isOpened={isOpenSubMenuIndex === 1 ? true : false}>
                {/* submenu */}
                <ul className='w-full pl-8'>
                  <li className='w-full pr-4 mb-1'>
                    <Link to="/homeSlider/list">
                      <Button className='w-full !px-5 !py-2 !capitalize text-[18px] !text-[rgba(0,0,0,0.7)] flex gap-1 items-center !justify-start !font-[500] hover:!bg-[#f1f1f1]'><GoDot />Home Banner Slide List</Button>
                    </Link>
                  </li>

                  <li className='w-full pr-4 '><Button className='w-full  !px-5 !py-2 !capitalize text-[18px] !text-[rgba(0,0,0,0.7)] flex gap-1 items-center !justify-start !font-[500] hover:!bg-[#f1f1f1]'><GoDot />Add Home Banner Slide</Button></li>
                </ul>
              </Collapse>
            </li>

            <li ><Link to='/users'><Button className='w-full !px-5 !py-2 !capitalize text-[18px] !text-[rgba(0,0,0,0.8)] flex gap-2 items-center !justify-start !font-[500] hover:!bg-[#f1f1f1]'> <FaRegUser className='text-[18px]' /><span className='text-[17px]'>Users</span></Button></Link></li>

            <li ><Button className='w-full !px-5 !py-2 !capitalize text-[18px] !text-[rgba(0,0,0,0.8)] flex gap-2 items-center !justify-start !font-[500] hover:!bg-[#f1f1f1]' onClick={() => { isOpenSubMenu(2) }}> <TbBrandProducthunt className='text-[23px]' /><span className='text-[17px]'>Products</span>
              <span className='flex items-center justify-center w-[35px] h-[35px] ml-auto'>
                {
                  isOpenSubMenuIndex === 2 ? <TfiAngleUp /> : <TfiAngleDown />
                }
              </span></Button>
              <Collapse isOpened={isOpenSubMenuIndex === 2 ? true : false}>
                {/* submenu */}
                <ul className='w-full pl-8'>
                  <li className='w-full pr-4 mb-1'>
                    <Link to='/products'>
                      <Button className='w-full !px-5 !py-2 !capitalize text-[18px] !text-[rgba(0,0,0,0.7)] flex gap-1 items-center !justify-start !font-[500] hover:!bg-[#f1f1f1]'>
                        <GoDot />Product List</Button>
                    </Link>
                  </li>

                  <li className='w-full pr-4 '>

                    <Button className='w-full  !px-5 !py-2 !capitalize text-[18px] !text-[rgba(0,0,0,0.7)] flex gap-1 items-center !justify-start !font-[500] hover:!bg-[#f1f1f1]' onClick={() => {
                      context.setIsOpenFullScreenPanel({
                        open: true,
                        model: "Add Product"
                      })
                    }}><GoDot />Product Upload</Button>

                  </li>

                  <li className='w-full pr-4 '>
                    <Link to="/product/addRams">
                      <Button className='w-full  !px-5 !py-2 !capitalize text-[18px] !text-[rgba(0,0,0,0.7)] flex gap-1 items-center !justify-start !font-[500] hover:!bg-[#f1f1f1]'><GoDot />Add Product RAM</Button>
                    </Link>
                  </li>


                  <li className='w-full pr-4 '>
                    <Link to="/product/addWeight">
                      <Button className='w-full  !px-5 !py-2 !capitalize text-[18px] !text-[rgba(0,0,0,0.7)] flex gap-1 items-center !justify-start !font-[500] hover:!bg-[#f1f1f1]'><GoDot />Add Product Weight</Button>
                    </Link>
                  </li>


                  <li className='w-full pr-4 '>
                    <Link to="/product/addSize">
                      <Button className='w-full  !px-5 !py-2 !capitalize text-[18px] !text-[rgba(0,0,0,0.7)] flex gap-1 items-center !justify-start !font-[500] hover:!bg-[#f1f1f1]'><GoDot />Add Product Size</Button>
                    </Link>
                  </li>

                </ul>
              </Collapse>
            </li>

            

            <li ><Button className='w-full !px-5 !py-2 !capitalize text-[18px] !text-[rgba(0,0,0,0.8)] flex gap-2 items-center !justify-start !font-[500] hover:!bg-[#f1f1f1]' onClick={() => { isOpenSubMenu(3) }}> <TbCategory className='text-[20px]' /><span className='text-[17px]'>Category</span>
              <span className='flex items-center justify-center w-[35px] h-[35px] ml-auto'>
                {
                  isOpenSubMenuIndex === 3 ? <TfiAngleUp /> : <TfiAngleDown />
                }
              </span></Button>
              <Collapse isOpened={isOpenSubMenuIndex === 3 ? true : false}>
                {/* submenu */}
                <ul className='w-full pl-8'>
                  <li className='w-full pr-4 mb-1'>
                    <Link to='/category/list'>
                      <Button className='w-full !px-5 !py-2 !capitalize text-[18px] !text-[rgba(0,0,0,0.7)] flex gap-1 items-center !justify-start !font-[500] hover:!bg-[#f1f1f1]'><GoDot />Category List</Button>
                    </Link>
                  </li>

                  <li className='w-full pr-4 '>

                    <Button className='w-full  !px-5 !py-2 !capitalize text-[18px] !text-[rgba(0,0,0,0.7)] flex gap-1 items-center !justify-start !font-[500] hover:!bg-[#f1f1f1]' onClick={() => {
                      context.setIsOpenFullScreenPanel({
                        open: true,
                        model: "Add New Category"
                      })
                    }}><GoDot />Add Category</Button>

                  </li>
                  <li className='w-full pr-4 '>
                    <Link to='/subCategory/list'>
                      <Button className='w-full  !px-5 !py-2 !capitalize text-[18px] !text-[rgba(0,0,0,0.7)] flex gap-1 items-center !justify-start !font-[500] hover:!bg-[#f1f1f1]'><GoDot />Sub Category List</Button>
                    </Link>
                  </li>
                  <li className='w-full pr-4 '>

                    <Button className='w-full  !px-5 !py-2 !capitalize text-[18px] !text-[rgba(0,0,0,0.7)] flex gap-1 items-center !justify-start !font-[500] hover:!bg-[#f1f1f1]' onClick={() => {
                      context.setIsOpenFullScreenPanel({
                        open: true,
                        model: "Add New Sub Category"
                      })
                    }}><GoDot />Add Sub Category</Button>

                  </li>
                </ul>
              </Collapse>

            </li>

            <li ><Link to='/orders'><Button className='w-full !px-5 !py-2 !capitalize text-[18px] !text-[rgba(0,0,0,0.8)] flex gap-2 items-center !justify-start !font-[500] hover:!bg-[#f1f1f1]'> <TbTruckDelivery className='text-[20px]' /><span className='text-[17px]'>Orders</span></Button></Link></li>

            <li ><Button className='w-full !px-5 !py-2 !capitalize text-[18px] !text-[rgba(0,0,0,0.8)] flex gap-2 items-center !justify-start !font-[500] hover:!bg-[#f1f1f1]'> <AiOutlineLogout className='text-[20px]' /><span className='text-[17px]'>Logout</span></Button></li>

          </ul>
        </div>
      </div>
    </>
  )
}

export default Sidebar
