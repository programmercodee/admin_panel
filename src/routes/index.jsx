const router = createBrowserRouter([
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

export default router;