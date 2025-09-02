import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router';

const Navbar = ({isManagerLogIn}) => {
    
  return (
    <>

        <nav className="navbar navbar-expand-lg d-flex justify-content-between sticky-top " style={{backgroundColor:"#252b2fff"}}>
          <div className="container-fluid">
            <div>
              <i className="fa-solid fa-book text-info fs-3 me-3 my-2" ></i>
            <a className="navbar-brand" style={{color:"white",fontFamily:"cursive"}}>Magazine</a>
            </div>
            <div className='d-flex gap-3 mx-3 '>
              
              <NavLink to="/"  className={({ isActive }) =>isActive ? "text-decoration-none fw-bold text-info" : "text-decoration-none text-info"}  >Home</NavLink>
              {isManagerLogIn && <NavLink to="/profile" className={({ isActive }) =>isActive ? "text-decoration-none fw-bold text-info" : "text-decoration-none text-info"}>Profile</NavLink>}
              {!isManagerLogIn && <NavLink to="/auth/login" className={({ isActive }) =>isActive ? "text-decoration-none fw-bold text-info" : "text-decoration-none text-info"} >Login</NavLink>}
            </div>
          </div>
        </nav>

    </>
  );
}

export default Navbar
