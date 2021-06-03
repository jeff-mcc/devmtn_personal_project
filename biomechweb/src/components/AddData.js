import Header2 from './Header2'
import {useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import axios from 'axios'
import {setDataInfo,setFinished} from '../redux/projectReducer'

const AddData = (props) => {
    const [name,setName] = useState('')
    // const [maxVal,setMaxVal] = useState(null)
    const {projectInfo,finishedBool} = useSelector(store=>store.projectInfo)
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
                // dispatch(setDataInfo(res.data))
                axios.get(`/data/folders/data/trial/${data_id}`).then(res=>{
                    // console.log(res.data.length)
                    let legAngle = [];
                    let calcAngle = [];
                    let rfAngle = [];
                    let valueId = [];
                    for (let i = 0; i<res.data.length; i++){
                        legAngle.push(Math.atan2(res.data[i].leg_y_p-res.data[i].leg_y_d,res.data[i].leg_x_p-res.data[i].leg_x_d)*180/Math.PI)
                        calcAngle.push(Math.atan2(res.data[i].calc_y_p-res.data[i].calc_y_d,res.data[i].calc_x_p-res.data[i].calc_x_d)*180/Math.PI)
                        rfAngle.push(legAngle[i]-calcAngle[i])
                        valueId.push(res.data[i].value_id)
                    }
                    // console.log(rfAngle)
                    axios.put(`/data/folders/data/trial`,{valueId,legAngle,calcAngle,rfAngle})
                    .then((res)=>{
                        console.log(res.data)
                        dispatch(setFinished(!finishedBool))
                    }).catch(err=>console.log(err))
                }).catch(err=>console.log(err))
                dispatch(setDataInfo(res.data))
                props.history.push(`/projectdata/${projectInfo.project_id}`)
            }).catch(err=>console.log(err))
        }).catch(err=>console.log(err))
    }

    return (
        <div>
            <Header2 />
            <h2 className="banner">Add Data to Your Project</h2>
            <h4>Data Name:</h4>
            <input maxlength="30" placeholder="i.e. condition 1 trial 1, c1t1, etc." value={name} onChange={(e)=>setName(e.target.value)}/>
            <button className="addData" onClick={handleClick}>Add Data to Project</button>
        </div>
    )
}

export default AddData