import React, { useContext, useEffect, useState } from 'react'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Rating from '@mui/material/Rating';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { IoMdClose } from "react-icons/io";
import Button from '@mui/material/Button';
import { IoCloudUploadOutline } from "react-icons/io5";
import UploadBox from '../../components/UploadBox';
import { MyContext } from '../../App';
import { deleteImages, fetchDataFromApi, postData } from '../../utils/api';
import CircularProgress from '@mui/material/CircularProgress';

const AddProduct = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [previews, setPreviews] = useState([])

  const context = useContext(MyContext)

  const [formFields, setFormFields] = useState({
    name: "",
    description: "",
    images: [],
    brand: "",
    price: "",
    oldPrice: "",
    catName: "",
    catId: "",
    subCat: "",
    subCatId: "",
    thirdsubCat: "",
    thirdsubCatId: "",
    category: "",
    countInStock: "",
    rating: "",
    isFeatured: false,
    discount: "",
    productRam: [],
    size: [],
    productWeight: [],
    // dateCreated: "",
  })


  //FrountEnd Components

  {/* Product Category state  */ }
  const [productCat, setproductCat] = useState('');

  const handleChangeProductCat = (event) => {
    setproductCat(event.target.value);
    formFields.catId = event.target.value
    formFields.category = event.target.value
  };

  const selectCatByName = (name) => {
    formFields.catName = name
  }


  {/* Product sub Category state  */ }
  const [productSubCat, setproductSubCat] = useState('');

  const handleChangeProductSubCat = (event) => {
    setproductSubCat(event.target.value);
    formFields.subCatId = event.target.value
  };

  const selectSubCatByName = (name) => {
    formFields.subCat = name
  }


  {/* Product third Category state  */ }
  const [productThirdCat, setproductThirdCat] = useState('');

  const handleChangeProductThirdCat = (event) => {
    setproductThirdCat(event.target.value);
    formFields.thirdsubCatId = event.target.value
  };

  const selectThirdCatByName = (name) => {
    formFields.thirdsubCat = name
  }


  {/* Product Featured state  */ }
  const [productFeatured, setproductFeatured] = useState('');

  const handleChangeProductFeatured = (event) => {
    setproductFeatured(event.target.value);
    formFields.isFeatured = event.target.value
  };

  {/* Product Rame state  */ }
  const [productRams, setproductRams] = useState([]);
  const [productRamsData, setproductRamsData] = useState([]);

  const handleChangeProductRams = (event) => {
    // setproductRams(event.target.value);

    const {
      target: { value },
    } = event;

    setproductRams(
      typeof value === "string" ? value.split(",") : value
    )

    formFields.productRam = value
  };

  {/* Product weight state  */ }
  const [productWeight, setproductWeight] = useState([]);
  const [productWeightData, setproductWeightData] = useState([]);

  const handleChangeProductWeight = (event) => {
    // setproductWeight(event.target.value);

    const {
      target: { value },
    } = event;

    setproductWeight(
      typeof value === "string" ? value.split(",") : value
    )

    formFields.productWeight = value

  };

  {/* Product Size state  */ }
  const [productSize, setproductSize] = useState([]);
  const [productSizeData, setproductSizeData] = useState([]);

  const handleChangeProductSize = (event) => {
    // setproductSize(event.target.value);

    const {
      target: { value },
    } = event;

    setproductSize(
      typeof value === "string" ? value.split(",") : value
    )

    formFields.size = value

  };




  useEffect(() => {
    //for RAM
    fetchDataFromApi('/api/product/getproductRAMS/get').then((res) => {
      setproductRamsData(res?.data)
    })

    //for WEIGHt
    fetchDataFromApi('/api/product/getproductWeight/get').then((res) => {
      setproductWeightData(res?.data)
    })

    //for SIZE
    fetchDataFromApi('/api/product/getproductSize/get').then((res) => {
      setproductSizeData(res?.data)
    })

  }, [])



  //backend part
  //ths is used in backend.
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


  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(() => {
      return {
        ...formFields,
        [name]: value
      }
    })
  }

  const onChangeRating = (e) => {
    setFormFields(() => (
      {
        ...formFields,
        rating: e.target.value
      }
    ))
  }

  const handleSubmit = (e) => {
    e.preventDefault()


    if (formFields.name === "") {
      context.openAlertBox("error", "please enter product name!")
      return false
    }

    if (formFields.description === "") {
      context.openAlertBox("error", "please enter product description!")
      return false
    }

    if (formFields.brand === "") {
      context.openAlertBox("error", "please enter product brand!")
      return false
    }
    if (formFields.price === "") {
      context.openAlertBox("error", "please enter product price!")
      return false
    }
    if (formFields.oldPrice === "") {
      context.openAlertBox("error", "please enter product old Price!")
      return false
    }
    if (formFields.catId === "") {
      context.openAlertBox("error", "please select product category!")
      return false
    }

    if (formFields.countInStock === "") {
      context.openAlertBox("error", "please enter product stock!")
      return false
    }

    if (formFields.rating === "") {
      context.openAlertBox("error", "please enter product rating!")
      return false
    }
    if (formFields.discount === "") {
      context.openAlertBox("error", "please enter product discount!")
      return false
    }

    if (previews?.length === 0) {
      context.openAlertBox("error", "please select product image!")
      return false
    }

    setIsLoading(true)
    postData("/api/product/create", formFields).then((res) => {

      if (res?.error === false) {
        context.openAlertBox("success", res?.message)
        setTimeout(() => {
          //close the category dailog when done!
          setIsLoading(false)
          context.setIsOpenFullScreenPanel({
            open: false
          })
        }, 1500)
      } else {
        setIsLoading(false)
        context.openAlertBox("error", res?.message)
      }



    })

  }


  return (
    <section className='p-5 bg-gray-50'>

      <form className='form p-5' onSubmit={handleSubmit}>
        <div className='grid grid-cols-1 mb-3'>
          {/* Product Name Input  */}
          <div className="col">
            <h3 className='text-[14px] font-[600] mb-2'>Product Name *</h3>
            <input type="text" className='w-full h-[40px] p-2 border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-md text-sm ' name='name' value={formFields.name} onChange={onChangeInput} />
          </div>
        </div>

        <div className='grid grid-cols-1 mb-3'>
          {/* Product Description Input  */}
          <div className="col">
            <h3 className='text-[14px] font-[600] mb-2'>Product Description *</h3>
            <textarea type="text" className='w-full h-[100px] p-2 border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-md text-sm' name='description' value={formFields.description} onChange={onChangeInput} />
          </div>
        </div>

        <div className='grid grid-cols-4 gap-4 mb-4'>
          {/* Product Category Input  */}
          <div className="col">
            <h3 className='text-[14px] font-[600] mb-2'>Product Category *</h3>

            {

              context?.catData?.length !== 0 &&
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
                  context?.catData?.map((cat, index) => {
                    return (
                      <MenuItem value={cat?._id} onClick={() => { selectCatByName(cat?.name) }}>{cat?.name}</MenuItem>
                    )
                  })
                }
              </Select>
            }

          </div>

          {/* Product Sub Category Input  */}
          <div className="col">
            <h3 className='text-[14px] font-[600] mb-2'>Product Sub Category</h3>


            {

              context?.catData?.length !== 0 &&
              <Select
                labelId="demo-simple-select-label"
                id="productCatDrop"
                value={productSubCat}
                label="Sub ProductCat"
                className='w-full bg-[#fff]'
                size='small'
                onChange={handleChangeProductSubCat}
              >
                {
                  context?.catData?.map((cat, index) => {
                    return (
                      cat?.children?.length !== 0 && cat?.children?.map((subCat, index_) => {
                        return (
                          <MenuItem value={subCat?._id} onClick={() => { selectSubCatByName(subCat?.name) }}>{subCat?.name}</MenuItem>

                        )
                      })
                    )
                  })
                }
              </Select>
            }

          </div>

          {/* Product Third Level Category Input  */}
          <div className="col">
            <h3 className='text-[14px] font-[600] mb-2'>Product Third Level Category</h3>
            {

              context?.catData?.length !== 0 &&
              <Select
                labelId="demo-simple-select-label"
                id="productCatDrop"
                value={productThirdCat}
                label="Sub ProductCat"
                className='w-full bg-[#fff]'
                size='small'
                onChange={handleChangeProductThirdCat}
              >
                {
                  context?.catData?.map((cat) => {
                    return (
                      cat?.children?.length !== 0 && cat?.children?.map((subCat) => {
                        return (
                          subCat?.children?.length && subCat?.children?.map((thirdCat, index) => {
                            return (
                              <MenuItem value={thirdCat?._id} key={index} onClick={() => { selectThirdCatByName(thirdCat?.name) }}>{thirdCat?.name}</MenuItem>
                            )
                          })


                        )
                      })
                    )
                  })
                }
              </Select>
            }

          </div>

          {/* Product Price Input  */}
          <div className="col">
            <h3 className='text-[14px] font-[600] mb-2'>Product Price *</h3>
            <input type="number" className='w-full h-[40px] p-2 border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-md text-sm ' name='price' value={formFields.price} onChange={onChangeInput} />
          </div>

          {/* Product OldPrice Input  */}
          <div className="col">
            <h3 className='text-[14px] font-[600] mb-2'>Product OldPrice *</h3>
            <input type="number" className='w-full h-[40px] p-2 border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-md text-sm ' name='oldPrice' value={formFields.oldPrice} onChange={onChangeInput} />
          </div>

          {/* Product Featured Input  */}
          <div className="col">
            <h3 className='text-[14px] font-[600] mb-2'>Is Featured?</h3>
            <Select
              labelId="demo-simple-select-label"
              id="productFeaturedDrop"
              value={productFeatured}
              label="ProductFeatured"
              className='w-full bg-white'
              size='small'
              onChange={handleChangeProductFeatured}
            >
              <MenuItem value={true}>True</MenuItem>
              <MenuItem value={false}>False</MenuItem>
            </Select>
          </div>

          {/* Product Stock Input  */}
          <div className="col">
            <h3 className='text-[14px] font-[600] mb-2'>Product Stock *</h3>
            <input type="number" className='w-full h-[40px] p-2 border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-md text-sm ' name='countInStock' value={formFields.countInStock} onChange={onChangeInput} />
          </div>

          {/* Product brnad input  */}
          <div className="col">
            <h3 className='text-[14px] font-[600] mb-2'>Product Brand *</h3>
            <input type="text" className='w-full h-[40px] p-2 border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-md text-sm ' name='brand' value={formFields.brand} onChange={onChangeInput} />
          </div>

        </div>

        <div className='grid grid-cols-4 gap-4 mb-4'>
          {/* Product Discount Input  */}
          <div className="col">
            <h3 className='text-[14px] font-[600] mb-2'>Product Discount *</h3>
            <input type="number" className='w-full h-[40px] p-2 border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-md text-sm ' name='discount' value={formFields.discount} onChange={onChangeInput} />
          </div>

          {/* Product Rams Input  */}
          <div className="col">
            <h3 className='text-[14px] font-[600] mb-2'>Product Rams</h3>

            {

              productRamsData?.length !== 0 &&
              <Select
                labelId="demo-simple-select-label"
                multiple
                id="productCatDrop"
                value={productRams}
                label="ProductRams"
                className='w-full bg-white'
                size='small'
                onChange={handleChangeProductRams}
              >
                {
                  productRamsData?.map((ram, index) => {
                    return (
                      <MenuItem value={ram?.name} key={index}>{ram?.name}</MenuItem>
                    )
                  })
                }

              </Select>
            }


          </div>

          {/* Product Weight Input  */}
          <div className="col">
            <h3 className='text-[14px] font-[600] mb-2'>Product Weight</h3>
            {

              productWeightData?.length !== 0 &&
              <Select
                multiple
                labelId="demo-simple-select-label"
                id="productSubCatDrop"
                value={productWeight}
                label="ProductWeight"
                className='w-full bg-white'
                size='small'
                onChange={handleChangeProductWeight}
              >
                {
                  productWeightData?.map((weight, index) => {
                    return (
                      <MenuItem value={weight?.name} key={index}>{weight?.name}</MenuItem>
                    )
                  })
                }
              </Select>

            }


          </div>

          {/* Product Size Input  */}
          <div className="col">
            <h3 className='text-[14px] font-[600] mb-2'>Product Size</h3>
            {

              productSizeData?.length !== 0 &&
              <Select
                multiple
                labelId="demo-simple-select-label"
                id="productSubCatDrop"
                value={productSize}
                label="ProductSize"
                className='w-full bg-white'
                size='small'
                onChange={handleChangeProductSize}
              >
                {
                  productSizeData?.map((size, index) => {
                    return (
                      <MenuItem value={size?.name} key={index}>{size?.name}</MenuItem>
                    )
                  })
                }
              </Select>
            }

          </div>

        </div>


        <div className='grid grid-cols-4 gap-4 mb-4'>


          {/* Product Rating Input  */}
          <div className="col">
            <h3 className='text-[14px] font-[600] mb-2'>Product Rating *</h3>
            <Rating name="half-rating" defaultValue={1} precision={0.5} onChange={onChangeRating} />
          </div>
        </div>

        <div className="col w-full p-5 px-0 rounded-md">

          <h3 className='font-[700] text-[20px] mb-2'>Media & Images *</h3>
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




            <UploadBox multiple={true} name="images" url="/api/product/uploadCategoryImage" setPreviewsFun={setPreviewsFun} />

          </div>
        </div>

        <br />
        <Button type='submit' className='btn-blue w-full btn flex items-center gap-2'>{
          isLoading === true ? <CircularProgress color="inherit" /> : <> <IoCloudUploadOutline className='text-[18px]' />Publish and View</>
        }</Button>
      </form>
    </section>
  )
}

export default AddProduct
