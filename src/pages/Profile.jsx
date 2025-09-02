import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import myImg from "../images/profile.jpg"
import swal from 'sweetalert';

const Profile = ({setManagerState}) => {
    let [user,setUser]=useState({})
    let [details,setDetails]=useState(false)
    let navigate=useNavigate()
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

    function handleLogOut (){
        swal({
            title: "Are you sure you want to log out?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                localStorage.removeItem("token");
                setManagerState(false)
                setTimeout(() => {
                navigate("/")
                }, 1000);
            swal("You have logged out Successfully!", {
                icon: "success",
            });
            }
        });

    }
   
  return (
   <>
    <div className="container">
        <div className="card mx-auto mt-5" style={{width: "18rem"}}>
            <div className='overflow-hidden'>
            <img src={myImg} className="card-img-top " alt="..."/>

            </div>
        <div className="card-body">
            <h5 className="card-title">Mahmoud Khaled </h5>
            <p className="card-text">ITI trainee </p>
            <p className="card-text"><b>Email</b> : mahmoudkhaled220@gmail.com</p>

            {details && 
            (<>
            <p className="card-text"><b>Education</b> : Zagazig university (CSE)</p>
            <div className='d-flex justify-content-around mb-2 '>
                <i class="fa-brands fa-linkedin  fs-1 mb-2 text-primary" ></i>
            <i class="fa-solid fa-envelope  fs-1 mb-2 text-primary"></i>
            <i class="fa-brands fa-github fs-1 mb-2 "></i>

            </div>
            </>)
            
            }
            <div className='d-flex justify-content-around'>
                {details ? <button  className="btn btn-primary" onClick={()=> setDetails(false)}>less Details</button>:<button className="btn btn-primary" onClick={()=> setDetails(true)}>more Details</button>}
                <button className='btn btn-danger' onClick={handleLogOut}> Sign out</button>
            </div>
            
        </div>
        </div>
    </div>
   </>
  )
}

export default Profile
