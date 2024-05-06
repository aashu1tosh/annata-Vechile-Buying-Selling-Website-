import axios from "../../services/instance";
import { useEffect, useState } from "react";
import HomeDealer from "../HomeDealer/HomeDealer";
import HomeCustomer from "../HomeCustomer/HomeCustomer";
import HomeAdmin from "../HomeAdmin/HomeAdmin";

function Home() {
    const [role, setRole] = useState<string>();

    useEffect(() => {
        axios.get('/users/home')
            .then((res) => {
                setRole(res.data.role);
            })
            .catch((error) => {
                console.error("Error fetching role:", error);
            });
    }, []);

    // Render conditionally based on the role state
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
