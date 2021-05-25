import {useSelector} from 'react-redux'
import Header2 from './Header2'
import axios from 'axios'
import {useState,useEffect} from 'react'

const Profile = () => {
    const [projects,setProjects] = useState([])
    const {user} = useSelector(store=>store.auth)

    useEffect(()=>{
        axios.get(`/data/folders/${user.user_id}`)
        .then(res=>{
            setProjects(res.data)
            // console.log(res.data)
        }).catch(err=>console.log(err))
    },[user.user_id])
    
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
            {projects.map(project=>{
                return(
                    <div key={project.project_id}>
                        <h5>{project.title}</h5>
                    </div>
                )
            })}
            <h5>+</h5>
        </div>
    )
}

export default Profile