import {Link} from 'react-router-dom'

const Header = () => {
    return(
        <header>
            <Link to="/">Home</Link>
            <Link to="/data">View Data</Link>
            {/* <Link to="/about">About</Link> */}
            {/* <Link to="/contact">Contact</Link> */}
            <Link to="/login">Login/Signup</Link>
        </header>
    )
}

export default Header