import React,{useState} from 'react'
import { Link, Redirect } from 'react-router-dom';
import { signin } from '../auth';

function Signin() {

    const[values,setValues] = useState({
        email:"",
        password:"",
        redirect: false
    })

    const onSubmit=async (e)=>{

        e.preventDefault();
    
        const {email,password}=values;

        signin({email,password})
        .then(data=>{
            if(data.error){
                alert(data.error)
            }
            else{
                localStorage.setItem("token",JSON.stringify(data))
                setValues({...values,redirect: true})
            }
        })
      
    }

    const performRedirect=()=>{
        
        const {redirect} =values
        if(redirect){
            return <Redirect to="/"/>
        }

    }

    const handleChange = name => event =>{
        setValues({...values, [name]: event.target.value})
    }

    const loginForm=()=>{
        return(
            <div className="custom-form">
                <form className="signin-login-form">
                    <h3>Login</h3>
                    <input type="email" onChange={handleChange("email")} placeholder="Email" />
                    <input type="password" onChange={handleChange("password")} placeholder="Password" />
                    <div><button type="submit" onClick={onSubmit} style={{fontSize:"18px"}}>Login</button></div>
                    <div className="redirect" style={{fontSize:"18px"}}>
                        <p>Not a registerd User ?<Link className="link" to="/signup">Signup</Link></p>
                    </div>
                </form>
            </div>
        )
    }
    return (
        <>
        {loginForm()}
        {performRedirect()}
        </>
    )
}

export default Signin
