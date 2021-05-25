import {useSelector} from 'react-redux'
import Header2 from './Header2'
import {useState,useEffect} from 'react'
import axios from 'axios'

const ProjectData = () => {
    const {projectInfo,dataInfo} = useSelector(store=>store.projectInfo)
    let viewArray = [];
    if(dataInfo){
        for (let i=0;i<dataInfo.length;i++){
            viewArray.push(false)
        }
    }
    const [view,setView] = useState(viewArray)
    const [data,setData] = useState([])
    // console.log(projectInfo)
    // console.log(dataInfo)
    // console.log(data)

    useEffect(()=>{
        axios.get(`/data/folders/data/${projectInfo.project_id}`)
        .then(res=>{
            setData(res.data)
        }).catch(err=>console.log(err))
    },[projectInfo.project_id])

    return (
        <div>
            <Header2 />
            <h3>{projectInfo.title}</h3>
            <p>{projectInfo.description}</p>
            <h6>Categories: {projectInfo.category1}, {projectInfo.category2}</h6>
            {dataInfo.map((info,idx)=>{
                const renderView = () => {
                    if(view[idx]){
                        const trialData = data.filter(e=>{
                            return e.data_id === info.data_id
                        })
                        return(
                            <div>
                                {/* <p>visible data output</p> */}
                                <p>{trialData[0].leg_x_p}</p>
                            </div>
                        )
                    }
                }

                const updateView = () => {
                    let newView = [...view];
                    newView[idx] = !newView[idx]
                    setView(newView)
                    // console.log(view)
                }

                return (
                    <div key={info.data_id}>
                        <div><h5>{info.data_name}</h5><button onClick={updateView}>{">"}</button></div>
                        {renderView()}
                    </div>
                )
            })}
            <button>Add Data</button>
        </div>
    )
}

export default ProjectData