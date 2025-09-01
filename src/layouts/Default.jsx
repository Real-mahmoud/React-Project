import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router'
import Footer from '../components/Footer'

const Default = () => {
  return (
    <>
        <div className="d-flex justify-content-between flex-column bg-secondary-subtle " style={{minHeight:"100vh"}}>
            <div>
                <Navbar/>
                <Outlet/>
            </div>
            <Footer/>
        </div>
    </>
  )
}

export default Default
