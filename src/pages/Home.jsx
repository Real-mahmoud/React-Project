import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

const Home = () => {
  let [products,setProducts]=useState([])
  let navigate=useNavigate()
  useEffect(()=>{
    async function getData(){
      let {data}=await axios.get("http://localhost:3000/products")
      setProducts(()=>data)
      console.log(products);
    }
    getData()

  },[])

  function showProductDetails (id){
    navigate(`/product/${id}`)
  }
  return (
    <> 
      <div className="container d-flex flex-wrap ">
        {products.map(product =>{
      return (
        <div key={product.id} className="container w-25 my-4">
          <div className="card" style={{width: "18rem"}}>
          <div className='overflow-hidden'>
            <img src={product.img} className="card-img-top" alt="..." style={{height:"300px"}}/>
          </div>
          <div className="card-body" >
              <h5 className="card-title fs-4">{product.name }</h5>
              <p className="card-text">{product.author}</p>
              <p className="card-text">{product.description}</p>
              <button onClick={()=>showProductDetails(product.id)} className="btn btn-primary">more Details</button>
          </div>
          </div>
        </div>
      )
    })

    }
      </div>
    </>
  )
}

export default Home
