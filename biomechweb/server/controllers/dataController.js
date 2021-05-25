module.exports = {
    getProject: (req,res)=>{
        const db=req.app.get('db')
        const {project_id} = req.params;
        const id = +project_id;
        db.data.get_project_data_info(id)
        .then(data=>{
            res.status(200).send(data)
        }).catch(err=>{
            console.log(err)
            res.status(500).send(err)
        })
    },
    getProjectData: (req,res)=>{
        const db = req.app.get('db')
        const {project_id} = req.params;
        const p_id = +project_id;
        // const d_id = +data_id;
        db.data.get_project_data(p_id)
        .then(data=>{
            res.status(200).send(data)
        }).catch(err=>{
            console.log(err)
            res.status(500).send(err)
        })
    }
}