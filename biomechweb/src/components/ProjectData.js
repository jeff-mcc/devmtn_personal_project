import {useSelector,useDispatch} from 'react-redux'
import Header2 from './Header2'
import {useState,useEffect} from 'react'
import axios from 'axios'
import {setProjectInfo,setDataInfo} from '../redux/projectReducer'
import GraphData from './GraphData'
import Footer from './Footer'
import {IoCaretForwardSharp} from 'react-icons/io5'
import {IoCaretDownSharp} from 'react-icons/io5'

const ProjectData = (props) => {
    const {projectInfo,dataInfo,finishedBool} = useSelector(store=>store.projectInfo)
    const {user} = useSelector(store=>store.auth)
    let viewArray = [];
    // console.log(dataInfo)
    if(dataInfo){
        for (let i=0;i<dataInfo.length;i++){
            viewArray.push(false)
        }
    }
    const [editBool,setEditBool] = useState(false)
    const [view,setView] = useState(viewArray)
    const [data,setData] = useState([])
    const [category1,setCat1] = useState(projectInfo.category1)
    const [category2,setCat2] = useState(projectInfo.category2)
    const [title,setTitle] = useState(projectInfo.title)
    const [description,setDesc] = useState(projectInfo.description)
    const dispatch = useDispatch()
    // console.log(projectInfo)
    // console.log(dataInfo)
    // console.log(window)

    useEffect(()=>{
        axios.get(`/data/folders/data/${projectInfo.project_id}`)
        .then(res=>{
            setData(res.data)
        }).catch(err=>console.log(err))
    },[projectInfo.project_id,finishedBool]) // ,dataInfo.length

    const updateView = (idx) => {
        let newView = [...view];
        newView[idx] = !newView[idx]
        setView(newView)
        // console.log(view)
    }

    const renderEdit = () => {
        // console.log(user)
        if(user){
            if(user.user_id===projectInfo.owner_id){
                return(
                    <button className="editProject" onClick={()=>setEditBool(!editBool)}>Edit Project Details</button>
                )
            }
        }
    }

    const handleAddData = () => {
        props.history.push("/add/data")
    }

    const handleDeleteProject = () => {
        axios.delete(`/data/folders/${projectInfo.project_id}`)
        .then(()=>{
            props.history.push('/profile')
        }).catch(err=>console.log(err))
    }

    const renderAddData = () => {
        if(user){
            if(user.user_id===projectInfo.owner_id){
                if(dataInfo){
                    if(dataInfo.length===0){
                        return(
                            <div className="addBorder">
                                <button className="editProject" onClick={handleDeleteProject}>Delete Project</button>
                                <button className="editProject" onClick={handleAddData}>Add Data</button>
                            </div>
                        )
                    }else{
                        return(
                            <div className="addBorder">
                                <button className="editProject" onClick={handleAddData}>Add Data</button>
                            </div>
                        )
                    } 
                }else{
                    return(
                        <div className="addBorder">
                            <button className="editProject" onClick={handleDeleteProject}>Delete Project</button>
                            <button className="editProject" onClick={handleAddData}>Add Data</button>
                        </div>
                    )
                }
            }
        }
    }

    const submitEdit = () => {
        const {project_id} = projectInfo;
        axios.put(`/data/folders/projects/${project_id}`,{title,description,category1,category2})
        .then(res=>{
            // console.log(res.data)
            dispatch(setProjectInfo(res.data))
            setEditBool(!editBool)
        }).catch(err=>console.log(err))
    }

    const deleteData = (data_id,idx) => {
        const {project_id} = projectInfo;
        axios.delete(`/data/folders/data/${data_id}/${project_id}`)
        .then(res=>{
            updateView(idx)
            setData(res.data)
            axios.get(`/data/folders/projects/${project_id}`)
            .then(res=>{
                dispatch(setDataInfo(res.data))
            }).catch(err=>console.log(err))
        }).catch(err=>console.log(err))
    }

    const editProjectInfo = () => {
        if(editBool){
            return(
                <div className="handleWidth">
                    <p className="projectTitle">Title: <input maxLength="50" value={title} onChange={e=>setTitle(e.target.value)}/></p>
                    <p>Description:</p>
                    <textarea rows="3" cols="40" maxLength="1000" value={description} onChange={e=>setDesc(e.target.value)}></textarea>
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
                    <button className="editProject" onClick={()=>setEditBool(!editBool)}>Cancel</button>
                    <button className="editProject" onClick={()=>submitEdit()}>Submit</button>
                </div>
            )
        }else{
            return(
                <div className="handleWidth">
                    <h3 className="projectTitle">{title}</h3>
                    <p>{description}</p>
                    <h6>Categories: {category1}, {category2}</h6>
                    {renderEdit()}
                </div>
            )
        }
    }

    const mapData = () => {
        if(dataInfo){
            return (
                dataInfo.map((info,idx)=>{
                    const renderView = () => {
                        if(view[idx]){
                            const trialData = data.filter(e=>{
                                return e.data_id === info.data_id
                            })
                            // console.log(trialData)
                            const renderDelete = () => {
                                if(user){
                                    if(user.user_id===projectInfo.owner_id){
                                        return (
                                            <button className="editProject" onClick={()=>deleteData(info.data_id,idx)}>Delete {info.data_name}</button>
                                        )
                                    }
                                }
                            }
                            return(
                                <div className="dropDownData">
                                    {/* GraphData graphs data using D3 that is presented visually to the user */}
                                    <GraphData data={trialData}/>
                                    {renderDelete()}
                                </div>
                            )
                        }
                    }

                    const buttonFlip = () => {
                        if(view[idx]){
                            // const str = "v"
                            return (
                                <IoCaretDownSharp className="caret"/>
                            )
                        }else{
                            // const str = ">"
                            return (
                                <IoCaretForwardSharp className="caret"/>
                            )
                        }
                    }
    
                    return (
                        <div className="handleWidth" key={info.data_id}>
                            <div className="dropDownMenu">
                                <h4 className="dataTitle">{info.data_name}</h4><button className="flipBtn" onClick={()=>updateView(idx)}>{buttonFlip()}</button>
                            </div>
                            {renderView()}
                        </div>
                    )
                })
            )
        }
    }

    return (
        <div className="handleCenter">
            <div className="content">
                <Header2 />
                {editProjectInfo()}
                {mapData()}
                {renderAddData()}
                {/* <div className="spacer"></div> */}
            </div>
            <Footer />
        </div>
    )
}

export default ProjectData