import Header from './Header'
import Footer from './Footer'
import {Link} from 'react-router-dom'

const Home = () => {
    return(
        <div className="handleCenter">
            <div className="content">
                <Header />
                <div className="imgContainer">
                    <img className="homeImg" src="https://storage.googleapis.com/biomechweb/fitsum-admasu-oGv9xIl7DkY-unsplash.jpg" alt="running"></img>
                    <img className="homeImg" src="https://storage.googleapis.com/biomechweb/mehmet-turgut-kirkgoz-yPPu9FBmTQ0-unsplash.jpg" alt="x-ray"></img>
                    <img className="homeImg" src="https://storage.googleapis.com/biomechweb/thisisengineering-raeng-4w0XkDe2Ee8-unsplash.jpg" alt="prosthetic"></img>
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

// Photo by <a href="https://unsplash.com/@thisisengineering?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">ThisisEngineering RAEng</a> on <a href="https://unsplash.com/s/photos/biomedical-engineering?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

// https://storage.googleapis.com/biomechweb/thisisengineering-raeng-4w0XkDe2Ee8-unsplash.jpg

// https://via.placeholder.com/1000/8C544C/9B2E45/?text=Contribute+Data


// Photo by <a href="https://unsplash.com/@fitmasu?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Fitsum Admasu</a> on <a href="https://unsplash.com/s/photos/exercise?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

// https://storage.googleapis.com/biomechweb/fitsum-admasu-oGv9xIl7DkY-unsplash.jpg

// https://via.placeholder.com/1000/B58981/9B2E45/?text=View+Data+On+BiomechWeb


// Photo by <a href="https://unsplash.com/@tkirkgoz?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Mehmet Turgut Kirkgoz</a> on <a href="https://unsplash.com/s/photos/injuries?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

// https://storage.googleapis.com/biomechweb/mehmet-turgut-kirkgoz-yPPu9FBmTQ0-unsplash.jpg

// https://via.placeholder.com/1000/9B2E45/F5DCD5/?text=Sign+Up+For+An+Account
  