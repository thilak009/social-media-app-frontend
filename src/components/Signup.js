import React,{ useState} from 'react'
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { signup } from '../auth';
import '../CSS/sign.css'
import { loadingScreen } from './LoadingScreen';

function Signup() {

    const [values,setValues]=useState({
        username:"",
        email:"",
        password:"",
        confirmPassword:"",
        redirect:false
    })
    const [loading,setLoading] = useState(false)

    const onSubmit=(e)=>{

        e.preventDefault();
        const {username,email,password,confirmPassword} = values;
        
        if(password.length < 6){
            return alert('password should be atleast 6 char long')
        }
        if(password !== confirmPassword){
            alert(`password does not match`)
        }
        if(username && email && password === confirmPassword){
            setLoading(true)
            signup({username,email,password})
            .then(data=>{
                if(data.error){
                    alert(data.error)
                }
                else{
                    alert("user registered")
                    setValues({...values,redirect: true})
                }
            })
            setLoading(false)
        }
        else{
            alert("fill in all details")
        }
    }

    const performRedirect=()=>{
        
        const {redirect} =values
        if(redirect){
            return <Redirect to="/signin"/>
        }
    }

    const handleChange= name => e =>{
        setValues({...values,[name]:e.target.value})
    }

    const signupForm=()=>{
        return(
            <div className="custom-form">
                <form className="signin-login-form">
                    <h3>Signup</h3>
                    <input type="text" onChange={handleChange("username")} placeholder="Username"/>
                    <input type="email" onChange={handleChange("email")} placeholder="Email" />
                    <input type="password" onChange={handleChange("password")} placeholder="Password" />
                    <input type="password" onChange={handleChange("confirmPassword")} placeholder="Confirm Password" />
                    <div><button type="submit" onClick={onSubmit} style={{fontSize:"18px"}}>Register</button></div>
                    <div className="redirect" style={{fontSize:"18px"}}>
                        <p>Already a User ?<Link className="link" to="/signin">Login</Link></p>
                    </div>
                </form>
            </div>
        )
    }
    return (
        <div>
            {loading?loadingScreen("spin"):[signupForm(), performRedirect()]}
        </div>
    )
}

export default Signup
