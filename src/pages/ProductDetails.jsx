import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

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
            <button onClick={()=> navigate("/")} className="btn btn-primary">Back To Products</button>

          </div>
        </div>
      </div>
    </div>

    }
     {/* {product && <div  className="container w-25 my-4">
          <div className="card" style={{width: "18rem"}}>
          <div className='overflow-hidden'>
            <img src={product.img} className="card-img-top" alt="..." style={{height:"300px"}}/>
          </div>
          <div className="card-body" >
              <h5 className="card-title fs-4">{product.name }</h5>
              <p className="card-text">{product.author}</p>
              <p className="card-text">{product.description}</p>
              <button  className="btn btn-primary">more Details</button>
          </div>
          </div>
        </div>} */}
    </>
  )
}

export default ProductDetails
