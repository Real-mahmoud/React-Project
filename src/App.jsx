import { BrowserRouter,Route, Routes } from 'react-router'
import Default from './layouts/Default'
import Profile from './pages/Profile'
import Home from './pages/home'
import Login from './pages/login'
import Error from './pages/Error'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js"
import { ToastContainer } from 'react-toastify'
function App() {


  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path='/' element={<Default/>}>
          <Route index element={<Home/>}/>
          <Route path='/profile' element={<Profile/>}/>
        </Route>
          <Route path='/auth/login' element={<Login/>}/>
          <Route path='*' element={<Error/>}/>
          
      </Routes>
      <ToastContainer/>
     </BrowserRouter>
    </>
  )
}

export default App
