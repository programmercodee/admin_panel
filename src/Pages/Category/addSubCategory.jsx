import React, { useContext, useState } from 'react'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { IoCloudUploadOutline } from "react-icons/io5";
import { MyContext } from '../../App';
import { postData } from '../../utils/api';
import CircularProgress from '@mui/material/CircularProgress';

const AddSubCategory = () => {
  {/* Product Category state  */ }
  const [productCat, setproductCat] = useState('');
  const [productCat2, setproductCat2] = useState('');

  const [isLoading, setIsLoading] = useState(false)
  const [isLoading2, setIsLoading2] = useState(false)


  const [formFields, setFormFields] = useState({
    name: "",
    parentCatName: null,
    parentId: null
  })


  const [formFields2, setFormFields2] = useState({
    name: "",
    parentCatName: null,
    parentId: null
  })


  const context = useContext(MyContext)

  const handleChangeProductCat = (event) => {
    setproductCat(event.target.value);
    formFields.parentId = event.target.value
  };

  const handleChangeProductCat2 = (event) => {
    setproductCat2(event.target.value);
    formFields2.parentId = event.target.value
  };


  const selectCatFun = (catName) => {
    formFields.parentCatName = catName
  }


  const selectCatFun2 = (catName) => {
    formFields2.parentCatName = catName
  }


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
  const onChangeInput2 = (e) => {
    const { name, value } = e.target;
    setFormFields2(() => {
      return {
        ...formFields2,
        [name]: value
      }
    })
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)

    //validation of name
    if (formFields.name === "") {
      context.openAlertBox("error", "Please enter Sub Category Name!")
      setIsLoading(false)
      return false
    }

    //validation of name
    if (productCat === "") {
      context.openAlertBox("error", "Please Select Parent Category!")
      setIsLoading(false)
      return false
    }


    postData("/api/category/create", formFields).then((res) => {


      setTimeout(() => {
        //close the category dailog when done!
        setIsLoading(false)
        context.setIsOpenFullScreenPanel({
          open: false
        })
      }, 1500)

    })
  }


  const handleSubmit2 = (e) => {
    e.preventDefault()
    setIsLoading2(true)

    //validation of name
    if (formFields2.name === "") {
      context.openAlertBox("error", "Please enter Sub Category Name!")
      setIsLoading2(false)
      return false
    }

    //validation of name
    if (productCat2 === "") {
      context.openAlertBox("error", "Please Select Parent Category!")
      setIsLoading2(false)
      return false
    }


    postData("/api/category/create", formFields2).then((res) => {


      setTimeout(() => {
        //close the category dailog when done!
        setIsLoading2(false)
        context.setIsOpenFullScreenPanel({
          open: false
        })
      }, 1500)

    })
  }


  return (
    <section className='p-5 bg-gray-50 grid grid-cols-2 gap-10'>

      <form className='form p-5' onSubmit={handleSubmit}>
        <h4 className='pb-3 text-[20px] font-[500]'>Add Sub Category</h4>
        <div className='grid grid-cols-2 mb-3 gap-5'>
          {/*Sub Cat Product Name Input  */}
          <div className="col">
            <h3 className='text-[14px] font-[600] mb-2'>Product Category</h3>
            <Select
              labelId="demo-simple-select-label"
              id="productCatDrop"
              value={productCat}
              label="ProductCat"
              className='w-full bg-[#fff]'
              size='small'
              onChange={handleChangeProductCat}
            >


              {
                context?.catData?.lenght !== 0 && context?.catData?.map((item, index) => {


                  return (
                    <MenuItem key={index} value={item?._id} onClick={() => { selectCatFun(item?.name) }} >{item?.name}</MenuItem>

                  )
                })
              }

            </Select>
          </div>
          <div className="col">
            <h3 className='text-[14px] font-[600] mb-2'>Sub Category Name</h3>
            <input type="type" className='w-full h-[40px] p-2 border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-md text-sm ' name='name' onChange={onChangeInput} value={formFields.name} />
          </div>
        </div>

        <br />
        <div className='w-[270px]'>
          <Button type='submit' className='btn-blue w-full btn flex items-center gap-2'> {
            isLoading === true ? <CircularProgress color="inherit" /> : <> <IoCloudUploadOutline className='text-[18px]' />Publish and View</>
          }
          </Button>
        </div>
      </form>


      <form className='form p-5' onSubmit={handleSubmit2}>
        <h4 className='pb-3 text-[20px] font-[500]'>Sub Third Level Category</h4>
        <div className='grid grid-cols-2 mb-3 gap-5'>
          {/*Sub Cat Product Name Input  */}
          <div className="col">
            <h3 className='text-[14px] font-[600] mb-2'>Product Category</h3>
            <Select
              labelId="demo-simple-select-label"
              id="productCatDrop"
              value={productCat2}
              label="ProductCat"
              className='w-full bg-[#fff]'
              size='small'
              onChange={handleChangeProductCat2}
            >


              {
                context?.catData?.lenght !== 0 && context?.catData?.map((item, index) => {
                  return (
                    item?.children?.lenght !== 0 && item?.children?.map((item2, index) => {
                      return (
                        <MenuItem key={index} value={item2?._id} onClick={() => { selectCatFun2(item2?.name) }} >{item2?.name}</MenuItem>

                      )
                    })
                  )

                })
              }

            </Select>
          </div>
          <div className="col">
            <h3 className='text-[14px] font-[600] mb-2'>Sub Category Name</h3>
            <input type="type" className='w-full h-[40px] p-2 border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-md text-sm ' name='name' onChange={onChangeInput2} value={formFields2.name} />
          </div>
        </div>

        <br />
        <div className='w-[270px]'>
          <Button type='submit' className='btn-blue w-full btn flex items-center gap-2'> {
            isLoading2 === true ? <CircularProgress color="inherit" /> : <> <IoCloudUploadOutline className='text-[18px]' />Publish and View</>
          }
          </Button>
        </div>
      </form>
    </section>
  )
}

export default AddSubCategory
