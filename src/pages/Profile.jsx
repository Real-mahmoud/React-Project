import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Profile = () => {
    let [user,setUser]=useState({})
    useEffect(()=>{
        async function getData() {
            let {data}=await axios.get('https://dummyjson.com/auth/me',{
                headers : {
                    Authorization : `Bearer ${localStorage.getItem("token")}`
                }
            })            
            setUser(data);   
        }
        getData();
    },[])

  return (
   <>
    <div className="container">
        <div className="card mx-auto mt-5" style={{width: "18rem"}}>
        <img src={user.image} className="card-img-top" alt="..."/>
        <div className="card-body">
            <h5 className="card-title">{user.firstName } {user.lastName}</h5>
            <p className="card-text">{user.email}</p>
            <a href="#" className="btn btn-primary">more Details</a>
        </div>
        </div>
    </div>
   </>
  )
}

export default Profile
