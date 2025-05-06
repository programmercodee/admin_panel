import React, { useContext, useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import { BiExport } from "react-icons/bi";
import { IoAdd } from "react-icons/io5";
import { Link } from 'react-router-dom';
import Progress from '../../components/ProgressBar';
import TooltipMui from '@mui/material/Tooltip';
import { AiTwotoneEdit } from "react-icons/ai";
import { IoEyeOutline } from "react-icons/io5";
import { MdOutlineDeleteForever } from "react-icons/md";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import CircularProgress from '@mui/material/CircularProgress';
// Material Ui table 
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import SearchBox from '../../components/SearchBox';
import { MyContext } from '../../App';
import { deleteData, fetchDataFromApi } from '../../utils/api';
import Rating from '@mui/material/Rating';

const columns = [

  { id: 'product', label: 'PRODUCT', minWidth: 150 },
  { id: 'category', label: 'CATEGORY', minWidth: 150 },
  { id: 'subcategory', label: 'SUB CATEGORY', minWidth: 150 },
  { id: 'Price	', label: 'PRICE', minWidth: 130 },
  { id: 'sales	', label: 'SALES', minWidth: 100 },
  { id: 'rating	', label: 'RATING', minWidth: 100 },
  { id: 'action	', label: 'ACTION', minWidth: 120 },
];

const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767),
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const Products = () => {

  // Material Ui Table
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const context = useContext(MyContext)
const [isLoading, setIsLoading] = useState(false)

  const [productData, setProductData] = useState([])

  {/* Product Category state  */ }
  const [productCat, setproductCat] = useState('');

  const handleChangeProductCat = (event) => {
    setproductCat(event.target.value);
    setIsLoading(true)
    fetchDataFromApi(`/api/product/getAllProductsByCatId/${event.target.value}`).then((res) => {
      setProductData(res?.products)
      setIsLoading(false)
    })

  };


  {/* Product sub Category state  */ }
  const [productSubCat, setproductSubCat] = useState('');

  const handleChangeProductSubCat = (event) => {
    setproductSubCat(event.target.value);
    setIsLoading(true)
    fetchDataFromApi(`/api/product/getAllProductsBySubCatId/${event.target.value}`).then((res) => {
      setProductData(res?.products)
      setIsLoading(false)
    })

  };


  {/* Product third Category state  */ }
  const [productThirdCat, setproductThirdCat] = useState('');

  const handleChangeProductThirdCat = (event) => {
    setproductThirdCat(event.target.value);
    setIsLoading(true)
    fetchDataFromApi(`/api/product/getAllProductsByThirdLevelCat/${event.target.value}`).then((res) => {
      setProductData(res?.products)
      setIsLoading(false)
    })

  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };




  useEffect(() => {

    getProducts();

  }, [context?.isOpenFullScreenPanel])

  const getProducts = async () => {
    setIsLoading(true)
    fetchDataFromApi("/api/product/getAllProducts").then((res) => {
      if (res?.error === false) {
        setProductData(res?.products)
        setIsLoading(false)
      }
    })
  }

  const deleteProduct = (id) => {
    deleteData(`/api/product/${id}`).then((res) => {
      getProducts()
      context.openAlertBox("success", "Product deleted Successfully")
    })
  }





  return (
    <>
      <div className="card pl-1 ">
        <div className="col1 flex items-center justify-between my-3">
          <h1 className='font-[700] text-[22px] text-gray-800'>Products</h1>
          <div className='col pr-1 flex items-center justify-end gap-2'>
            <Button className='btn-sm btn !bg-green-500 hover:!bg-green-600 !text-[#fff] flex items-center gap-2'><BiExport className='text-[#fff] font-bold text-[18px]' />Export</Button>
            <Button className='!bg-blue-500 hover:!bg-blue-600 btn-sm !text-[#fff] flex items-baseline gap-2' onClick={() => {
              context.setIsOpenFullScreenPanel({
                open: true,
                model: "Add Product"
              })
            }}><IoAdd className='text-[#fff] font-bold text-[18px]' />Add Products</Button>
          </div>
        </div>

      </div>

      <div className="card my-3 sm:rounded-lg bg-white shadow-md">
        <div className="flex items-center justify-between px-5 py-3">
        </div>

        {/* btn section of add product and export */}
        <div className='flex items-center justify-between gap-3 pl-6 px-3 w-full'>

          {/* filtering process */}
          <div className="col w-[20%]  text-[18px] font-[600] gap-2">
            <h4 className='mb-2'>Category by</h4>
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
                      <MenuItem value={cat?._id} key={index}>{cat?.name}</MenuItem>
                    )
                  })
                }
              </Select>
            }
          </div>


          <div className="col w-[20%]  text-[18px] font-[600] gap-2">
            <h4 className='mb-2'>Sub Category by</h4>
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
                          <MenuItem value={subCat?._id}>{subCat?.name}</MenuItem>

                        )
                      })
                    )
                  })
                }
              </Select>
            }

          </div>


          <div className="col w-[20%]  text-[18px] font-[600] gap-2">
            <h4 className='mb-2'>Third Level Category by</h4>
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
                              <MenuItem value={thirdCat?._id} key={index}>{thirdCat?.name}</MenuItem>
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


          <div className='ml-auto w-[23%]'  >
            <SearchBox />
          </div>

        </div>

        <br />
        {/* Table section of material ui*/}
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Checkbox {...label} size='small' />
                </TableCell>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>

                ))}
              </TableRow>
            </TableHead>
            <TableBody style={{ minWidth: columns.minWidth }}>

              {
                 isLoading === false ?  productData?.length !== 0 &&

                  productData?.length !== 0 && productData?.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )?.reverse()?.map((product, index) => {
                    return (
                      <TableRow key={index}>

                        <TableCell style={{ minWidth: columns.minWidth }}>
                          <Checkbox {...label} size='small' />
                        </TableCell>
                        <TableCell style={{ minWidth: columns.minWidth }}>
                          <div className="flex items-center gap-4 w-[300px]">
                            <div className="img w-[55px] h-[55px] rounded-md overflow-hidden group">
                              <Link to={`/product/${product?._id}`} className=''>

                                <LazyLoadImage
                                  alt={"image"}
                                  effect='blur'
                                  src={product?.images[0]} // use normal <img> attributes as props
                                  wrapperProps={{
                                    // If you need to, you can tweak the effect transition using the wrapper style.
                                    style: { transitionDelay: "0.5s" },
                                  }}
                                  className='!w-full !h-full !object-cover hover:!scale-105 !transition-all duration-700'
                                />

                              </Link>
                            </div>

                            <div className="info w-[70%]">
                              <h3 className='text-[13px] leading-3 font-[600] hover:text-[#3872fa] transition-all'>
                                <Link to={`/product/${product?._id}`} className=''>
                                  {product?.name}
                                </Link>
                              </h3>
                              <span className='leading-3 text-[11px]'>{product?.brand}</span>
                            </div>
                          </div>
                        </TableCell>

                        <TableCell>
                          {product?.catName}
                        </TableCell>

                        <TableCell>
                          {product?.subCat}
                        </TableCell>

                        <TableCell>
                          <div className="flex gap-2 flex-col">
                            <span className='oldPrice line-through text-[14px] font-[500] text-gray-500'>₹{product?.oldPrice}</span>
                            <span className='price text-primary text-[14px] font-[600]'>₹{product?.price}</span>
                          </div>
                        </TableCell>

                        <TableCell>
                          <p className='text-[14px]'>  <span className='font-[600]'>{product?.sale}</span> sale</p>

                        </TableCell>

                        <TableCell>
                        <Rating name="half-rating" precision={0.5} readOnly  size='small' defaultValue={product?.rating}/>
                        </TableCell>

                        <TableCell>
                          <div className="flex items-center gap-1">

                            <TooltipMui title="Edit Product" placement="top">
                              <Button className='!w-[35px] !h-[35px] !min-w-[35px] !bg-[#f1f1f1] hover:!bg-[#ccc] !border !border-[rgba(0,0,0,0.2)] !text-[rgba(0,0,0,0.7)]' onClick={() => {
                                context.setIsOpenFullScreenPanel({
                                  open: true,
                                  model: "Edit Product",
                                  id: product?._id
                                })
                              }}><AiTwotoneEdit className='text-[25px]' /></Button>
                            </TooltipMui>

                            <TooltipMui title="View Product Details" placement="top">
                              <Link to={`/product/${product?._id}`}>
                                <Button className='!w-[35px] !h-[35px] !min-w-[35px] !bg-[#f1f1f1] hover:!bg-[#ccc] !border !border-[rgba(0,0,0,0.2)] !text-[rgba(0,0,0,0.7)]'><IoEyeOutline className='text-[25px]' /></Button>
                              </Link>
                            </TooltipMui>

                            <TooltipMui title="Remove Product" placement="top">
                              <Button className='!w-[35px] !h-[35px] !min-w-[35px] !bg-[#f1f1f1] hover:!bg-[#ccc] !border !border-[rgba(0,0,0,0.2)] !text-[rgba(0,0,0,0.7)]' onClick={() => { deleteProduct(product?._id) }}><MdOutlineDeleteForever className='text-[25px]' /></Button>
                            </TooltipMui>

                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })

                  :
                 <>
                 <TableRow>
                  <TableCell colSpan={8}>
                  <div className="flex w-full items-center justify-center h-[350px]">
                    <CircularProgress color="inherit" />
                  </div>
                  </TableCell>
                 </TableRow>
                 </>

              }


            </TableBody>

          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={productData?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

      </div>


    </>
  )
}

export default Products
