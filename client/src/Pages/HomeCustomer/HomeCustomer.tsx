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

    const arrayBufferToBase64 = (buffer: any) => {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    };

    return (
        <>
            <div className='main-body'>
                {
                    data.map((d, index) => {
                        const base64Image = `data:${d.image.contentType};base64,${arrayBufferToBase64(d.image.data.data)}`;
                        return (
                            <Link to={`/cars/${d._id}`} key={index}>
                                <div className="fetched-cars">
                                    <img src={base64Image} alt={`${d.manufacturer} ${d.model}`} style={{ width: '200px', height: 'auto' }} />
                                    <p>Year: {d.year}</p>
                                    <p>Manufacturer: {d.manufacturer}</p>
                                    <p>Model: {d.model}</p>
                                    <p>Description: <br /> {d.description}</p>
                                </div>
                            </Link>
                        );
                    })
                }
            </div>

        </>
    )
}

export default HomeCustomer