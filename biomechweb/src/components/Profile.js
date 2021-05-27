import {useSelector,useDispatch} from 'react-redux'
import Header2 from './Header2'
import axios from 'axios'
import {useState,useEffect} from 'react'
import {setProjectInfo,setDataInfo} from '../redux/projectReducer'
import {setUser} from '../redux/authReducer'

const Profile = (props) => {
    const [projects,setProjects] = useState([])
    const [editBool,setEditBool] = useState(false)
    const {user} = useSelector(store=>store.auth)
    const [email,setEmail] = useState(user.email)
    const [firstName,setFirstName] = useState(user.first_name)
    const [lastName,setLastName] = useState(user.last_name)
    const [institution,setInstitution] = useState(user.institution)
    // const {projectInfo} = useSelector(store=>store.projectInfo)
    const dispatch = useDispatch()
    const register = new RegExp('^[^s@]+@[^s@]+$')

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

    const submitEdit = () => {
        if(register.test(email)){
            const user_id = user.user_id
            // console.log(user_id)
            axios.put('/user/edit',{user_id,email,firstName,lastName,institution})
            .then(res=>{
                // console.log(res.data)
                dispatch(setUser(res.data))
                setEditBool(!editBool)
            }).catch(err=>console.log(err))
        }else{
            alert("Please enter a valid email")
        }
    }

    const createNew = () => {
        props.history.push('/add/project')
    }

    const editInfo = () => {
        if(editBool){
            return(
                <div>
                    <div>
                        <p>Email: <input value={email} onChange={(e)=>setEmail(e.target.value)}/></p>
                        <p>First Name: <input value={firstName} onChange={(e)=>setFirstName(e.target.value)}/></p>
                        <p>Last Name: <input value={lastName} onChange={(e)=>setLastName(e.target.value)}/></p>
                        <p>Institution: <input value={institution} onChange={(e)=>setInstitution(e.target.value)}/></p>
                    </div>
                    <button onClick={()=>setEditBool(!editBool)}>Cancel</button>
                    <button onClick={()=>submitEdit()}>Submit</button>
                </div>
            )
        }else{
            return(
                <div>
                    <div>
                        <p>Email: {user.email}</p>
                        <p>First Name: {user.first_name}</p>
                        <p>Last Name: {user.last_name}</p>
                        <p>Institution: {user.institution}</p>
                    </div>
                    <button onClick={()=>setEditBool(!editBool)}>Edit Information</button>
                </div>
            )
        }
    }
    
    return (
        <div>
            <Header2 />
            {editInfo()}
            {/* <div>
                <p>Email: {user.email}</p>
                <p>First Name: {user.first_name}</p>
                <p>Last Name: {user.last_name}</p>
                <p>Institution: {user.institution}</p>
            </div>
            <button onClick={()=>setEditBool(!editBool)}>Edit Information</button> */}
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
                <button className="createNew folderButton" onClick={createNew}>+</button>
            </div>
        </div>
    )
}

export default Profile