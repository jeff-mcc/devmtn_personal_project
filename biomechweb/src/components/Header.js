import {Link} from 'react-router-dom'

const Header = () => {
    return(
        <header className="userHead">
            <Link className="links" to="/"><h2>BiomechWeb</h2></Link>
            <div>
                {/* <Link to="/">Home</Link> */}
                <Link className="links" to="/data">View Data</Link>
                <Link className="links" to="/about">About</Link>
                <Link className="links" to="/contact">Contact</Link>
                <Link className="links" to="/login">Login/Signup</Link>
            </div>
        </header>
    )
}

export default Header