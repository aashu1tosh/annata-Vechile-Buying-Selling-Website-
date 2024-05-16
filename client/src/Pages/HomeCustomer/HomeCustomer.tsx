import { useEffect, useState } from 'react'
import './HomeCustomer.css'
import axios from './../../services/instance'


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
                        <div className="" key={index}>
                            <p>{d.year}</p>
                            <p>{d.manufacturer}</p>
                            <p>{d.model}</p>
                            <p>{d.description}</p>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default HomeCustomer