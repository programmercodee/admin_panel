import React, { useContext } from 'react'
import Button from '@mui/material/Button'
import { RiMenu2Fill } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { FaRegBell } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import { MyContext } from '../../App'
import { IoMdLogIn } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

import Slide from '@mui/material/Slide';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import { FaRegUser } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { fetchDataFromApi } from '../../utils/api';
import AddProduct from '../../Pages/Products/addProduct';
import AddHomeSlide from '../../Pages/HomeSilderBanners/addHomeSlide';
import AddCategory from '../../Pages/Category/addCategory';
import AddSubCategory from '../../Pages/Category/addSubCategory';
import AddAddress from '../../Pages/Address';
import EditCategory from '../../Pages/Category/editCategory';

// Dialog dependency 
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import EditProduct from '../../Pages/Products/editProduct';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));



const Header = () => {

  const logout = () => {
    setAnchorEl(null)

    fetchDataFromApi(`/api/user/logout?token=${localStorage.getItem("accessToken")}`, { withCredentials: true }).then((res) => {
      console.log(res)

      if (res?.error === false) {

        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        context.setIsLogin(false)
        context.openAlertBox("success", res.message)

      }

    })
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const context = useContext(MyContext)

  return (
     <>
  
    <header className={`w-full h-[50px] bg-[#fff] transition-all shadow-md py-5 pr-8 flex items-center justify-between ${context.isSidebarOpen === true ? ' pl-[290px]' : 'pl-5 z-50'}`}>
      <div className="part1 flex items-center justify-between w-[60%] z-[999] ">
        <Button className='!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-[rgba(0,0,0,0.8)] cursor-pointer'
          onClick={() => { context.setIsSidebarOpen(!context.isSidebarOpen) }}>
          <RiMenu2Fill className='text-[19px] text-[rgba(0,0,0,0.8)]' />
        </Button>
       
      </div>
      <div className="part2 w-[40%] justify-end flex gap-4">

        {
          context.isLogin === true ? (<div className="relative">
            <div className="w-[35px] h-[35px] rounded-full overflow-hidden cursor-pointer">
              <img src={`${context.userData?.avatar}`} onClick={handleClick} alt="" className='w-full h-full object-cover' />
            </div>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              slotProps={{
                paper: {
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&::before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={handleClose} className='!bg-[#fff]'>
                <div className="flex items-center justify-center gap-3">
                  <div className="w-[50px] h-[50px] rounded-full overflow-hidden cursor-pointer">
                    <img src={`${context.userData?.avatar}`} alt="" className='w-full h-full object-cover' />
                  </div>


                  <div className="info ">
                    <h3 className='text-[15px] font-[500] leading-5'>{context.userData?.name}</h3>
                    <p className='text-[12px] font-[400] text-[rgba(0,0,0,0.5)]'>{context.userData?.email}</p>
                  </div>
                </div>
              </MenuItem>
              <Divider />
              <Link to="/profile">
                <MenuItem onClick={handleClose} className='flex items-center gap-3'>
                  <FaRegUser /> <span className='font-[500]'>Profile</span>
                </MenuItem>
              </Link>
              <MenuItem onClick={handleClose} className='flex items-center gap-3'>
                <IoSettingsOutline /> <span className='font-[500]'>Settings</span>
              </MenuItem>

              <MenuItem onClick={logout} className='flex items-center gap-3'>
                <AiOutlineLogout /> <span className='font-[500]'>Logout</span>
              </MenuItem>

            </Menu>
          </div>) : 
          <Link to="/login" className={`${context.isSidebarOpen === true ? 'hidden md:flex' : 'flex'}`}><Button className={`btn-blue btn-sm flex items-center gap-1 !rounded-full  `}><IoMdLogIn className='text-[15px]' />Login</Button></Link>
        }


{/* context.isSidebarOpen */}
      </div>

    </header>




     {/* Dialog module  */}
     <Dialog
          fullScreen
          open={context?.isOpenFullScreenPanel.open}
          onClose={() => {
            setIsOpenFullScreenPanel({
              open: false
            })
          }}
          TransitionComponent={Transition}
        >
          <AppBar sx={{ position: 'relative' }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => {
                  context?.setIsOpenFullScreenPanel({
                    open: false
                  })
                }}
                aria-label="close"
              >
                <IoMdClose className='text-gray-800' />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                <span className='text-[#000]'> {context?.isOpenFullScreenPanel?.model}</span>
              </Typography>

            </Toolbar>
          </AppBar>

          {/* Conten of this page  */}

          {
            context?.isOpenFullScreenPanel?.model === "Add Product" && <AddProduct />
          }

          {
            context?.isOpenFullScreenPanel?.model === "Add Home Slide" && <AddHomeSlide />
          }
          {
            context?.isOpenFullScreenPanel?.model === "Add New Category" && <AddCategory />
          }
          {
            context?.isOpenFullScreenPanel?.model === "Add New Sub Category" && <AddSubCategory />
          }
          {
            context?.isOpenFullScreenPanel?.model === "Add new Address" && <AddAddress />
          }
          {
            context?.isOpenFullScreenPanel?.model === "Edit Category" && <EditCategory />
          }
          {
            context?.isOpenFullScreenPanel?.model === "Edit Product" && <EditProduct />
          }

        </Dialog>
    </>
  )
}

export default Header
