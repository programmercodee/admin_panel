import React, { useContext, useState } from 'react'
import Button from '@mui/material/Button'
import { BiExport } from "react-icons/bi";
import { IoAdd } from "react-icons/io5";
import { Link } from 'react-router-dom';
import Progress from '../../components/ProgressBar';
import TooltipMui from '@mui/material/Tooltip';
import { AiTwotoneEdit } from "react-icons/ai";
import { IoEyeOutline } from "react-icons/io5";
import { MdOutlineDeleteForever } from "react-icons/md";
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

const columns = [

  { id: 'image', label: 'IMAGE', minWidth: 150 },
  { id: 'action', label: 'ACTION', minWidth: 50 },

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

const HomeSilderBanners = () => {

  // Material Ui Table
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const [categoryFilterVal, srtCategoryFilterVal] = useState('');
  const context = useContext(MyContext)

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

  return (
    <>
      <div className="card pl-1 ">
        <div className="col1 flex items-center justify-between my-3">
          <h1 className='font-[700] text-[22px] text-gray-800'>Home Slider Banners</h1>
          <div className='col pr-1 flex items-center justify-end gap-2'>
            <Button className='btn-sm btn !bg-green-500 hover:!bg-green-600 !text-[#fff] flex items-center gap-2'><BiExport className='text-[#fff] font-bold text-[18px]' />Export</Button>
            <Button className='!bg-blue-500 hover:!bg-blue-600 btn-sm !text-[#fff] flex items-baseline gap-2' onClick={() => {
              context.setIsOpenFullScreenPanel({
                open: true,
                model: "Add Home Slide"
              })
            }}><IoAdd className='text-[#fff] font-bold text-[18px]' />Add Home Banner Slide</Button>
          </div>
        </div>

      </div>

      <div className="card my-3 sm:rounded-lg bg-white shadow-md">
        <div className="flex items-center justify-between px-5 py-3">
        </div>

        {/* btn section of add product and export */}
       

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

            <TableBody style={{ minWidth: columns.minWidth }}>
              <TableCell style={{ minWidth: columns.minWidth }}>
                <Checkbox {...label} size='small' />
              </TableCell>
              <TableCell style={{ minWidth: columns.minWidth }}>
                <div className="flex items-center gap-4 w-[300px]">
                  <div className="img w-full h-auto rounded-md overflow-hidden group">
                    <Link to='/product/545' className=''>
                      <img src="https://api.spicezgold.com/download/file_1734524930884_NewProject(6).jpg" alt="" className='w-full group-hover:scale-105 transition-all' />
                    </Link>
                  </div>


                </div>
              </TableCell>

              <TableCell>
                <div className="flex items-center gap-1">
                  <TooltipMui title="Edit Product" placement="top">
                    <Button className='!w-[35px] !h-[35px] !min-w-[35px] !bg-[#f1f1f1] hover:!bg-[#ccc] !border !border-[rgba(0,0,0,0.2)] !text-[rgba(0,0,0,0.7)]'><AiTwotoneEdit className='text-[25px]' /></Button>
                  </TooltipMui>
                  <TooltipMui title="View Product Details" placement="top">
                    <Button className='!w-[35px] !h-[35px] !min-w-[35px] !bg-[#f1f1f1] hover:!bg-[#ccc] !border !border-[rgba(0,0,0,0.2)] !text-[rgba(0,0,0,0.7)]'><IoEyeOutline className='text-[25px]' /></Button>
                  </TooltipMui>
                  <TooltipMui title="Remove Product" placement="top">
                    <Button className='!w-[35px] !h-[35px] !min-w-[35px] !bg-[#f1f1f1] hover:!bg-[#ccc] !border !border-[rgba(0,0,0,0.2)] !text-[rgba(0,0,0,0.7)]'><MdOutlineDeleteForever className='text-[25px]' /></Button>
                  </TooltipMui>
                </div>
              </TableCell>
            </TableBody>








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




export default HomeSilderBanners
