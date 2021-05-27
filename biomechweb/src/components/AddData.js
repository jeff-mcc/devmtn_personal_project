import Header2 from './Header2'
import {useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import axios from 'axios'
import {setDataInfo} from '../redux/projectReducer'

const AddData = (props) => {
    const [name,setName] = useState('')
    // const [maxVal,setMaxVal] = useState(null)
    const {projectInfo} = useSelector(store=>store.projectInfo)
    const dispatch = useDispatch()

    const handleClick = () => {
        const data_name = name;
        axios.post(`/data/folders/data/info/${projectInfo.project_id}`,{data_name})
        .then(res=>{
            // setMaxVal(res.data)
            // console.log(res.data)
            const data_id = res.data.max;
            axios.post(`/data/folders/data/${data_id}/${projectInfo.project_id}`)
            .then((res)=>{
                dispatch(setDataInfo(res.data))
                props.history.push(`/projectdata/${projectInfo.project_id}`)
            }).catch(err=>console.log(err))
        }).catch(err=>console.log(err))
    }

    return (
        <div>
            <Header2 />
            <h2>Add Data to Your Project</h2>
            <h4>Data Name:</h4>
            <input placeholder="i.e. condition 1 trial 1, c1t1, etc." value={name} onChange={(e)=>setName(e.target.value)}/>
            <button onClick={handleClick}>Add Data to Project</button>
        </div>
    )
}

export default AddData