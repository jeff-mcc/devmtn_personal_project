import {useSelector,useDispatch} from 'react-redux'
import Header2 from './Header2'
import axios from 'axios'
import {useState,useEffect} from 'react'
import {setProjectInfo,setDataInfo} from '../redux/projectReducer'

const Profile = (props) => {
    const [projects,setProjects] = useState([])
    const {user} = useSelector(store=>store.auth)
    // const {projectInfo} = useSelector(store=>store.projectInfo)
    const dispatch = useDispatch()

    useEffect(()=>{
        axios.get(`/data/folders/${user.user_id}`)
        .then(res=>{
            setProjects(res.data)
            // console.log(user.user_id)
        }).catch(err=>console.log(err))
    },[user.user_id])

    const clickFolder = (project) => {
        // console.log(project)
        axios.get(`/data/folders/projects/${project.project_id}`)
        .then(res=>{
            // console.log(res.data)
            // console.log(project)
            dispatch(setProjectInfo(project))
            dispatch(setDataInfo(res.data))
            props.history.push(`/projectdata/${project.project_id}`)
        }).catch(err=>console.log(err))
    }
    
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
                // console.log(project)
                return(
                    <div className="folder" key={project.project_id}>
                        <button className="folderButton" onClick={()=>clickFolder(project)}>{project.title}</button>
                    </div>
                )
            })}
            <div className="folder">
                <button className="createNew folderButton">+</button>
            </div>
        </div>
    )
}

export default Profile