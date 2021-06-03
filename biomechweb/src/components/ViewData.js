import {useState,useEffect} from 'react'
import axios from 'axios'
import {setProjectInfo,setDataInfo} from '../redux/projectReducer'
import {useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import Footer from './Footer'

const ViewData = (props) => {
    const [search,setSearch] = useState('')
    const [filter,setFilter] = useState('')
    const [data,setData] = useState([])
    const dispatch = useDispatch()
    // console.log(data)

    useEffect(()=>{
        axios.get('/data/folders')
        .then(res=>{
            // console.log(res.data)
            setData(res.data)
        }).catch(err=>console.log(err))
    },[])

    const clickFolder = (project) => {
        axios.get(`/data/folders/projects/${project.project_id}`)
        .then(res=>{
            dispatch(setProjectInfo(project))
            dispatch(setDataInfo(res.data))
            props.history.push(`/projectdata/${project.project_id}`)
        }).catch(err=>console.log(err))
    }

    const handleSearch = (search,filter) => {
        axios.get(`/data/folders?query=${search}&filter=${filter}`)
        .then(res=>{
            setData(res.data)
        }).catch(err=>console.log(err))
    }

    const handleChange = (value) => {
        setFilter(value)
        let fixValue = value.replace(/\s+/g,"+")
        fixValue = fixValue.replace(/&/,"*")
        // console.log(fixValue)
        axios.get(`/data/folders?filter=${fixValue}`)
        .then(res=>{
            // console.log(res.data)
            setData(res.data)
        }).catch(err=>console.log(err))
    }

    const handleMap = () => {
        if(data.length===0){
            return(
                <p>No Results Available</p>
            )
        }else{
            return(
                <div className="arrangeFolders">
                    {data.map((d)=>{
                        return(
                            <div className="arrangeTabs" key={d.project_id}>
                                <svg className="polySvg">
                                    <polygon className="poly" points="0,0 0,12 50,12 44,0"/>
                                </svg>
                                <div className="folder">
                                    <button className="folderButton" onClick={()=>clickFolder(d)}>{d.title}</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )
        }
    }

    return(
        <div className="handleCenter">
            <header className="searchHead">
                {/* <img />  //website icon that routes the user to the home screen */}
                <Link className="links" to="/"><h2>BiomechWeb</h2></Link>
                <div>
                    <input className="searchInput" placeholder="Search project title" onChange={e=>setSearch(e.target.value)}/>
                    <button onClick={()=>handleSearch(search,filter)}>S</button>
                </div>
            </header>
            <p className="searchFilter">Filter by Category: <select value={filter} onChange={e=>handleChange(e.target.value)}>
                    <option value=''>--No Filter Selected--</option>
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
            {handleMap()}
            {/* {data.map((d)=>{
                return(
                    <div className="folder" key={d.project_id}>
                        <button className="folderButton" onClick={()=>clickFolder(d)}>{d.title}</button>
                    </div>
                )
            })} */}
            <Footer />
        </div>
    )
}

export default ViewData