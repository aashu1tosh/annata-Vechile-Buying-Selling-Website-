import './App.css'
import {BrowserRouter, Routes, Route,} from 'react-router-dom'
import Login from './Pages/Login/Login'
import SignUp from './Pages/SignUp/SignUp'
import Home from './Pages/HomeCustomer/HomeCustomer'
// import HomeCustomer from './Pages/HomeCustomer/HomeCustomer'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<SignUp />}></Route>
          <Route path='/' element={<Home />}></Route>
          {/* <Route path='/' element={<ProtectedRoutes>
              <HomeCustomer />
          </ProtectedRoutes>}></Route> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

// export function ProtectedRoutes(props: { children: any }) {

//   if(localStorage.getItem('user')) {
//     return props.children
//   } else {
//     return <Navigate to='/login'/>
//   }
// }


export default App
