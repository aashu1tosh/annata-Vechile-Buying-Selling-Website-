import Navbar from '../../Components/Navbar/Navbar'
import './Home.css'
import ford from '../../assets/ford.avif'

function Home() {
    return (
        <>
            <Navbar />
            <div className='main-body'>
                <img src={ford} alt="" />
            </div>
        </>
    )
}

export default Home