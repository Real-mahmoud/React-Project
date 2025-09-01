import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import Model from '../components/Model';
import { toast } from 'react-toastify';
import "../style.css"

const ProductDetails = () => {
    let [book,setBook]=useState({})
    let {id}=useParams()
    let navigate=useNavigate()
    console.log(id);
    useEffect(()=>{
        async function getData(){
            let {data}=await axios.get("http://localhost:3000/products/"+id)
            console.log(data);
            
            setBook(()=>data)
        }
        getData()
    },[id])
    function handleDelete(){
      swal({
        title: "Are you sure you want to delete?",
        text: "Once deleted, you will not be able to recover this Book!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then( async (willDelete) => {
        if (willDelete) {
          await axios.delete("http://localhost:3000/products/"+id)
          toast.success("Book delete successfully")
          setTimeout(() => {
             navigate("/")
          }, 2000);
          swal(" Book has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Book is safe!");
        }
      });
      
    }

    return (
    <>
      {book && 
      <div className="card mb-3 mx-5 my-5" style={{maxWidth: "55rem"}}>
      <div className="row g-0  ">
        <div className="col-md-4 overflow-hidden h-100">
          <img src={book.img} className="img-fluid rounded-start" alt="..."/>
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h1 className="card-title mb-3">{book.name }</h1>
            <h6 className="card-text">Author : {book.author}</h6>
            <p className="card-text lh-base">{book.description}</p>
            <p className="card-text lh-lg">{book.longDescription}</p>
            <button onClick={()=> navigate("/")} className="btn btn-primary mx-3 mt-2">Back To Products</button>
            <button onClick={()=>window.open(book.pdf)} className="btn btn-primary mx-3 mt-2">Read Book online</button>
            <button  className="btn btn-warning mx-3 mt-2"  data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
            <button  className="btn btn-danger mx-3 mt-2" onClick={handleDelete}>Delete</button>
            <Model/>
          </div>
        </div>
      </div>
    </div>

    }
    </>
  )
}

export default ProductDetails
