import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar"
import axios from "../../services/instance";


const Login = () => {

  const navigate = useNavigate();

  const [result, setResult] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(email)
    await axios.post('/user/login', {email, password})
      .then(result => {
        console.log('success')
        console.log(result);
        localStorage.setItem("user",  result.data.token);
        navigate('/');
      })
      .catch(error => {
        console.log(error);
        setResult("Something went Wrong")
      })
  }
  return (
    <>
      <>
        <Navbar></Navbar>
        <div className="main-signup-form">

          <div className="main-signup">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>

              <label >Email Address:</label><br />
              <input type="email" onChange={(e) => { setEmail(e.target.value) }} /><br />

              <label htmlFor="">Password</label><br />
              <input type="password" onChange={(e) => { setPassword(e.target.value) }} /><br />

              <button type="submit">Login</button>
            </form>
            {result && result}
          </div>

        </div>
      </>
    </>
  )
}

export default Login