import React from 'react'
import { NavLink } from 'react-router';

const Navbar = () => {
  
  return (
    <>

        <nav className="navbar navbar-expand-lg bg-secondary d-flex justify-content-between sticky-top ">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">Book Shop</a>
            <div className='d-flex gap-3 mx-3 '>
              
              <NavLink to="/"  className={({ isActive }) =>isActive ? "text-decoration-none fw-bold text-info" : "text-decoration-none text-info"}  >Home</NavLink>
              {localStorage.getItem("token") && <NavLink to="/profile" className={({ isActive }) =>isActive ? "text-decoration-none fw-bold text-info" : "text-decoration-none text-info"}>Profile</NavLink>}
              {!localStorage.getItem("token") && <NavLink to="/auth/login" className={({ isActive }) =>isActive ? "text-decoration-none fw-bold text-info" : "text-decoration-none text-info"} >Login</NavLink>}
            </div>
          </div>
        </nav>

    </>
  );
}

export default Navbar
