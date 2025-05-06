import React, { useContext, useState } from 'react'
import Button from '@mui/material/Button'
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
import Checkbox from '@mui/material/Checkbox';
import SearchBox from '../../components/SearchBox';
import { HiOutlineMail } from "react-icons/hi";
import { MdLocalPhone } from "react-icons/md";
import { HiOutlineCalendarDateRange } from "react-icons/hi2";


const columns = [

  { id: 'userImg', label: 'USER_IMAGE', minWidth: 10 },
  { id: 'userName', label: 'USER NAME', minWidth: 100 },
  { id: 'userEmail', label: 'USER EMAIL', minWidth: 10 },
  { id: 'userPh	', label: 'USER PHONE NO', minWidth: 10 },
  { id: 'createdDate	', label: 'CREATED ON', minWidth: 10 },

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

const Users = () => {

  // Material Ui Table
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };



  return (
    <>
      <div className="card my-3 sm:rounded-lg bg-white shadow-md">
       
        {/* btn section of add product and export */}
        <div className='flex items-center justify-between pl-6 px-3 w-full'>
          <div className="col1 flex items-center justify-between my-3">
            <h1 className='font-[700] text-[22px] text-gray-800'>Users List</h1>
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
              <TableCell style={{ minWidth: columns.minWidth }}>
                <Checkbox {...label} size='small' />
              </TableCell>
              <TableCell style={{ minWidth: columns.minWidth }}>
                <div className="flex items-center gap-4 ">
                  <div className="img w-[45px] h-[45px] rounded-md overflow-hidden group">
                    <Link to='/product/545' className=''>
                      <img src="https://mui.com/static/images/avatar/1.jpg" alt="" className='w-full group-hover:scale-105 transition-all' />
                    </Link>
                  </div>
                </div>
              </TableCell>

              <TableCell>
                Brijesh Vishwakarma
              </TableCell>

              <TableCell>
                <span className='flex items-center gap-1'> <HiOutlineMail className='text-xl text-[rgba(0,0,0,0.7)]' /> bvish5633@gmail.com</span>
              </TableCell>

              <TableCell>
                <span className='flex items-center gap-1'> <MdLocalPhone className='text-lg text-[rgba(0,0,0,0.7)]' /> +91-9022642659</span>

              </TableCell>

              <TableCell>
                <span className='flex items-center gap-1'> <HiOutlineCalendarDateRange className='text-xl text-[rgba(0,0,0,0.7)]' /> 01-02-2025</span>
              </TableCell>

            </TableBody>
            <TableBody style={{ minWidth: columns.minWidth }}>
              <TableCell style={{ minWidth: columns.minWidth }}>
                <Checkbox {...label} size='small' />
              </TableCell>
              <TableCell style={{ minWidth: columns.minWidth }}>
                <div className="flex items-center gap-4 ">
                  <div className="img w-[45px] h-[45px] rounded-md overflow-hidden group">
                    <Link to='/product/545' className=''>
                      <img src="https://mui.com/static/images/avatar/1.jpg" alt="" className='w-full group-hover:scale-105 transition-all' />
                    </Link>
                  </div>
                </div>
              </TableCell>

              <TableCell>
                Brijesh Vishwakarma
              </TableCell>

              <TableCell>
                <span className='flex items-center gap-1'> <HiOutlineMail className='text-xl text-[rgba(0,0,0,0.7)]' /> bvish5633@gmail.com</span>
              </TableCell>

              <TableCell>
                <span className='flex items-center gap-1'> <MdLocalPhone className='text-lg text-[rgba(0,0,0,0.7)]' /> +91-9022642659</span>

              </TableCell>

              <TableCell>
                <span className='flex items-center gap-1'> <HiOutlineCalendarDateRange className='text-xl text-[rgba(0,0,0,0.7)]' /> 01-02-2025</span>
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

export default Users
