import Header2 from './Header2'
import {useState} from 'react'
import {useSelector} from 'react-redux'
// import axios from 'axios'

const AddData = (props) => {
    const [name,setName] = useState('')
    const {projectInfo} = useSelector(store=>store.projectInfo)

    const handleClick = () => {
        props.history.push(`/projectdata/${projectInfo.project_id}`)
    }

    return (
        <div>
            <Header2 />
            <h4>Data Name:</h4>
            <input placeholder="i.e. condition 1 trial 1, c1t1, etc." value={name} onChange={(e)=>setName(e.target.value)}/>
            <button onClick={handleClick}>Add Data to Project</button>
        </div>
    )
}

export default AddData