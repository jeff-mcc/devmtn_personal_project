import {useSelector} from 'react-redux'

const ProjectData = () => {
    const {projectInfo,dataInfo} = useSelector(store=>store.projectInfo)
    console.log(projectInfo)
    console.log(dataInfo)

    return (
        <div>test project data</div>
    )
}

export default ProjectData