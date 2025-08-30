import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import * as z from "zod"
import {toast } from 'react-toastify'
let userSchema=z.object({
  username:z.string().min(4,"name must be more than 3").max(20,"name must be less than 20"),
  password:z.string().min(4,"password must be more than 3").max(10,"password must be less than 10")
})
const Login = () => {
  let [user,setUser]=useState({username:"",password:""})
  let [errors,setErrors]=useState({})
  let navigate=useNavigate()
  useEffect(()=>{
    // async function getUser(){
    //   let data=await axios.get("https://dummyjson.com/auth/login")
    //   console.log(data);
    // }  
    // getUser()
    let result=userSchema.safeParse(user);
    if (!result.success) {
      let newErrors={}
      result.error.issues.forEach(err => newErrors[err.path[0]] = err.message)
      setErrors(()=> newErrors)
    }else {
      setErrors({})
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
    console.log(response);
    
    if (result.success) {
      setUser({username:"",password:""})
      setErrors({})
      toast.success("Login success")
    }
    navigate('/')
   } catch (error) {
      toast.error("Failed login")
    
   }
  }
  return (
    <>
    <form onSubmit={handleSubmit} className='w-50 mx-auto my-5'>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Username :</label>
        <input type="text" name='username' value={user.username} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleChange}/>
        {errors && errors.username && <p className='text-danger'><small>{errors.username}</small></p>}
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">Password :</label>
        <input type="password" name='password' value={user.password} className="form-control" id="exampleInputPassword1" onChange={handleChange}/>
        {errors && errors.password && <p className='text-danger'><small>{errors.password}</small></p>}

      </div>
      <button type="submit" className="btn btn-primary">Login</button>
    </form>
    </>
  )
}

export default Login
