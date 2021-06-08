import Header from './Header'
import Footer from './Footer'

const Contact = () => {
    return(
        <div className="handleCenter">
            <div className="content">
                <Header />
                <h2 className="banner">Contact</h2>
                <div className="centerBox">
                    <p className="contactInfo">Email: reffery@gmail.com</p>
                    <p className="contactInfo contactLink">LinkedIn: &nbsp; <a className="contactLinkedIn" href="https://www.linkedin.com/in/jeffrey-mcclellan-phd/"><p className="marginSet">linkedin.com/in/jeffrey-mcclellan-phd/</p></a></p>
                    <p className="contactInfo">Location: Alpine, UT 84004</p>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Contact

// <p className="contactInfo">Phone: 555-555-5555</p>
// <p className="contactInfo">Location: 1234 Anywhere St, Nowhere, NO 56789</p>