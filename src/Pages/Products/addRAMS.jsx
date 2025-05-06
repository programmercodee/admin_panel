import Button from '@mui/material/Button'
import React, { useContext, useEffect, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import { IoCloudUploadOutline } from "react-icons/io5";
import TooltipMui from '@mui/material/Tooltip';
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteForever } from "react-icons/md";
import { MyContext } from '../../App';
import { deleteData, editData, fetchDataFromApi, postData } from '../../utils/api';

const AddRAMS = () => {
  const [editId, setEditId] = useState("")
  const context = useContext(MyContext)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([])

  const [name, setName] = useState()

  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    fetchDataFromApi('/api/product/getproductRAMS/get').then((res) => {
     
        setData(res?.data)
      
    })
  }

  const editItem = (id) => {
    fetchDataFromApi(`/api/product/getproductRAMS/${id}`).then((res) => {
      context.openAlertBox("success", " Edit Mode Is On!!!")
      setName(res?.data?.name)
      setEditId(res?.data?._id)
      getData()
    })
  }


  const deleteDataItem = (id) => {
    deleteData(`/api/product/productRAMS/${id}`).then((res) => {
      getData()
      context.openAlertBox("success", "Item deleted Successfully")
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    setIsLoading(true)
    if (!name) {
      context.openAlertBox("error", "please enter product RAM!")
      setIsLoading(false)
      return false
    }

    if (!editId) {

      postData(`/api/product/productRAMS/create`, {
        name: name
      }).then((res) => {
        setIsLoading(false)
        setIsLoading(false)
        context.openAlertBox("success", res?.message)
        setName("")
        getData()
        

      })

    }


    if (editId !== "") {

      editData(`/api/product/productRAMS/${editId}`, {
        name: name
      }).then((res) => {
        setIsLoading(false)
      
          setIsLoading(false)
          context.openAlertBox("success", res?.message)
          setName("")
          getData()
        

      })


    }


  }

  return (
    <>
      <div className="col1 flex items-center justify-between my-3">
        <h1 className='font-[700] text-[22px] text-gray-800'>Add Products RAM's</h1>

      </div>

      <div className="card my-4 pt-5 shadow-md rounded-md  bg-white w-[85%]">

        <form className='form p-5 ' onSubmit={handleSubmit}>
          {/* Product RAM Input  */}
          <div className="col mb-6">
            <h3 className='text-[14px] font-[600] mb-2'>Product RAM's</h3>
            <input type="text" className='w-full h-[40px] p-2 border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-md text-sm ' name='name' value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <Button type='submit' className='btn-blue w-full btn flex items-center gap-2'>{
            isLoading === true ? <CircularProgress color="inherit" /> : <> <IoCloudUploadOutline className='text-[18px]' />Publish and View</>
          }</Button>

        </form>

      </div>

      {
        data?.length !== 0 &&
        <div className="card my-4 py-5 shadow-md rounded-md  bg-white w-[85%]">
          <div className="relative overflow-x-auto mt-5">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                <tr>

                  <th scope="col" className="px-8 py-3 whitespace-nowrap" width="70%">
                    Product RAM
                  </th>
                  <th scope="col" className="px-5 py-3 whitespace-nowrap" width="40%">
                    Product Action
                  </th>


                </tr>
              </thead>

              <tbody>

                {
                  data?.map((item, index) => {
                    return (
                      <tr className="bg-white border-b border-gray-200" key={index}>

                        <td
                          scope="row"
                          className="px-14 py-4 font-medium whitespace-nowrap "
                        >
                          <span className='font-[600]'> {item?.name}</span>
                        </td>

                        <td
                          scope="row"
                          className="px-6 py-4 font-medium whitespace-nowrap gap-1 "
                        >
                          <div className="flex items-center gap-8">
                            <TooltipMui title="Edit" placement="top">
                              <Button className='!w-[35px] !h-[35px] !min-w-[35px] !bg-[#f1f1f1] hover:!bg-[#ccc] !border !border-[rgba(0,0,0,0.2)] !text-[rgba(0,0,0,0.7)]' onClick={() => { editItem(item?._id) }}><CiEdit className='text-[25px]' /></Button>
                            </TooltipMui>
                            <TooltipMui title="Remove" placement="top">
                              <Button className='!w-[35px] !h-[35px] !min-w-[35px] !bg-[#f1f1f1] hover:!bg-[#ccc] !border !border-[rgba(0,0,0,0.2)] !text-[rgba(0,0,0,0.7)]' onClick={() => { deleteDataItem(item?._id) }}><MdOutlineDeleteForever className='text-[25px]' /></Button>
                            </TooltipMui>
                          </div>
                        </td>

                      </tr>
                    )
                  })
                }





              </tbody>
            </table>


          </div>
        </div>
      }




    </>
  )
}

export default AddRAMS
