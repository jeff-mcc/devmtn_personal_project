import Header from './Header'
import Footer from './Footer'

const Contact = () => {
    return(
        <div className="handleCenter">
            <div className="content">
                <Header />
                <h2 className="banner">Contact</h2>
                <div className="centerBox">
                    <p className="contactInfo">Email: email@email.email</p>
                    <p className="contactInfo">Phone: 555-555-5555</p>
                    <p className="contactInfo">Location: 1234 Anywhere St, Nowhere, NO 56789</p>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Contact