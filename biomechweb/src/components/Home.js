import Header from './Header'
import Footer from './Footer'

const Home = () => {
    return(
        <div className="handleCenter">
            <div className="content">
                <Header />
                <br></br>
                <p>text to fill up space in the middle of the page</p>
                <br></br>
            </div>
            <Footer />
        </div>
    )
}

export default Home