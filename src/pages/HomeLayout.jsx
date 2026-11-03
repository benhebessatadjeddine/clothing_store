import React from 'react'
import { Outlet } from 'react-router-dom'
import { Footer, Header, CustomCursor, BackgroundShapes, ScrollProgress } from '../components'

const HomeLayout = () => {
  return (
    <>
    <ScrollProgress />
    <CustomCursor />
    <BackgroundShapes />
    <Header />
    <Outlet />
    <Footer />
    </>
  )
}

export default HomeLayout