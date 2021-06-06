// import {useState} from 'react'  //might need this in the future, but might use global state instead
import {useSelector,useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {IoLogOutOutline} from 'react-icons/io5'
import axios from 'axios'
import {setUser} from '../redux/authReducer'

const Header2 = () => {
    const {user} = useSelector(store=>store.auth)
    const dispatch = useDispatch()
    // console.log(user)

    const handleLogout = () => {
        axios.get('/login/logout')
        .then(()=>{
            // console.log(res)
            dispatch(setUser(null))
        }).catch(err=>console.log(err))
    }

    const loginCheck = () => {
        if(user){
            return(
                <div className="centerSearch">
                    <Link className="links profilelink" to="/profile"><p>{user.first_name} {user.last_name}</p></Link>
                    <button className="searchBtn adjLogout" onClick={handleLogout}><IoLogOutOutline className="iconLogout"/></button>
                </div>
            )
        }else{
            return(
                <Link to="/login"><button className="textBtn adjBtn">Login</button></Link>
            )
        }
    }

    return (
        <header className="userHead">
            {/* <img />  //website icon that routes the user to the home screen */}
            <Link className="links homelink" to="/"><h2>BiomechWeb</h2></Link>
            {loginCheck()}
            {/* <p>{user.first_name} {user.last_name}</p> */}
            {/* <img /> //profile image that links to the user profile */}
        </header>
    )
}

export default Header2