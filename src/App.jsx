import React, { createContext, useEffect, useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './Pages/Dashboard'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Error404 from './Pages/Error404'
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
import Products from './Pages/Products'


import HomeSilderBanners from './Pages/HomeSilderBanners'
import Category from './Pages/Category'
import SubCategory from './Pages/Category/subCatlist'
import Users from './Pages/Users'
import Orders from './Pages/Orders'
import ForgetPassword from './Pages/ForgetPassword'
import VerifyAcount from './Pages/VerifyAccount'
import ChangePassword from './Pages/ChangePassword'

// Toaster dependency
import toast, { Toaster } from "react-hot-toast";
import { fetchDataFromApi } from './utils/api'
import Profile from './Pages/Profile'
import ProductDetails from './Pages/Products/productDetails'
import AddRAMS from './Pages/Products/addRAMS'
import AddWEIGHT from './Pages/Products/addWEIGHT'
import AddSIZE from './Pages/Products/addSIZE'


const MyContext = createContext()
const App = () => {
  const [isLogin, setIsLogin] = useState(false)
  //ths is used in backend 
  const [userData, setUserData] = useState(null)

  const [catData, setCatData] = useState([])

  //ths is used in backend for mainting user data
  useEffect(() => {

    const token = localStorage.getItem('accessToken');

    if (token !== undefined && token !== null && token !== "") {
      setIsLogin(true)

      //getting all user data.
      fetchDataFromApi(`/api/user/user-details?token=${token}`).then((res) => {
        // console.log(res)
        setUserData(res.data)
        //automati logout if session is end
        if (res?.response?.data?.error === true) {
          if (res?.response?.data?.message === "You have not login.") {
            localStorage.removeItem("accessToken")
            localStorage.removeItem("refreshToken")
            setIsLogin(false)
            openAlertBox("error", "We miss you!!, Please login again!")
          }
        }

      })

    } else {
      setIsLogin(false)
    }

  }, [isLogin])


  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  // FullScreenPanel state 
  const [isOpenFullScreenPanel, setIsOpenFullScreenPanel] = useState({
    open: false,
    model: "",
    id: ""
  })

  useEffect(()=>{
    if(windowWidth <= 992){
      setIsSidebarOpen(false)
    }

  },[windowWidth])

  const openAlertBox = (status, msg) => {
    console.log(status)
    if (status === "success") {
      toast.success(msg);
    }
    if (status === "error") {
      toast.error(msg);
    }
  };

  const router = createBrowserRouter([

         //  Product Size page 
         {
          path: '/product/addSize',
          exact: true,
          element: (
            <>
              <section className='main'>
                <Header />
                <div className="contentMain flex">
                  <div className={`sidebarWrapper ${isSidebarOpen === true ? 'w-[18%]' : 'w-[0px] hidden'} transition-all`}>
                    <Sidebar />
                  </div>
                  <div className={`contentRight py-4 px-5 ${isSidebarOpen === false ? 'w-[100%] z-50' : 'w-[82%] '} transition-all`}>
                    <AddSIZE />
                  </div>
                </div>
              </section>
            </>
          )
        },


     //  Product Weight page 
     {
      path: '/product/addWeight',
      exact: true,
      element: (
        <>
          <section className='main'>
            <Header />
            <div className="contentMain flex">
              <div className={`sidebarWrapper ${isSidebarOpen === true ? 'w-[18%]' : 'w-[0px] hidden'} transition-all`}>
                <Sidebar />
              </div>
              <div className={`contentRight py-4 px-5 ${isSidebarOpen === false ? 'w-[100%] z-50' : 'w-[82%] '} transition-all`}>
                <AddWEIGHT />
              </div>
            </div>
          </section>
        </>
      )
    },


    //  Product Rams page 
    {
      path: '/product/addRams',
      exact: true,
      element: (
        <>
          <section className='main'>
            <Header />
            <div className="contentMain flex">
              <div className={`sidebarWrapper ${isSidebarOpen === true ? 'w-[18%]' : 'w-[0px] hidden'} transition-all`}>
                <Sidebar />
              </div>
              <div className={`contentRight py-4 px-5 ${isSidebarOpen === false ? 'w-[100%] z-50' : 'w-[82%] '} transition-all`}>
                <AddRAMS />
              </div>
            </div>
          </section>
        </>
      )
    },

    //  ProductDetails page 
    {
      path: '/product/:id',
      exact: true,
      element: (
        <>
          <section className='main'>
            <Header />
            <div className="contentMain flex">
              <div className={`sidebarWrapper ${isSidebarOpen === true ? 'w-[18%]' : 'w-[0px] hidden'} transition-all`}>
                <Sidebar />
              </div>
              <div className={`contentRight py-4 px-5 ${isSidebarOpen === false ? 'w-[100%] z-50' : 'w-[82%] '} transition-all`}>
                <ProductDetails />
              </div>
            </div>
          </section>
        </>
      )
    },

    //  Profile page 
    {
      path: '/profile',
      exact: true,
      element: (
        <>
          <section className='main'>
            <Header />
            <div className="contentMain flex">
              <div className={`sidebarWrapper ${isSidebarOpen === true ? 'w-[18%]' : 'w-[0px] hidden'} transition-all`}>
                <Sidebar />
              </div>
              <div className={`contentRight py-4 px-5 ${isSidebarOpen === false ? 'w-[100%] z-50' : 'w-[82%] '} transition-all`}>
                <Profile />
              </div>
            </div>
          </section>
        </>
      )
    },
    // Dashboard page 
    {
      path: '/',
      exact: true,
      element: (
        <>
          <section className='main'>
            <Header />
            <div className="contentMain flex">
              <div className={`sidebarWrapper ${isSidebarOpen === true ? 'w-[18%]' : 'w-[0px] hidden'} transition-all`}>
                <Sidebar />
              </div>
              <div className={`contentRight py-4 px-5 ${isSidebarOpen === false ? 'w-[100%] z-50' : 'w-[82%] '} transition-all`}>
                <Dashboard />
              </div>
            </div>
          </section>
        </>
      )
    },
    //Orders Page
    {
      path: '/orders',
      exact: true,
      element: (
        <>
          <section className='main'>
            <Header />
            <div className="contentMain flex">
              <div className={`sidebarWrapper ${isSidebarOpen === true ? 'w-[18%]' : 'w-[0px] hidden'} transition-all`}>
                <Sidebar />
              </div>
              <div className={`contentRight py-4 px-5 ${isSidebarOpen === false ? 'w-[100%] z-50' : 'w-[82%] '} transition-all`}>
                <Orders />
              </div>
            </div>
          </section>
        </>
      )
    },
    //Users Page
    {
      path: '/users',
      exact: true,
      element: (
        <>
          <section className='main'>
            <Header />
            <div className="contentMain flex">
              <div className={`sidebarWrapper ${isSidebarOpen === true ? 'w-[18%]' : 'w-[0px] hidden'} transition-all`}>
                <Sidebar />
              </div>
              <div className={`contentRight py-4 px-5 ${isSidebarOpen === false ? 'w-[100%] z-50' : 'w-[82%] '} transition-all`}>
                <Users />
              </div>
            </div>
          </section>
        </>
      )
    },
    //Sub Category
    {
      path: '/subCategory/list',
      exact: true,
      element: (
        <>
          <section className='main'>
            <Header />
            <div className="contentMain flex">
              <div className={`sidebarWrapper ${isSidebarOpen === true ? 'w-[18%]' : 'w-[0px] hidden'} transition-all`}>
                <Sidebar />
              </div>
              <div className={`contentRight py-4 px-5 ${isSidebarOpen === false ? 'w-[100%] z-50' : 'w-[82%] '} transition-all`}>
                <SubCategory />
              </div>
            </div>
          </section>
        </>
      )
    },
    // Category
    {
      path: '/category/list',
      exact: true,
      element: (
        <>
          <section className='main'>
            <Header />
            <div className="contentMain flex">
              <div className={`sidebarWrapper ${isSidebarOpen === true ? 'w-[18%]' : 'w-[0px] hidden'} transition-all`}>
                <Sidebar />
              </div>
              <div className={`contentRight py-4 px-5 ${isSidebarOpen === false ? 'w-[100%] z-50' : 'w-[82%] '} transition-all`}>
                <Category />
              </div>
            </div>
          </section>
        </>
      )
    },
    // HomeSilderBanners 
    {
      path: '/homeSlider/list',
      exact: true,
      element: (
        <>
          <section className='main'>
            <Header />
            <div className="contentMain flex">
              <div className={`sidebarWrapper ${isSidebarOpen === true ? 'w-[18%]' : 'w-[0px] hidden'} transition-all`}>
                <Sidebar />
              </div>
              <div className={`contentRight py-4 px-5 ${isSidebarOpen === false ? 'w-[100%] z-50' : 'w-[82%] '} transition-all`}>
                <HomeSilderBanners />
              </div>
            </div>
          </section>
        </>
      )
    },
    // Products list
    {
      path: '/products',
      exact: true,
      element: (
        <>
          <section className='main'>
            <Header />
            <div className="contentMain flex">
              <div className={`sidebarWrapper ${isSidebarOpen === true ? 'w-[18%]' : 'w-[0px] hidden'} transition-all`}>
                <Sidebar />
              </div>
              <div className={`contentRight py-4 px-5 ${isSidebarOpen === false ? 'w-[100%] z-50' : 'w-[82%] '} transition-all`}>
                <Products />
              </div>
            </div>
          </section>
        </>
      )
    },
    // Changepassword Page 
    {
      path: '/change-password',
      element: <ChangePassword />
    },
    // VerifyAcount Page 
    {
      path: '/verify-acount',
      element: <VerifyAcount />
    },
    // ForgetPassword Page 
    {
      path: '/forget-password',
      element: <ForgetPassword />
    },
    // Login Page 
    {
      path: '/login',
      element: <Login />
    },
    // SignU page 
    {
      path: '/signup',
      element: <SignUp />
    },
    // Error page route 
    {
      path: '/*',
      element: <Error404 />
    }
  ])





  useEffect(() => {

    getData();

  }, [])


  const getData = () => {
    fetchDataFromApi("/api/category/").then((res) => {
      setCatData(res?.data)
    })
  }


  const values = {
    isSidebarOpen,
    setIsSidebarOpen,
    isLogin,
    setIsLogin,
    isOpenFullScreenPanel,
    setIsOpenFullScreenPanel,
    openAlertBox,
    userData,
    setUserData,
    catData,
    setCatData,
    getData
  }

  return (
    <>
      <MyContext.Provider value={values}>
        <RouterProvider router={router} />


        <Toaster />

      </MyContext.Provider>
    </>
  )
}

export default App
export { MyContext };
