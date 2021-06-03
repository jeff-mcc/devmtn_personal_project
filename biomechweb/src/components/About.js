import Header from './Header'
import Footer from './Footer'

const About = () => {
    return(
        <div className="handleCenter">
            <div className="content">
                <Header />
                <h2 className="banner">About Us</h2>
                <div className="centerBox">
                    <p className="textBox">This project came about due to the desire to create a platform in which Biomechanical data could be viewed and shared more readily by those in acadaemia as well as within the public at large.<br/><br/>In the past, data has been difficult to share between researchers that do not have a personal connection with one another, while it has also been difficult to view data on mobile platforms. This project aims to fix both of those problems.<br/><br/>Gone are the days in which only researchers with large, well funded labs have the ability to collect and process Biomechanics data!<br/><br/>We welcome you to create a free account so that you can join the movement to allow anyone, anywhere to view and learn more about the human body.</p>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default About