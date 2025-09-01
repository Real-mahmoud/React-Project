import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Profile = () => {
    let [user,setUser]=useState({})
    let [details,setDetails]=useState(false)
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

   console.log(user);
   
  return (
   <>
    <div className="container">
        <div className="card mx-auto mt-5" style={{width: "18rem"}}>
            <div className='overflow-hidden'>
            <img src="https://tse2.mm.bing.net/th/id/OIP.JfAxoJUkUVDPebSuYkxACQHaHa?r=0&pid=ImgDet&w=207&h=207&c=7&dpr=1.6&o=7&rm=3" className="card-img-top " alt="..."/>

            </div>
        <div className="card-body">
            <h5 className="card-title">{user.firstName } {user.lastName}</h5>
            <p className="card-text"><b>Age</b> :{user.age}</p>

            {details && 
            (<>
            <p className="card-text"><b>Email</b> :{user.email}</p>
            <p className="card-text"><b>University</b> :{user.university}</p>

            </>)
            
            }
            {details ? <a href="#" className="btn btn-primary" onClick={()=> setDetails(false)}>less Details</a>:<a href="#" className="btn btn-primary" onClick={()=> setDetails(true)}>more Details</a>}
        </div>
        </div>
    </div>
   </>
  )
}

export default Profile
