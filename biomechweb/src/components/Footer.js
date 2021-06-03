import {Link} from 'react-router-dom'

const Footer = () => {
    return(
        <div className="mainFooter">
            <div className="footDiv">
                <Link className="links" to="/about"><p>About BiomechWeb</p></Link>
                <Link className="links" to="/contact"><p>Contact</p></Link>
                <Link className="links" to="/bio"><p>Creator Bio</p></Link>
            </div>
        </div>
    )
}

export default Footer