import React, { useContext, useState } from 'react'
import { FaRegImages } from "react-icons/fa";
import { uploadImages } from '../../utils/api';
import CircularProgress from '@mui/material/CircularProgress';
import { MyContext } from '../../App';

const UploadBox = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  //used in backend 
  const [previews, setPreviews] = useState([])
  const [uploading, setUploading] = useState(false)

  const context = useContext(MyContext)



  let selectedImages = []

  // const formdata = new FormData()

  // const onchangeFile = (e, apiEndPoint) => {
  //   try {
  //     //img save in this state varialbe from cloudnary
  //     setPreviews([])

  //     const files = e.target.files;
  //     setUploading(true)
  //     // console.log(files)
  //     for (var i = 0; i < files.length; i++) {
  //       if (files[i] && (files[i].type === "image/jpeg" ||
  //         files[i].type === "image/jpg" ||
  //         files[i].type === "image/png" ||
  //         files[i].type === "image/webp")) {

  //         const file = files[i]
  //         selectedImages.push(file)
  //         formdata.append(props?.name, file)

  //       } else {

  //         context.openAlertBox("error", "Please select a valid JPG, JPEG, WEBP or PNG image file.")
  //         setUploading(false)
  //         return false;
  //       }
  //     }

  //     // uploadImages(apiEndPoint, formdata).then((res) => {
  //     //   setUploading(false)
  //     //   props.setPreviewsFun(res?.data?.images)

  //     // })

  //     uploadImages(apiEndPoint, formdata)
  //       .then((res) => {
  //         setUploading(false);
  //         props.setPreviewsFun(res?.data?.images);
  //       })
  //       .catch((err) => {
  //         console.error("Upload failed:", err);
  //         context.openAlertBox("error", "Image upload failed.");
  //         setUploading(false);
  //       });



  //   } catch (error) {
  //     console.log(error)
  //   }
  // }


  const onchangeFile = async (e, apiEndPoint) => {
    try {
      setPreviews([]);
      setUploading(true);
  
      const files = e.target.files;
      const formdata = new FormData(); // 🔄 Moved inside function
      const selectedImages = [];
  
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
        if (validTypes.includes(file.type)) {
          selectedImages.push(file);
          formdata.append("images", file); // ✅ Make sure field name is 'images'
        } else {
          context.openAlertBox("error", "Please select a valid JPG, JPEG, WEBP or PNG image file.");
          setUploading(false);
          return;
        }
      }
  
      const res = await uploadImages(apiEndPoint, formdata);
      setUploading(false);
      props.setPreviewsFun(res?.data?.images);
    } catch (err) {
      console.error("Upload failed:", err);
      context.openAlertBox("error", "Image upload failed.");
      setUploading(false);
    }
  };
  


  return (
    <div className='uploadBox p-3 h-[150px] w-[100%] rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.5)] bg-gray-100 cursor-pointer hover:bg-gray-200 transition-all flex items-center justify-center flex-col relative z-50'>



      {
        uploading === true ? <CircularProgress /> :
          <>
            <FaRegImages className='text-[50px] opacity-35 pointer-events-none' />
            <h4 className='text-[14px] pointer-events-none font-[600] text-gray-500'>Image Upload</h4>
            <input name="images" multiple={props.multiple !== undefined ? props.multiple : false} type="file" className='absolute top-0 left-0 w-full h-full opacity-0 z-50 cursor-pointer' accept='image/*' onChange={(e) => {
              //route of "user.route.js" in server folder.
              onchangeFile(e, props?.url)
            }} />
          </>
      }



    </div>
  )
}

export default UploadBox
