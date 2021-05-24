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
                    <button onClick={handleLogin}>Log In</button><br/>
                    <p>No Account? <button onClick={()=>setSignup(!signup)}>Sign up</button></p>
                </div>
            )
        }else{
            return(
                <div>
                    <h5>Retype Password: <input type="password" value={password2} onChange={e=>setPassword2(e.target.value)}/></h5>
                    <h5>First Name: <input value={firstName} onChange={e=>setFirstName(e.target.value)}/></h5>
                    <h5>Last Name: <input value={lastName} onChange={e=>setLastName(e.target.value)}/></h5>
                    <h5>Institution: <input value={institution} onChange={e=>setInstitution(e.target.value)}/></h5>
                    <button onClick={handleRegister}>Sign Up</button><br/>
                    <p>Already have an account? <button onClick={()=>setSignup(!signup)}>Log in</button></p>
                </div>
            )
        }
    }

    return(
        <div>
            <h5>Email: <input value={email} onChange={e=>setEmail(e.target.value)}/></h5>
            <h5>Password: <input type="password" value={password} onChange={e=>setPassword(e.target.value)}/></h5>
            {renderSignup()}
        </div>
    )
}

export default Login