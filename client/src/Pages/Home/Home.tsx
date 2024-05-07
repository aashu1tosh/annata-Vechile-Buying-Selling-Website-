import axios from "../../services/instance";
import { useEffect, useState } from "react";
import HomeDealer from "../HomeDealer/HomeDealer";
import HomeCustomer from "../HomeCustomer/HomeCustomer";
import HomeAdmin from "../HomeAdmin/HomeAdmin";

function Home() {
    const [role, setRole] = useState<string>();

    useEffect(() => {
        const token: string|null = localStorage.getItem('user');
        try {
        console.log("Request sent")
        axios.get('/user/auth', { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                console.log(res);
                setRole(res.data.user.role);
            })
            .catch((error) => {
                console.error("Error fetching role:", error);
            });
        } catch {
            console.log('home page try block failed')
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
            return <>Normal HomePage</>;
    }
}

export default Home;
