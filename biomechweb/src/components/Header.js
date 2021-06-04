import {Link} from 'react-router-dom'
import {useState} from 'react'

const Header = () => {
    const [menuBool,setMenuBool] = useState(false)

    const handleBool = () => {
        setMenuBool(!menuBool)
        // console.log(menuBool)
    }

    return(
        <header className="userHead">
            <Link className="links homelink" to="/"><h2>BiomechWeb</h2></Link>
            <div className={menuBool ? "menu openMenu" : "menu"}>
                <button className={menuBool ? "openClose open" : "openClose"} onClick={handleBool}>X</button>
                <div className={menuBool ? "showBurger closeBurger" : "showBurger"}>_<p className="break"></p>_<p className="break"></p>_</div>
                <Link className={menuBool ? "links menulinks openMenuLinks" : "links menulinks"} to="/data">View Data</Link>
                <Link className={menuBool ? "links menulinks openMenuLinks" : "links menulinks"} to="/about">About</Link>
                <Link className={menuBool ? "links menulinks openMenuLinks" : "links menulinks"} to="/contact">Contact</Link>
                <Link className={menuBool ? "links menulinks openMenuLinks" : "links menulinks"} to="/login">Login/Signup</Link>
            </div>
        </header>
    )
}

export default Header