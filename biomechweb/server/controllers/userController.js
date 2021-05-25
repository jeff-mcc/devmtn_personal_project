module.exports = {
    editUser: (req,res)=>{
        const db = req.app.get('db')
        const {email,firstName,lastName,institution} = req.body;
        const {user} = req.session;
        if(!user){
            return res.status(511).send("Please log in")
        }
        db.auth.edit_user(email,firstName,lastName,institution)
        .then(user=>{
            delete user.password
            req.session.user = user;
            res.status(200).send(req.session.user)
        }).catch(err=>{
            console.log(err)
            res.status(500).send(err)
        })
    }
}