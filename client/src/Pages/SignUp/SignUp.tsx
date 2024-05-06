import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar"
import axios from "../../services/instance";

import './SignUp.css'


function SignUp() {
    const navigate = useNavigate();

    const [result, setResult] = useState<string>();
    const [name, setName] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [dealer, setDealer] = useState<boolean>();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log(name, email, password);
        let role: string | undefined ;
        if(dealer) {
            role = 'dealer'
        } else {
            role = 'customer'
        }
        console.log('role is ', role)
        await axios.post('/user/signup', { name, email, password, role})
            .then(result => {
                console.log(result);
                setResult(result.data.message);
                navigate('/login')
            })
            .catch(error => {
                console.log(error);
                setResult("Something went Wrong")
            })
    }

    return (
        <>
            <Navbar></Navbar>
            <div className="main-signup-form">

                <div className="main-signup">
                    <h1>Sign Up</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="">Full Name:</label><br />
                        <input type="text" onChange={(e) => { setName(e.target.value) }} /><br />

                        <label >Email Address:</label><br />
                        <input type="email" onChange={(e) => { setEmail(e.target.value) }} /><br />

                        <label htmlFor="">Password</label><br />
                        <input type="password" onChange={(e) => { setPassword(e.target.value) }} /><br />

                        {/* <div>
                            <p>Dealer or Customer:</p>
                            <input type="radio" id="dealer" name="fav_language" defaultValue="HTML" />
                            <label htmlFor="dealer">HTML</label><br />
                            <input type="r" id="custome" name="fav_language" defaultValue="CSS" />
                            <label htmlFor="css">CSS</label><br />
                            <input type="radio" id="javascript" name="fav_language" defaultValue="JavaScript" />
                            <label htmlFor="javascript">JavaScript</label>
                        </div> */}

                        <div className="role">
                            <label htmlFor="dealer">Dealer: </label>
                            <input type="radio" name="role" id="dealer" onChange={e => setDealer(e.target.checked)}/>
                            <label htmlFor="customer" style={{paddingLeft: '10px'}}> Customer: </label>
                            <input type="radio" style={{}} name="role" id="customer" defaultChecked />
                        </div>

                        <button type="submit">Signup</button>
                    </form>
                    {result && result}
                </div>

            </div>
        </>
    )
}

export default SignUp