import Header from './Header'
import Footer from './Footer'
import {Link} from 'react-router-dom'

const Home = () => {
    return(
        <div className="handleCenter">
            <div className="content">
                <Header />
                <div className="imgContainer">
                    <img className="homeImg" src="https://via.placeholder.com/1000/B58981/9B2E45/?text=View+Data+On+BiomechWeb" alt="placeholder"></img>
                    <img className="homeImg" src="https://via.placeholder.com/1000/9B2E45/F5DCD5/?text=Sign+Up+For+An+Account" alt="placeholder"></img>
                    <img className="homeImg" src="https://via.placeholder.com/1000/8C544C/9B2E45/?text=Contribute+Data" alt="placeholder"></img>
                    <Link className="centerLinks" to="/data" ><button className="btnOne" >View Data</button></Link>
                    <Link className="centerLinks" to="/login" ><button className="btnTwo" >Sign Up</button></Link>
                    <Link className="centerLinks" to="/profile" ><button className="btnThree" >Contribute Data</button></Link>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Home