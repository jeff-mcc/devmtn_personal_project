module.exports = {
    getProjects: (req,res) => {
        const db = req.app.get('db')
        let {query,filter} = req.query;
        // console.log(query)
        // console.log(filter)
        if(query!=='' || filter!==''){
            if(query){
                let newFilter = '';
                if(filter){
                    newFilter = filter.replace(/\*/,"&")
                }
                query = query.toLowerCase()
                db.project.get_query_projects(query,newFilter)
                .then(projects=>{
                    res.status(200).send(projects)
                }).catch(err=>{
                    console.log(err)
                    res.status(500).send(err)
                })
            }else{
                query = '';
                let newFilter = '';
                if(filter){
                    newFilter = filter.replace(/\*/,"&")
                }
                db.project.get_query_projects(query,newFilter)
                .then(projects=>{
                    res.status(200).send(projects)
                }).catch(err=>{
                    console.log(err)
                    res.status(500).send(err)
                })
            }
        }else{
            db.project.get_projects()
            .then(projects=>{
                res.status(200).send(projects)
            }).catch(err=>{
                console.log(err)
                res.status(500).send(err)
            })
        }
    },
    getUserProjects: (req,res)=>{
        const db = req.app.get('db')
        const {user_id} = req.params;
        const {user} = req.session;
        const owner = +user_id;
        // console.log(user_id)
        if(!user){
            return res.status(511).send("Please log in")
        }
        db.project.get_user_projects(owner)
        .then(projects=>{
            res.status(200).send(projects)
        }).catch(err=>{
            console.log(err)
            res.status(500).send(err)
        })
    },
    addProject: (req,res)=>{
        const db = req.app.get('db')
        const {title,description,category1,category2} = req.body;
        const {user} = req.session;
        const owner_id = user.user_id;
        db.project.add_project(title,description,category1,category2,owner_id)
        .then(projects=>{
            res.status(200).send(projects[0])
        }).catch(err=>{
            console.log(err)
            res.status(500).send(err)
        })
    },
    deleteProject: (req,res)=>{
        const db = req.app.get('db')
        let {project_id} = req.params;
        project_id = +project_id;
        // const {user} = req.session;
        // const owner_id = user.user_id;
        db.project.delete_project(project_id)
        .then(()=>{
            res.sendStatus(200)
        }).catch(err=>{
            console.log(err)
            res.status(500).send(err)
        })
    }
}