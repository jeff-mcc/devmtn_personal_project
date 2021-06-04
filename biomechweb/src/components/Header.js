import {Link} from 'react-router-dom'

const Header = () => {
    return(
        <header className="userHead">
            <Link className="links homelink" to="/"><h2>BiomechWeb</h2></Link>
            <div className="menu">
                {/* <Link to="/">Home</Link> */}
                <Link className="links menulinks" to="/data">View Data</Link>
                <Link className="links menulinks" to="/about">About</Link>
                <Link className="links menulinks" to="/contact">Contact</Link>
                <Link className="links menulinks" to="/login">Login/Signup</Link>
            </div>
        </header>
    )
}

export default Header