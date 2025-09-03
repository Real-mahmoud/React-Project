import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router'
import Footer from '../components/Footer'
import { es } from 'zod/locales'

const Default = ({isManagerLogIn}) => {

  
  
  
  return (
    <>  
      
       {<div className="d-flex justify-content-between flex-column  " style={{backgroundImage:"linear-gradient(to right ,rgba(45, 51, 54, 1),rgba(14, 44, 63, 1))",minHeight:"100vh"}}>
            <div>
                <Navbar isManagerLogIn={isManagerLogIn}/>
                <Outlet/>
            </div>
            <Footer/>
        </div>}
    </>
  )
}

export default Default
