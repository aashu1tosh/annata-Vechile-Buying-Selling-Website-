import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'
import 'bootstrap/dist/css/bootstrap.min.css'

interface NavbarProps {
    role?: string; // The '?' indicates that the prop is optional
}

const Navbar: React.FC<NavbarProps>  = ({role}) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    }
    return (
        <>
            <nav>

                <Link to='/'>Annata Auto's</Link>

                <div className="nav-right">
                    <ul>
                        {role && (
                            <>
                                <li>{role}</li>
                                <li><button onClick={handleLogout} className='logout-button'>Logout</button></li>
                            </>

                        )}
                        {!role && (
                            <>
                                <Link to='/login'>
                                    <li>
                                        LogIn
                                    </li>
                                </Link>

                                <Link to='/signup'>
                                    <li>
                                        Sign Up
                                    </li>
                                </Link>
                            </>
                        )}

                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar