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
    const [email,setEmail] = useState('')
    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    const [institution,setInstitution] = useState('')
    // const {projectInfo} = useSelector(store=>store.projectInfo)
    const dispatch = useDispatch()
    const register = new RegExp('^[^s@]+@[^s@]+$')

    useEffect(()=>{
        if(user){
            setEmail(user.email)
            setFirstName(user.first_name)
            setLastName(user.last_name)
            setInstitution(user.institution)
            axios.get(`/data/folders/${user.user_id}`)
            .then(res=>{
                setProjects(res.data)
                // console.log(user.user_id)
            }).catch(err=>console.log(err))
        }else{
            props.history.push('/login')
        }
    },[user]) //or user.user_id

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
                <div className="userDetails">
                    <div className="userBox">
                        <p className="userInfo">Email: <input maxlength="50" value={email} onChange={(e)=>setEmail(e.target.value)}/></p>
                        <p className="userInfo">First Name: <input maxlength="30" value={firstName} onChange={(e)=>setFirstName(e.target.value)}/></p>
                        <p className="userInfo">Last Name: <input maxlength="30" value={lastName} onChange={(e)=>setLastName(e.target.value)}/></p>
                        <p className="userInfo institution">Institution: <input maxlength="100" value={institution} onChange={(e)=>setInstitution(e.target.value)}/></p>
                    </div>
                    <button className="userInfo editUser" onClick={()=>setEditBool(!editBool)}>Cancel</button>
                    <button className="userInfo editUser" onClick={()=>submitEdit()}>Submit</button>
                </div>
            )
        }else{
            return(
                <div className="userDetails">
                    <div className="userBox">
                        <p className="userInfo">Email: {email}</p>
                        <p className="userInfo">First Name: {firstName}</p>
                        <p className="userInfo">Last Name: {lastName}</p>
                        <p className="userInfo institution">Institution: {institution}</p>
                    </div>
                    <button className="userInfo editUser" onClick={()=>setEditBool(!editBool)}>Edit Information</button>
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
            <h3 className="titleHead">My Projects</h3>
            <div className="arrangeFolders">
                {projects.map(project=>{
                // console.log(project)
                    return(
                        <div className="arrangeTabs" key={project.project_id}>
                            <svg className="polySvg">
                                <polygon className="poly" points="0,0 0,12 50,12 44,0"/>
                            </svg>
                            <div className="folder">
                                <button className="folderButton" onClick={()=>clickFolder(project)}>{project.title}</button>
                            </div>
                        </div>
                    )
                })}
                <div className="arrangeTabs">
                    <svg className="polySvg">
                        <polygon className="poly" points="0,0 0,12 50,12 44,0"/>
                    </svg>
                    <div className="folder addNew">
                        <button className="createNew folderButton" onClick={createNew}>+</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile