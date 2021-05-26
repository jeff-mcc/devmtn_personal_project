// import {useState} from 'react'  //might need this in the future, but might use global state instead
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'

const Header2 = () => {
    const {user} = useSelector(store=>store.auth)
    // console.log(props)

    const loginCheck = () => {
        if(user){
            return(
                <p>{user.first_name} {user.last_name}</p>
            )
        }else{
            return(
                <Link to="/login"><button>Login</button></Link>
            )
        }
    }

    return (
        <header>
            {/* <img />  //website icon that routes the user to the home screen */}
            <h2>BiomechWeb</h2>
            {loginCheck()}
            {/* <p>{user.first_name} {user.last_name}</p> */}
            {/* <img /> //profile image that links to the user profile */}
        </header>
    )
}

export default Header2