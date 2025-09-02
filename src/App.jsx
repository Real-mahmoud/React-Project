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
    

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path='/' element={<Default isManagerLogIn={isManagerLogIn} />}>
          <Route index element={<Home/>}/>
          <Route path='/profile' element={<Profile setManagerState={setManagerState}/>}/>
          <Route path='/product/:id' element={<ProductDetails/>}/>
          <Route path='/product/new' element={<AddBook/>}/>
        </Route>
          <Route path='/auth/login' element={<Login setManagerState={setManagerState}/>}/>
          <Route path='*' element={<Error/>}/>
          
      </Routes>
      <ToastContainer/>
     </BrowserRouter>
    </>
  )
}

export default App
