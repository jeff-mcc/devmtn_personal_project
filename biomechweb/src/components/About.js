import Header from './Header'
import Footer from './Footer'
import {SiPostgresql} from 'react-icons/si'
import {SiJavascript} from 'react-icons/si'
import {SiReact} from 'react-icons/si'
// import {FaNodeJs} from 'react-icons/fa'
import {SiRedux} from 'react-icons/si'
import {SiHtml5} from 'react-icons/si'
import {SiCss3} from 'react-icons/si'

const About = () => {

    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
      }
    window.onbeforeunload()

    return(
        <div className="handleCenter">
            <div className="content">
                <Header />
                <h2 className="banner">About</h2>
                <div className="centerBox">
                    <p className="textBox">This project came about due to the desire to create a platform in which Biomechanical data could be viewed and shared more readily by those in acadaemia as well as within the public at large.<br/><br/>In the past, data has been difficult to share between researchers that do not have a personal connection with one another, while it has also been difficult to view data on mobile platforms. This project aims to fix both of those problems.<br/><br/>Gone are the days in which only researchers with large, well funded labs have the ability to collect and process Biomechanics data!<br/><br/>We welcome you to create a free account so that you can join the movement to allow anyone, anywhere to view and learn more about the human body.<br/><br/><br/></p><div className="line"></div><p className="textBox"><br/><br/>Some of the technologies used to create this website can be viewed below</p>
                </div>
                <SiJavascript className="aboutIcons"/>
                <SiReact className="aboutIcons"/>
                <SiPostgresql className="aboutIcons"/>
                <SiRedux className="aboutIcons"/>
                <SiHtml5 className="aboutIcons"/>
                <SiCss3 className="aboutIcons"/>
                {/* <FaNodeJs /> */}
            </div>
            <Footer />
        </div>
    )
}

export default About