import axios from "../../services/instance";
import { useEffect, useState } from "react";
import HomeDealer from "../HomeDealer/HomeDealer";
import HomeCustomer from "../HomeCustomer/HomeCustomer";
import HomeAdmin from "../HomeAdmin/HomeAdmin";
import Navbar from "../../Components/Navbar/Navbar";

function Home() {
    const [role, setRole] = useState<string>();

    useEffect(() => {
        const token: string|null = localStorage.getItem('user');
        try {
        console.log("Request sent")
        axios.get('/user/role', { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                console.log(res);
                setRole(res.data.role);
            })
            .catch((error) => {
                console.log("Error fetching role:", error);
            });
        } catch {
            console.log('Home page try block failed');
        }
    });

    switch (role) {
        case 'dealer':
            return <HomeDealer />;
        case 'customer':
            return <HomeCustomer />;
        case '_admin':
            return <HomeAdmin />;
        default:
            return <><Navbar />Normal HomePage</>;
    }
}

export default Home;
