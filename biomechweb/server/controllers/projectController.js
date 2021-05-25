module.exports = {
    // getProjects: (req,res) => {
    //     const {query} = req.query;
    //     const db = req.app.get('db')
    //     db.project.get_projects(query)
    //     .then(projects=>{
    //         res.status(200).send(projects)
    //     }).catch(err=>{
    //         console.log(err)
    //         res.status(500).send(err)
    //     })
    // },
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
        .then(products=>{
            res.status(200).send(products)
        }).catch(err=>{
            console.log(err)
            res.status(500).send(err)
        })
    }
}