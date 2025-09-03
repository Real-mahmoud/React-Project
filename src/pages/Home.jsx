import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import "../style.css"
import video from "../video/medium.mp4"
import { transform } from 'zod'
const Home = () => {
  let [products,setProducts]=useState([])
  let [search,setSearch]=useState("")
  let [category,setCategory]=useState("All")
  let navigate=useNavigate()
  useEffect(()=>{
    async function getData(){
      let {data}=await axios.get("http://localhost:3000/products")
      setProducts(()=>data)
    }
    getData()
  },[])

  function showProductDetails (id){
    navigate(`/product/${id}`)
  }
  function handleSearch(e){
    setSearch(e.target.value)
  }
  function handleSort(e){
    setCategory(e.target.value)
  }

  let filteredProducts= products.filter(product => {
    if (search=="") {
     return category =="All" ? true: product.category.includes(category)
    }else if (search!="") {
      if (category=="All") {
        return product.name.toLowerCase().includes(search)
      }else {
        // to search depend on the selected category
        return product.category.includes(category) && product.name.toLowerCase().includes(search)
      }
   
    }
  })

  
  return (
    <>  
    
    <div className=' overflow-hidden position-relative ' style={{maxHeight:"70vh"}}>
    <video src={video} autoPlay muted loop className=' w-100 object-fit-cover '  style={{objectPosition:"bottom",filter: "brightness(30%)",height:"70%"}}></video>
      <p className='welcome position-absolute bottom-50 end-50   ' style={{transform:"translate(50%)",color:"white"}}>Welcome To our Magazine...</p>
    </div>
      <div className='mx-3 my-4  row  justify-content-between'>
        
         <div className='col-12 col-md-6 col-lg-4'>
        <label htmlFor="in" className=" h6 me-2 fs-5 " style={{color:"white"}}>Search for Book</label>    
        <input id='in' className='w-100 border ' type="text" value={search} onChange={handleSearch} style={{backgroundColor:"#29444a86",color:"white"}}  />
         </div>
       <div className=' col-12 col-md-6 col-lg-4 ' >
         <label htmlFor="disabledSelect" className=" h6 me-2 fs-5  " style={{color:"white"}} >Sort by Category</label>    
        <select id="disabledSelect"  value={category} className='w-100 ' name='category '  onChange={handleSort}style={{backgroundColor:"#29444a86", color:"white"}}  >
          
            <option value="All" style={{backgroundColor:"#0b6c75ff"}}>All</option>
            <option value="Thriller" style={{backgroundColor:"#0b6775ff"}}>Thriller</option>
            <option value="Self-Help" style={{backgroundColor:"#0b6775ff"}}>Self-Help</option>
            <option value="Science Fiction"style={{backgroundColor:"#0b6775ff"}} >Science Fiction</option>
            <option value="Fantasy" style={{backgroundColor:"#0b6775ff"}}>Fantasy</option>
            <option value="Dystopian" style={{backgroundColor:"#0b6775ff"}}>Dystopian</option>
            <option value="Memoir" style={{backgroundColor:"#0b6775ff"}}>Memoir</option>
        </select>
       </div>
        {localStorage.getItem("token") && <button className='btn btn-primary  my-3 col-12 col-sm-6 col-lg-2' onClick={()=>navigate("/product/new")}>Add New Book</button>}
      </div>
      <div className="container  mx-auto row ">
        {filteredProducts.map(product =>{
      return (
        <div key={product.id} className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4 ">
          <div className="card" style={{maxWidth: "18rem"}}>
          <div className='overflow-hidden'>
            <img src={product.img} className="card-img-top" alt="..." style={{height:"300px"}}/>
          </div>
          <div className="card-body" >
              <h5 className="card-title fs-4">{product.name }</h5>
              <p className="card-text">{product.author}</p>
              <p className="card-text ">{product.description}</p>
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
