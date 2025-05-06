import React, { useContext, useState } from 'react'
import UploadBox from '../../components/UploadBox'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { IoMdClose } from "react-icons/io";
import Button from '@mui/material/Button';
import { IoCloudUploadOutline } from "react-icons/io5";
import { deleteImages, postData } from '../../utils/api';
import { MyContext } from '../../App';
import CircularProgress from '@mui/material/CircularProgress';

const AddCategory = () => {

  const context = useContext(MyContext)

  const [previews, setPreviews] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [formFields, setFormFields] = useState({
    name: "",
    images: [],
    // parentCatName: "",
    // parentId: ""
  })

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

  const setPreviewsFun = (previewsArr) => {
    setPreviews(previewsArr)
    formFields.images = previewsArr
  }

  const removeImg = (image, index) => {
    var imageArr = []
    imageArr = previews
    deleteImages(`/api/category/deleteImage?img=${image}`).then((res) => {

      imageArr.splice(index, 1)

      setPreviews([])
      setTimeout(() => {
        setPreviews(imageArr)

        //it hepls to add all image in the " images: []," of "[formFields] useSate"
        formFields.images = imageArr
      }, 100)

    })
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)

    //validation of name
    if (formFields.name === "") {
      context.openAlertBox("error", "Please enter Category Name!")
      setIsLoading(false)
      return false
    }

    //validation of name
    if (previews?.length === 0) {
      context.openAlertBox("error", "Please Select Category Images!")
      setIsLoading(false)
      return false
    }

    console.log(formFields)

    postData("/api/category/create", formFields).then((res) => {

      console.log(res)
      
      setTimeout(() => {
        //close the category dailog when done!
        setIsLoading(false)
        context.setIsOpenFullScreenPanel({
          open: false
        })
      }, 1500)

    })
  }


  return (
    <section className='p-5 bg-gray-50'>
      <form className='form p-5' onSubmit={handleSubmit}>
        <div className='grid grid-cols-1 mb-3'>
          {/* Product Name Input  */}
          <div className="col w-[25%]">
            <h3 className='text-[14px] font-[600] mb-2'>Category Name</h3>
            <input type="text" className='w-full h-[40px] p-2 border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-md text-sm ' onChange={onChangeInput} value={formFields.name} name='name' />
          </div>
        </div>
        <div className="col w-full p-5 px-0 rounded-md">
          <h3 className='font-[700] text-[20px] mb-2'>Category Images</h3>
          <div className="grid grid-cols-8 gap-4">

            {/* Porduct img models  */}


            {
              previews?.length !== 0 && previews?.map((image, index) => {
                return (
                  <div className="uploadBoxWrapper relative" key={index}>
                    <span className='h-[20px] w-[20px] rounded-full overflow-hidden bg-red-600 hover:bg-red-500 transition-all absolute -top-[8px] -right-[8px] flex items-center justify-center z-50 cursor-pointer' onClick={() => removeImg(image, index)}><IoMdClose className=' text-[12px] text-[#fff]' /></span>


                    <div className=' uploadBox h-[150px] w-[100%] rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.5)] bg-gray-100 cursor-pointer hover:bg-gray-200 transition-all flex items-center justify-center flex-col relative z-10'>
                      <LazyLoadImage
                        alt={"image"}
                        effect='blur'
                        src={image} // use normal <img> attributes as props
                        wrapperProps={{
                          // If you need to, you can tweak the effect transition using the wrapper style.
                          style: { transitionDelay: "0.5s" },
                        }}
                        className='!w-full !h-full !object-cover hover:scale-105 transition-all duration-700'
                      />
                    </div>
                  </div>
                )
              })
            }




            <UploadBox multiple={true} name="images" url="/api/category/uploadCategoryImage" setPreviewsFun={setPreviewsFun} />

          </div>
        </div>
        <br />
        <div className='w-[270px]'>
          <Button type='submit' className='btn-blue w-full btn flex items-center gap-2'>
            {
              isLoading === true ? <CircularProgress color="inherit" /> : <> <IoCloudUploadOutline className='text-[18px]' />Publish and View</>
            }

          </Button>
        </div>
      </form>
    </section>
  )
}

export default AddCategory
