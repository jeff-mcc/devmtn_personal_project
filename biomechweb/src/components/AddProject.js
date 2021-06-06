import {useState,useEffect} from 'react'
import Header2 from './Header2'
import axios from 'axios'
import {setProjectInfo,setDataInfo} from '../redux/projectReducer'
import {useSelector,useDispatch} from 'react-redux'
import Footer from './Footer'

const AddProject = (props) => {
    const [category1,setCat1] = useState('')
    const [category2,setCat2] = useState('')
    const [title,setTitle] = useState('')
    const [description,setDesc] = useState('')
    const {user} = useSelector(store=>store.auth)
    const dispatch = useDispatch()

    useEffect(()=>{
        if(!user){
            props.history.push('/')
        }
    },[user,props.history])

    const handleCreate = () => {
        axios.post('/data/folders',{title,description,category1,category2})
        .then(res=>{
            // console.log(res.data)
            dispatch(setProjectInfo(res.data))
            dispatch(setDataInfo(null))
            props.history.push(`/projectdata/${res.data.project_id}`)
        }).catch(err=>console.log(err))
    }

    return(
        <div className="handleCenter">
            <div className="content">
            <Header2 />
            <h2 className="banner">Create a New Project</h2>
            <h4>Project Title:</h4>
            <input maxLength="50" onChange={e=>setTitle(e.target.value)}/>
            <h4>Description:</h4>
            <textarea rows="6" cols="40" maxLength="1000" onChange={e=>setDesc(e.target.value)}></textarea>
            <p>Categories: <select value={category1} onChange={e=>setCat1(e.target.value)}>
                <option value=''>--Category 1--</option>
                <option value='Running'>Running</option>
                <option value='Sports &#38; Exercise'>Sports &#38; Exercise</option>
                <option value='Injuries'>Injuries</option>
                <option value='Upper Extremity'>Upper Extremity</option>
                <option value='Lower Extremity'>Lower Extremity</option>
                <option value='Ankle'>Ankle</option>
                <option value='Knee'>Knee</option>
                <option value='Hip'>Hip</option>
                <option value='Spine'>Spine</option>
                <option value='Neck'>Neck</option>
                <option value='Shoulder'>Shoulder</option>
                <option value='Arm &#38; Hand'>Arm &#38; Hand</option>
            </select><select value={category2} onChange={e=>setCat2(e.target.value)}>
                <option value=''>--Category 2--</option>
                <option value='Running'>Running</option>
                <option value='Sports &#38; Exercise'>Sports &#38; Exercise</option>
                <option value='Injuries'>Injuries</option>
                <option value='Upper Extremity'>Upper Extremity</option>
                <option value='Lower Extremity'>Lower Extremity</option>
                <option value='Ankle'>Ankle</option>
                <option value='Knee'>Knee</option>
                <option value='Hip'>Hip</option>
                <option value='Spine'>Spine</option>
                <option value='Neck'>Neck</option>
                <option value='Shoulder'>Shoulder</option>
                <option value='Arm &#38; Hand'>Arm &#38; Hand</option>
            </select></p>
            <button className="editUser" onClick={handleCreate}>Create Project</button>
            </div>
            <Footer />
        </div>
    )
}

export default AddProject