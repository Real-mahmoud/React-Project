import { BrowserRouter,Route, Routes } from 'react-router'
import Default from './layouts/Default'
import Profile from './pages/Profile'
import Home from './pages/Home'
import Login from './pages/Login'
import Error from './pages/Error'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js"
import { ToastContainer } from 'react-toastify'
import ProductDetails from './pages/ProductDetails.jsx'
import AddBook from './pages/AddBook.jsx'
import { useState } from 'react'
function App() {
  // only one manager (emilys) and check this and use principle (lift state up) to give the state to login and profile that contain logout and change the state in each one
  let [isManagerLogIn,setManagerState]= useState(!!localStorage.getItem("token"))
  let [loading,setLoading]=useState(true)
  setTimeout(() => {
    setLoading(false)

  }, 2500);
  return (
    <>
    {loading &&
        <div className='d-flex justify-content-center align-items-center' style={{backgroundImage:"linear-gradient(to right ,rgba(45, 51, 54, 1),rgba(14, 44, 63, 1))",minHeight:"100vh"}}>
        <div className="spinner-border text-info " style={{width: "4rem", height: "4rem"}} role="status">
        <span className="visually-hidden ">Loading...</span>
        </div>
      </div> 
      }
     {!loading &&
     <BrowserRouter>
      <Routes>
        <Route path='/' element={<Default isManagerLogIn={isManagerLogIn} />}>
          <Route index element={<Home/>}/>
          <Route path='/profile' element={<Profile setManagerState={setManagerState}/>}/>
          <Route path='/product/:id' element={<ProductDetails/>}/>
          <Route path='/product/new' element={<AddBook/>}/>
          <Route path='*' element={<Error/>}/>
        </Route>
          <Route path='/auth/login' element={<Login setManagerState={setManagerState}/>}/>
          
      </Routes>
      <ToastContainer/>
     </BrowserRouter>
     }
    </>
  )
}

export default App
