import {useState} from 'react'
import axios from 'axios'
import {setUser} from '../redux/authReducer'
import {useDispatch} from 'react-redux'

const Login = (props) => {
    const [signup,setSignup] = useState(false)
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [password2,setPassword2] = useState('')
    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    const [institution,setInstitution] = useState('')
    const dispatch = useDispatch()
    const register = new RegExp('^[^s@]+@[^s@]+$')
    // const register = new RegExp("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$")

    const handleRegister = () => {
        // console.log(email)
        // console.log(register)
        if(password!=='' && register.test(email)){
            if(password===password2){
                axios.post('/login/signup',{email,password,firstName,lastName,institution})
                .then(res=>{
                    dispatch(setUser(res.data))
                    // console.log("Registered!")
                    props.history.push("/profile")
                }).catch(err=>console.log(err))
            }else{
                alert("Passwords do not match")
            }
        }else{
            alert("Please enter a valid email and/or password")
        }
    }

    const handleLogin = () => {
        // console.log(register)
        axios.post('/login/login',{email,password})
        .then(res=>{
            dispatch(setUser(res.data))
            // console.log("login success!")
            props.history.push("/profile")
        }).catch(err=>console.log(err))
    }

    const renderSignup = () => {
        if(!signup){
            return(
                <div>
                    <button className="loginBtn" onClick={handleLogin}>Log In</button><br/>
                    <p>No Account? <button className="textBtn" onClick={()=>setSignup(!signup)}>Sign up</button></p>
                </div>
            )
        }else{
            return(
                <div className="loginContainer">
                    <h5 className="loginField">Retype Password: <input type="password" value={password2} onChange={e=>setPassword2(e.target.value)}/></h5>
                    <h5 className="loginField">First Name: <input maxlength="30" value={firstName} onChange={e=>setFirstName(e.target.value)}/></h5>
                    <h5 className="loginField">Last Name: <input maxlength="30" value={lastName} onChange={e=>setLastName(e.target.value)}/></h5>
                    <h5 className="loginField">Institution: <input maxlength="100" value={institution} onChange={e=>setInstitution(e.target.value)}/></h5>
                    <button className="loginBtn" onClick={handleRegister}>Sign Up</button><br/>
                    <p>Already have an account? <button className="textBtn" onClick={()=>setSignup(!signup)}>Log in</button></p>
                </div>
            )
        }
    }

    return(
        <div className="loginFlexBox">
            <div className="loginBox">
                <div className="loginContainer">
                    <h5 className="loginField">Email: <input maxlength="50" value={email} onChange={e=>setEmail(e.target.value)}/></h5>
                    <h5 className="loginField">Password: <input type="password" value={password} onChange={e=>setPassword(e.target.value)}/></h5>
                </div>
                {renderSignup()}
            </div>
        </div>
    )
}

export default Login