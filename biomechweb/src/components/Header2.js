// import {useState} from 'react'  //might need this in the future, but might use global state instead
import {useSelector} from 'react-redux'

const Header2 = () => {
    const {user} = useSelector(store=>store.auth)

    return (
        <header>
            {/* <img />  //website icon that routes the user to the home screen */}
            <h2>BiomechWeb</h2>
            <p>{user.first_name} {user.last_name}</p>
            {/* <img /> //profile image that links to the user profile */}
        </header>
    )
}

export default Header2