// import {useState} from 'react'  //might need this in the future, but might use global state instead
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'

const Header2 = () => {
    const {user} = useSelector(store=>store.auth)
    // console.log(props)

    const loginCheck = () => {
        if(user){
            return(
                <Link to="/profile"><p>{user.first_name} {user.last_name}</p></Link>
            )
        }else{
            return(
                <Link to="/login"><button>Login</button></Link>
            )
        }
    }

    return (
        <header className="userHead">
            {/* <img />  //website icon that routes the user to the home screen */}
            <Link className="links" to="/"><h2>BiomechWeb</h2></Link>
            {loginCheck()}
            {/* <p>{user.first_name} {user.last_name}</p> */}
            {/* <img /> //profile image that links to the user profile */}
        </header>
    )
}

export default Header2