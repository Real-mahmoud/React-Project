import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import * as z from "zod"
import swal from 'sweetalert'
let bookSchema=z.object({
    name:z.string().min(4,"Book name must be more than 3"),
    author:z.string().min(4,"author must be more than 3"),
    category:z.string(),
    img:z.url(),
    description:z.string().min(21,"author must be more than 20"),
    longDescription:z.string().min(21,"author must be more than 20"),
    pdf:z.httpUrl()
})
const AddBook = () => {
    let [book,setBook]=useState({id:new Date(),name:"",category:"",author:"",img:"",description:"",longDescription:"",pdf:""})
    let [errors,setErrors]=useState({})
    let navigate=useNavigate()

    function handleChange (e){
        setBook({...book,[e.target.name]:e.target.value})
    }
    
    async function handleSubmit(e){
        e.preventDefault();
        let result=bookSchema.safeParse(book)
        if (!result.success) {
            let newErrors={};
            result.error.issues.map(err => newErrors[err.path[0]]=err.message)
            setErrors(newErrors)
            toast.error("failed adding book")
        }else {
            await axios.post("http://localhost:3000/products", book)
           setTimeout(() => {
             navigate("/")
           }, 2000);
            setErrors({})
            setBook({id:new Date(),name:"",category:"",author:"",img:"",description:"",longDescription:"",pdf:""})
            toast.success("Book is added successfully")
        }
    }
    
    return (
    <>
    <div className="container my-3 w-75">
            <form onSubmit={handleSubmit} style={{color:"white"}}>
    <fieldset >
        <legend className='text-center h2' style={{fontFamily:"cursive"}}>ADD NEW BOOK</legend>
        <div className="mb-3">
        <label htmlFor="disabledTextInput" className="form-label" >Book Name</label>
        <input type="text" id="disabledTextInput" className="form-control" style={{backgroundColor:"#838a8dff", color:"#242225ff"}} placeholder="Enter Book Name" value={book.name} name='name' onChange={handleChange}/>
        {errors && errors.name && <p><small className='text-danger'>{errors.name}</small></p>}
        </div>
        <div className="mb-3">
        <label htmlFor="disabledTextInput" className="form-label">Book Author</label>
        <input type="text" id="disabledTextInput" className="form-control" placeholder="EnterBook Author" style={{backgroundColor:"#838a8dff", color:"#242225ff"}}  value={book.author} name='author' onChange={handleChange}/>
        {errors && errors.author && <p><small className='text-danger'>{errors.author}</small></p>}
        
        </div>
        <div className="mb-3">
        <label htmlFor="disabledSelect" className="form-label" >Category</label>
        <select id="disabledSelect" className="form-select" value={book.category} name='category' style={{backgroundColor:"#838a8dff", color:"#242225ff"}}  onChange={handleChange}>

            <option value="none">none</option>
            <option value="Thriller">Thriller</option>
            <option value="Self-Help">Self-Help</option>
            <option value="Science Fiction">Science Fiction</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Dystopian">Dystopian</option>
            <option value="Memoir">Memoir</option>
        </select>
        </div>
         <div className="mb-3">
        <label htmlFor="disabledTextInput" className="form-label">Book Image</label>
        <input type="text" id="disabledTextInput" className="form-control" placeholder="Enter Book Image" style={{backgroundColor:"#838a8dff", color:"#242225ff"}}  value={book.img} name='img' onChange={handleChange}/>
        {errors && errors.img && <p><small className='text-danger'>{errors.img}</small></p>}
        
        </div>
         <div className="mb-3">
        <label htmlFor="disabledTextInput" className="form-label">Book Description</label>
        <input type="text" id="disabledTextInput" className="form-control" placeholder="Enter Book Description" style={{backgroundColor:"#838a8dff", color:"#242225ff"}}  value={book.description} name='description' onChange={handleChange}/>
        {errors && errors.description && <p><small className='text-danger'>{errors.description}</small></p>}
        
        </div>
         <div className="mb-3">
        <label htmlFor="disabledTextInput" className="form-label">Book long Description</label>
        <input type="text" id="disabledTextInput" className="form-control" placeholder="Enter Book long Description" style={{backgroundColor:"#838a8dff", color:"#242225ff"}}  value={book.longDescription} name='longDescription' onChange={handleChange}/>
        {errors && errors.longDescription && <p><small className='text-danger'>{errors.longDescription}</small></p>}
        
        </div>
         <div className="mb-3">
        <label htmlFor="disabledTextInput" className="form-label">Online PDF</label>
        <input type="text" id="disabledTextInput" className="form-control" placeholder="Enter Online PDF for book Book" style={{backgroundColor:"#838a8dff", color:"#242225ff"}}  value={book.pdf} name='pdf' onChange={handleChange}/>
        {errors && errors.pdf && <p><small className='text-danger'>{errors.pdf}</small></p>}
       
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
    </fieldset>
    </form>
    </div>
    </>
  )
}

export default AddBook
