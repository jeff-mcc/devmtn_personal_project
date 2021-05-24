require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')

const {CONNECTION_STRING,SESSION_SECRET,SERVER_PORT} = process.env;

//controllers needed: authController, dataController, projectController, userController

const app = express()

app.use(express.json())
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 3600000}
}))

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
})
.then(db=>{
    app.set('db',db)
    console.log("Database is eating tacos")
    app.listen(SERVER_PORT,()=>console.log(`Server is eating tacos on port: ${SERVER_PORT}`))
}).catch(err=>console.log(err))

//endpoints needed:  Authentication, Data, Project, User
//Authentication:
// '/auth/signup'  post
// '/auth/login'  post
// '/auth/logout'  get
// '/auth/user'  get

//Data:
// '/project/:project_id/:data_id'  get
// '/project/:project_id'  put

//Project:
// '/folders'  get
// '/folders?query=query'  get

//User:
// '/user/profile'  get
// '/user/edit'  put