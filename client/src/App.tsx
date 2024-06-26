// import './App.css'
import {BrowserRouter, Routes, Route,} from 'react-router-dom'
import Login from './Pages/Login/Login'
import SignUp from './Pages/SignUp/SignUp'
import Home from './Pages/Home/Home'
import CarDetail from './Pages/HomeCustomer/CarDetail/CarDetail'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<SignUp />}></Route>
          <Route path='/' element={<Home />}></Route>
          <Route path='/cars/:id' element={ <CarDetail/>}></Route>
          <Route path='/*' element={<>Page Not Found</>}></Route>
          {/* <Route path='/' element={<ProtectedRoutes>
              <HomeCustomer />
          </ProtectedRoutes>}></Route> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}


export default App
