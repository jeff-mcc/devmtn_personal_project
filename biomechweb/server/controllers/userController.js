module.exports = {
    editUser: (req,res)=>{
        const db = req.app.get('db')
        const {user_id,email,firstName,lastName,institution} = req.body;
        const {user} = req.session;
        if(!user){
            return res.status(511).send("Please log in")
        }
        db.auth.edit_user(user_id,email,firstName,lastName,institution)
        .then(user=>{
            delete user[0].password
            req.session.user = user[0];
            res.status(200).send(req.session.user)
        }).catch(err=>{
            console.log(err)
            res.status(500).send(err)
        })
    }
}