import {useSelector} from 'react-redux'
import Header2 from './Header2'

const Profile = () => {
    const {user} = useSelector(store=>store.auth)

    // console.log(user)
    return (
        <div>
            <Header2 />
            <div>
                <p>Email: {user.email}</p>
                <p>First Name: {user.first_name}</p>
                <p>Last Name: {user.last_name}</p>
                <p>Institution: {user.institution}</p>
            </div>
            <button>Edit Information</button>
            <h3>My Projects</h3>
        </div>
    )
}

export default Profile