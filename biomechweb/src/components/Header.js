import {Link} from 'react-router-dom'
import {useState} from 'react'

const Header = () => {
    const [menuBool,setMenuBool] = useState(false)

    const handleBool = () => {
        setMenuBool(!menuBool)
        console.log(menuBool)
    }

    return(
        <header className="userHead">
            <Link className="links homelink" to="/"><h2>BiomechWeb</h2></Link>
            <div className="menu">
                <button className="openClose" onClick={handleBool}>X</button>
                <Link className="links menulinks" to="/data">View Data</Link>
                <Link className="links menulinks" to="/about">About</Link>
                <Link className="links menulinks" to="/contact">Contact</Link>
                <Link className="links menulinks" to="/login">Login/Signup</Link>
            </div>
        </header>
    )
}

export default Header