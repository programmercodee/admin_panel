import React, { useContext, useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import { BiExport } from "react-icons/bi";
import { IoAdd } from "react-icons/io5";
import { Link } from 'react-router-dom';
import TooltipMui from '@mui/material/Tooltip';
import { AiTwotoneEdit } from "react-icons/ai";
import { IoEyeOutline } from "react-icons/io5";
import { MdOutlineDeleteForever } from "react-icons/md";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
// Material Ui table 
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';

import { MyContext } from '../../App';
import { deleteData, fetchDataFromApi } from '../../utils/api';

const columns = [

  { id: 'image', label: 'IMAGE', minWidth: 250 },
  { id: 'catName', label: 'CATEGORY NAME', minWidth: 120 },
  { id: 'action', label: 'ACTION', minWidth: 120 },

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

const Category = () => {

  // Material Ui Table
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const [categoryFilterVal, srtCategoryFilterVal] = useState('');
  const context = useContext(MyContext)

  // const [catData, setCatData] = useState([])

  useEffect(() => {
    fetchDataFromApi("/api/category/").then((res) => {
      context?.setCatData(res?.data)
    })
    //realtime date show while editing
  }, [context?.isOpenFullScreenPanel])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  const handleChangeCatFilter = (event) => {
    srtCategoryFilterVal(event.target.value);
  };

  const deleteCat = (id) => {
    deleteData(`/api/category/${id}`).then((res) => {
      fetchDataFromApi("/api/category/").then((res) => {
        context?.setCatData(res?.data)
      })
    })
  }

  return (
    <>
      <div className="card pl-1 ">
        <div className="col1 flex items-center justify-between my-3">
          <h1 className='font-[700] text-[22px] text-gray-800'>Category List</h1>
          <div className='col pr-1 flex items-center justify-end gap-2'>
            <Button className='btn-sm btn !bg-green-500 hover:!bg-green-600 !text-[#fff] flex items-center gap-2'><BiExport className='text-[#fff] font-bold text-[18px]' />Export</Button>
            <Button className='!bg-blue-500 hover:!bg-blue-600 btn-sm !text-[#fff] flex items-baseline gap-2' onClick={() => {
              context.setIsOpenFullScreenPanel({
                open: true,
                model: "Add New Category"
              })
            }}><IoAdd className='text-[#fff] font-bold text-[18px]' />Add New Category</Button>
          </div>
        </div>

      </div>

      <div className="card my-3 sm:rounded-lg bg-white shadow-md">
        <div className="flex items-center justify-between px-5 py-3">
        </div>


        <br />
        {/* Table section of material ui*/}
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>

                <TableCell width={80}>
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

            {

              context?.catData?.lenght !== 0 && context?.catData?.map((item, index) => {
                return (

                  <TableBody style={{ minWidth: columns.minWidth }} key={index}>
                    <TableCell style={{ minWidth: columns.minWidth }}>
                      <Checkbox {...label} size='small' />
                    </TableCell>
                    <TableCell style={{ minWidth: columns.minWidth }}>
                      <div className="flex items-center gap-4 w-[70px]  ">
                        <div className="img h-auto rounded-md overflow-hidden group">
                          <Link to='/product/545' className=''>

                            <LazyLoadImage
                              alt={"image"}
                              effect='blur'
                              src={item?.images} // use normal <img> attributes as props
                              wrapperProps={{
                                // If you need to, you can tweak the effect transition using the wrapper style.
                                style: { transitionDelay: "0.5s" },
                              }}
                              className='w-full group-hover:scale-105 !transition-all'
                            />

                          </Link>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell style={{ minWidth: columns.minWidth }}>
                      {item?.name}
                    </TableCell>

                    <TableCell style={{ minWidth: columns.minWidth }}>
                      <div className="flex items-center gap-4">
                        <TooltipMui title="Edit Product" placement="top">
                          <Button className='!w-[35px] !h-[35px] !min-w-[35px] !bg-[#f1f1f1] hover:!bg-[#ccc] !border !border-[rgba(0,0,0,0.2)] !text-[rgba(0,0,0,0.7)]' onClick={() => {
                            context.setIsOpenFullScreenPanel({
                              open: true,
                              model: "Edit Category",
                              id: item?._id
                            })
                          }}><AiTwotoneEdit className='text-[25px]' /></Button>
                        </TooltipMui>

                        <TooltipMui title="Remove Product" placement="top">
                          <Button className='!w-[35px] !h-[35px] !min-w-[35px] !bg-[#f1f1f1] hover:!bg-[#ccc] !border !border-[rgba(0,0,0,0.2)] !text-[rgba(0,0,0,0.7)]' onClick={() => { deleteCat(item?._id) }}><MdOutlineDeleteForever className='text-[25px]' /></Button>
                        </TooltipMui>
                      </div>
                    </TableCell>
                  </TableBody>
                )
              })
            }


          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

      </div>


    </>
  )
}




export default Category
