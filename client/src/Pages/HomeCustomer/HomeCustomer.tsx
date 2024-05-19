import { useEffect, useState } from 'react'
import './HomeCustomer.css'
import axios from './../../services/instance'
import { Link } from 'react-router-dom';


function HomeCustomer() {
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        const token = localStorage.getItem('user')
        axios.get('/car/getallcars', { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                console.log(res);
                setData(res.data.cars);
            })
    }, [])

    return (
        <>
            <div className='main-body'>
                {   
                    data.map((d, index) => (
                        <Link to={`/cars/${d._id}`} key={index}>
                        <div className="fetched-cars" >
                            <p>Year: {d.year}</p>
                            <p>Manufacturer: {d.manufacturer}</p>
                            <p>Model: {d.model}</p>
                            <p>Description: <br /> {d.description}</p>
                        </div>
                        </Link>
                    ))
                }
            </div>
        </>
    )
}

export default HomeCustomer