import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import * as z from "zod"
import {toast } from 'react-toastify'
let userSchema=z.object({
  username:z.string().min(4,"name must be more than 3").max(14,"name must be less than 15"),
  password:z.string().min(4,"password must be more than 3").max(10,"password must be less than 10")
})
const Login = ({setManagerState}) => {
  let [user,setUser]=useState({username:"",password:""})
  let [errors,setErrors]=useState({})
  let navigate=useNavigate()
  let isFirstRender  = useRef(true) 
  

  useEffect(()=>{
    if (isFirstRender.current) {
      isFirstRender.current=false;
      return;
    }
    // dont give error before write anything in inputs
    if (user.username!="" || user.password!="") {
      let result=userSchema.safeParse(user);
    if (!result.success) {
      let newErrors={}
      result.error.issues.forEach(err => newErrors[err.path[0]] = err.message)
      setErrors(()=> newErrors)
    }else {
      setErrors({})
    }
    }
    
  },[user.username,user.password])

  function handleChange (e){
    setUser({...user,[e.target.name]:e.target.value})
  }

 async function handleSubmit (e){
    e.preventDefault();
   try {
    let result=userSchema.safeParse(user);
    let response= await axios.post("https://dummyjson.com/auth/login",user,{credentials: 'include'})
    localStorage.setItem("token",response.data.accessToken)
    setManagerState(true)
    
    if (result.success) {
      setUser({username:"",password:""})
      setErrors({})
      toast.success("Login success")
    }
    setTimeout(() => {
      navigate('/')
    }, 1000);
   } catch (error) {
      toast.error("Wrong Data") 
   }
  }
  return (
    <>
     <div className='pt-5' style={{backgroundImage:"linear-gradient(to right ,rgba(45, 51, 54, 1),rgba(14, 44, 63, 1))", height:"100vh"}}>
      <div className='container bg-secondary-subtle row mx-auto position-relative'  >

    <div className='col-12 col-lg-8 my-5'>
        <p className='h1'>Welcome back</p>
        <p className='h5'>Enter your Credentials to access your account</p>
      <form onSubmit={handleSubmit} className=' my-5'>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label h5">Username</label>
        <div className="input-group">
          <span className="input-group-text" id="visible-addon">@</span>
          <input type="text"  name='username' value={user.username} className="form-control" id="exampleInputEmail1"  onChange={handleChange} placeholder="Username" aria-label="Username" aria-describedby="visible-addon"/>
          <input type="text" className="form-control d-none"  aria-label="Hidden input" aria-describedby="visible-addon"/>
        </div>
        
        {errors && errors.username !="" && user.username != "" && <p className='text-danger'><small>{errors.username}</small></p>}
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label h5">Password</label>
        <input type="password" name='password' placeholder="Password" value={user.password} className="form-control" id="exampleInputPassword1" onChange={handleChange}/>
        {errors && errors.password  &&  user.password!="" && <p className='text-danger'><small>{errors.password}</small></p>}

      </div>
      <button type="submit" className="btn w-100 my-3" style={{backgroundColor:"#3A5B22" , color:"white"}}>Login</button>
    </form>
    </div>
    
     </div>
     </div>
    </>
  )
}

export default Login
