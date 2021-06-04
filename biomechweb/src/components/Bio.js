import Header from './Header'
import Footer from './Footer'

const Bio = () => {
    return(
        <div className="handleCenter">
            <div className="content">
                <Header />
                <h2 className="banner">Creator Bio</h2>
                <h4 id="me">Jeffrey McClellan, PhD</h4>
                <div className="centerBox">
                    <p className="textBox">I believe that in order to truly know a person you must understand what motivates them. So, what motivates me? First and foremost, I love learning, and I am passionate about health and the human body. It was because of this that I chose to obtain graduate degrees in Biomechanics. These experiences also helped me to learn more about myself. I learned that I really enjoy creating things. Some of the most enjoyable portions of my dissertation research involved time that I spend creating musculoskeletal and finite element models of the human body.<br/><br/>But... then came the question following graduation, what next? For many that answer is simple, but unfortunately for me it wasn't. Eventually I decided to take a web development bootcamp, and I created this website as a personal project to showcase what I was learning, to combine the knowledge that I had gained in the bootcamp and in grad school.<br/><br/>Outside of my work as a scientist and web developer, I have an awesome family which I love, a bunch of chickens, and I find enjoyment as I run with my kids through the streets (and trails) of my home town.<br/><br/>If you are interested in collaborating with me on any projects, please reach out via the information provided on the contact page.</p>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Bio