import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { toast } from 'react-toastify'

const Model = () => {
    let [book,setBook]=useState({name:"",category:"",author:"",img:"",description:"",longDescription:"",pdf:""})
    let [errors,setErrors]=useState({})
    let navigate=useNavigate()
    let {id}=useParams()

    useEffect(()=>{
            async function getData(){
            let {data}=await axios.get("http://localhost:3000/products/"+id)    
            setBook(()=>data)
        }
        getData()
    },[id])
    function handleChange (e){
        setBook({...book,[e.target.name]:e.target.value})
    }
    
    async function handleSubmit(e){
        e.preventDefault()
        await axios.put("http://localhost:3000/products/"+id, book)
        toast.success("Book Edit successfully")
        setBook({...book})
        setTimeout(() => {
            navigate("/")
        }, 1000);
        setErrors({})
        setBook({name:"",category:"",author:"",img:"",description:"",longDescription:"",pdf:""})
    }
  return (
    <>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
        <div className="modal-content">
        <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
            
            <form onSubmit={handleSubmit}>
    <fieldset >
        <legend className='text-center h2'>ADD NEW BOOK</legend>
        <div className="mb-3">
        <label htmlFor="disabledTextInput" className="form-label" >Book Name</label>
        <input type="text" id="disabledTextInput" className="form-control" placeholder="Disabled input" value={book.name} name='name' onChange={handleChange}/>
        {errors && errors.name && <p><small className='text-danger'>{errors.name}</small></p>}
        </div>
        <div className="mb-3">
        <label htmlFor="disabledTextInput" className="form-label">Book Author</label>
        <input type="text" id="disabledTextInput" className="form-control" placeholder="Disabled input" value={book.author} name='author' onChange={handleChange}/>
        {errors && errors.author && <p><small className='text-danger'>{errors.author}</small></p>}
        
        </div>
        <div className="mb-3">
        <label htmlFor="disabledSelect" className="form-label" >Category</label>
        <select id="disabledSelect" className="form-select" value={book.category} name='category' onChange={handleChange}>
            <option>Thriller</option>
            <option>Self-Help</option>
            <option>Science Fiction</option>
            <option>Fantasy</option>
            <option>Dystopian</option>
            <option>Memoir</option>
        </select>
        </div>
         <div className="mb-3">
        <label htmlFor="disabledTextInput" className="form-label">Book Image</label>
        <input type="text" id="disabledTextInput" className="form-control" placeholder="Disabled input" value={book.img} name='img' onChange={handleChange}/>
        {errors && errors.img && <p><small className='text-danger'>{errors.img}</small></p>}
        
        </div>
         <div className="mb-3">
        <label htmlFor="disabledTextInput" className="form-label">Book Description</label>
        <input type="text" id="disabledTextInput" className="form-control" placeholder="Disabled input" value={book.description} name='description' onChange={handleChange}/>
        {errors && errors.description && <p><small className='text-danger'>{errors.description}</small></p>}
        
        </div>
         <div className="mb-3">
        <label htmlFor="disabledTextInput" className="form-label">Book long Description</label>
        <input type="text" id="disabledTextInput" className="form-control" placeholder="Disabled input" value={book.longDescription} name='longDescription' onChange={handleChange}/>
        {errors && errors.longDescription && <p><small className='text-danger'>{errors.longDescription}</small></p>}
        
        </div>
         <div className="mb-3">
        <label htmlFor="disabledTextInput" className="form-label">Online PDF</label>
        <input type="text" id="disabledTextInput" className="form-control" placeholder="Disabled input" value={book.pdf} name='pdf' onChange={handleChange}/>
        {errors && errors.pdf && <p><small className='text-danger'>{errors.pdf}</small></p>}
       
        </div>
           <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" >Edit</button>
        </div>
    </fieldset>
    </form>
        </div>
        </div>
    </div>
    </div>
    </>
  )
}

export default Model
