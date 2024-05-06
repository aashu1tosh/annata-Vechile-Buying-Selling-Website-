import { Link } from 'react-router-dom'
import './Navbar.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const Navbar = () => {
    return (
        <>
            <nav>

                <Link to='/'>Annata Auto's</Link>

                <div className="nav-right">
                    <ul>
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
                    </ul>
                </div>
            </nav>

            {/* Modal */}


        </>
    )
}

export default Navbar