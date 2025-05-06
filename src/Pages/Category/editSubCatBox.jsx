import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../../App'
import { deleteData, editData, fetchDataFromApi } from '../../utils/api'
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteForever } from "react-icons/md";
import Select from '@mui/material/Select';
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';

const EditSubCatBox = (props) => {
  const context = useContext(MyContext)

  const [isLoading, setIsLoading] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [selectValue, setSelectValue] = useState('')

  const [formFields, setFormFields] = useState({
    name: "",
    parentCatName: null,
    parentId: null
  })


  useEffect(() => {
    formFields.name = props?.name
    formFields.parentCatName = props?.selectedCatName
    formFields.parentId = props?.selectedCat
    setSelectValue(props?.selectedCat)
  }, [])


  const handleChange = (e) => {
    setSelectValue(e.target.value)
    formFields.parentId = e.target.value
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    if (formFields.name === "") {
      context.openAlertBox("error", "Please enter Category Name!")
      return false
    }

    editData(`/api/category/${props?.id}`, formFields).then((res) => {
    
      setTimeout(() => {
        context.openAlertBox("success", res?.data?.message)
        context.getData
        setIsLoading(false)
      }, 1000)
    })

  }


  const deleteCat = (id) =>{
    deleteData(`/api/category/${id}`).then((res)=>{
      fetchDataFromApi("/api/category/").then((res) => {
        // setIsLoading(false)
      })
    })
  }

  //ths is used in backend.
  const onChangeInput = (e) => {
    const { name, value } = e.target;

    const catId = selectValue
    setSelectValue(catId)

    setFormFields(() => {
      return {
        ...formFields,
        [name]: value
      }
    })
  }

  useEffect(() => {
    fetchDataFromApi("/api/category/").then((res) => {
      context?.setCatData(res?.data)
    })
    //realtime date show while editing
  }, [context?.isOpenFullScreenPanel])

  return (
    <form className='flex items-center gap-3 p-0 px-4' onSubmit={handleSubmit}>

      {
        editMode === true && <>
          <div className="flex items-center justify-between py-2 gap-2">
            <div className="w-[200px]">
              <Select
                className='w-full'
                size='small'
                value={selectValue}
                onChange={handleChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
              >
                {

                  props?.catData?.lenght !== 0 && props?.catData?.map((item, index) => {
                    return (
                      <MenuItem value={item._id} key={index}>{item.name}</MenuItem>
                    )
                  })


                }

              </Select>
            </div>

            <input type="text" className='w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm' name='name' value={formFields?.name} onChange={onChangeInput} />

            <div className="flex items-center gap-3 ml-10" >
              <Button type='submit' className='' variant='contained'> {
                isLoading === true ? <CircularProgress color="inherit" /> : <>Edit</>
              }
              </Button>
              <Button variant='outlined' onClick={() => { setEditMode(false) }}>Cancel</Button>
            </div>

          </div>
        </>
      }


      {
        editMode === false &&
        <>
          <span className='font-[500] text-[14px]'>{props.name}</span>
          <div className="flex items-center ml-auto gap-2">
            <Button className="!min-w-[35px] !w-[35px] !h-[35px] !rounded-full !text-black" onClick={() => {
              setEditMode(true)
            }}>
              <CiEdit className='text-[18px]' />
            </Button>

            <Button className="!min-w-[35px] !w-[35px] !h-[35px] !rounded-full !text-black" onClick={()=>{deleteCat(props?.id)}}>
              <MdOutlineDeleteForever className='text-[18px]' />
            </Button>
          </div>
        </>
      }

    </form>
  )
}




export default EditSubCatBox

