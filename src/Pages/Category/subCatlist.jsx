import React, { useContext, useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import { BiExport } from "react-icons/bi";
import { IoAdd } from "react-icons/io5";
import { MyContext } from '../../App';
import { fetchDataFromApi } from '../../utils/api';
import { FaAngleDown } from "react-icons/fa6";
import EditSubCatBox from './editSubCatBox';

const SubCategory = () => {


  const [isOpen, setIsOpen] = useState(0)
  const context = useContext(MyContext)

  const expend = (index) => {
    if (isOpen === index) {
      setIsOpen(!isOpen)
    } else {
      setIsOpen(index)
    }
  }

  useEffect(() => {
    fetchDataFromApi("/api/category/").then((res) => {
      context?.setCatData(res?.data)
    })
    //realtime date show while editing
  }, [context?.isOpenFullScreenPanel])

  return (
    <>
      <div className="card pl-1 ">
        <div className="col1 flex items-center justify-between my-3">
          <h1 className='font-[700] text-[22px] text-gray-800'>Sub Category List</h1>
          <div className='col pr-1 flex items-center justify-end gap-2'>
            <Button className='btn-sm btn !bg-green-500 hover:!bg-green-600 !text-[#fff] flex items-center gap-2'><BiExport className='text-[#fff] font-bold text-[18px]' />Export</Button>
            <Button className='!bg-blue-500 hover:!bg-blue-600 btn-sm !text-[#fff] flex items-baseline gap-2' onClick={() => {
              context.setIsOpenFullScreenPanel({
                open: true,
                model: "Add New Sub Category"
              })
            }}><IoAdd className='text-[#fff] font-bold text-[18px]' />Add New Sub Category</Button>
          </div>
        </div>

      </div>

      <div className="card my-4 pt-5 pb-5 px-5 shadow-md sm:rounded-lg bg-white">

        {
          context?.catData?.lenght !== 0 &&
          <ul className='w-full'>
            {
              context?.catData?.map((firstLevelCat, index) => {
                return (
                  <li className='w-full mb-1' key={index}>
                    <div className="flex items-center w-full p-2 bg-[#f1f1f1] rounded-sm px-4">
                      <span className='font-[500] flex items-center gap-4 text-[14px]'>
                        {firstLevelCat.name}
                      </span>

                      <Button className='!min-w-[35px] !w-[35px] !h-[35px] !rounded-full !text-black !ml-auto' onClick={() => { expend(index) }}>
                        <FaAngleDown />
                      </Button>

                    </div>


                    {
                      isOpen === index &&
                      <>
                        {
                          firstLevelCat?.children?.lenght !== 0 &&
                          <ul className='w-full'>
                            {
                              firstLevelCat?.children?.map((subCat, index_) => {
                                return (
                                  <li className='w-full py-1' index={index_} ><EditSubCatBox name={subCat?.name} id={subCat?._id} catData={context?.catData} index={index_} selectedCat={subCat?.parentId} selectedCatName={subCat?.parentName} />



                                    {

                                      subCat?.children?.lenght !== 0 &&
                                      <ul className='pl-5'>

                                   

                                      {
                                          subCat?.children?.map((thirdlevel , index__) => {

                                           
                                            return (
                                              <li key={index__} className='w-full hover:bg-[#f1f1f1]'>
                                                <EditSubCatBox
                                                name={thirdlevel?.name}
                                                catData={firstLevelCat?.children}
                                                index={index__}
                                                selectedCat={thirdlevel?.parentId}
                                                selectedCatName={thirdlevel?.parentCatName}
                                                id={thirdlevel?._id}
                                                />
                                              </li>

                                              
                                            )
                                          })
                                        }

                                      </ul>
                                    }



                                  </li>
                                )
                              })
                            }
                          </ul>
                        }
                      </>
                    }

                  </li>
                )
              })
            }
          </ul>
        }



      </div>

    </>
  )
}




export default SubCategory
