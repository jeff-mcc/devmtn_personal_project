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
    },
    editProject: (req,res)=>{
        const db = req.app.get('db')
        const {project_id} = req.params;
        const p_id = +project_id;
        const {title,description,category1,category2} = req.body;
        db.data.edit_project(p_id,title,description,category1,category2)
        .then(info=>{
            res.status(200).send(info[0])
        }).catch(err=>{
            console.log(err)
            res.status(500).send(err)
        })
    },
    deleteData: (req,res)=>{
        const db = req.app.get('db')
        let {data_id,project_id} = req.params;
        data_id = +data_id;
        project_id = +project_id;
        db.data.delete_project_data(data_id,project_id)
        .then(data=>{
            res.status(200).send(data)
        }).catch(err=>{
            console.log(err)
            res.status(500).send(err)
        })
    },
    addDataInfo: (req,res)=>{
        const db = req.app.get('db')
        let {project_id} = req.params;
        project_id = +project_id;
        const {data_name} = req.body;
        db.data.auto_add_data_info(project_id,data_name)
        .then(maxval=>{
            res.status(200).send(maxval)
        }).catch(err=>{
            console.log(err)
            res.status(500).send(err)
        })
    },
    autoAddData: (req,res)=>{
        const db = req.app.get('db')
        let {data_id} = req.params;
        data_id = +data_id;
        db.data.auto_add_data(data_id)
        .then(()=>{
            res.sendStatus(200)
        }).catch(err=>{
            console.log(err)
            res.status(500).send(err)
        })
    }
}