import axios from '../../../services/instance';
import { useEffect, useState } from 'react';
import './CarDetail.css'
import { useParams } from 'react-router-dom'

const CarDetail = () => {
    const [cars, setCars] = useState<any>([]);
    const [user, setUser] = useState<any>([]);
    const { id } = useParams();

    useEffect(() => {
        const token = localStorage.getItem('user')
        axios.get(`/car/${id}`, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                console.log(res.data);
                setCars(res.data.cars);
                setUser(res.data.user);
                console.log(cars);
                console.log(user);
            })
            .catch((error) => {
                console.log("failed in axios.get", error)
            })
    }, [])

    return (
        <div className='main-body'>
            <div className="fetched-cars" >
                <p>{cars.year}</p>
                <p>{cars.manufacturer}</p>
                <p>{cars.model}</p>
                <p>{cars.description}</p>
                <p>Dealers Name: {user.name}</p>
                <p>Dealers Email: {user.email}</p>
            </div>
        </div>
    )
}

export default CarDetail