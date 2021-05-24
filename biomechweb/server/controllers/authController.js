const bcrypt = require('bcryptjs')

module.exports = {
    signup: async (req,res)=>{
        const db = req.app.get('db')
        const {email,password,firstName,lastName,institution} = req.body
        const [result] = await db.auth.check_email(email)
        if(result){
            return res.status(409).send('Email already in use')
        }
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password,salt)
        const [user] = await db.auth.signup_user(email,hash,firstName,lastName,institution)
        delete user.password
        req.session.user = user
        return res.status(200).send(req.session.user)
    },
    login: async (req,res)=>{
        const db = req.app.get('db')
        const {email,password} = req.body
        const [user] = await db.auth.check_email(email)
        if(!user){
            return res.status(401).send("Incorrect username or password")
        }
        const isAuthenticated = bcrypt.compareSync(password,user.password)
        if(!isAuthenticated){
            return res.status(401).send("Incorrect username or password")
        }
        delete user.password
        req.session.user = user
        return res.status(200).send(req.session.user)
    },
    logout: (req,res)=>{
        req.session.destroy()
        res.sendStatus(200)
    },
    getUser: (req,res)=>{
        if(!req.session.user){
            return res.status(401).send("User not found. Please log in")
        }
        return res.status(200).send(req.session.user)
    }
}