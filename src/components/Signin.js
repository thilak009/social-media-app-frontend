import React,{useState} from 'react'
import { Link, Redirect } from 'react-router-dom';
import { signin } from '../auth';
import { loadingScreen } from './LoadingScreen';

function Signin() {

    const[values,setValues] = useState({
        email:"",
        password:"",
        redirect: false
    })
    const [loading,setLoading] = useState(false)

    const loginUser=()=>{
        const {email,password}=values;

        if(email && password){
            setLoading(true)
            signin({email,password})
            .then(data=>{
                if(data.error){
                    setTimeout(()=>{
                        document.getElementById('error-message').style.display="block"
                    },900)
                    setTimeout(()=>{
                        document.getElementById('error-message').style.display="none"
                    },3000)
                }
                else{
                    localStorage.setItem("token",JSON.stringify(data))
                    setValues({...values,redirect: true})
                }
                setLoading(false)
            })
        }
        else{
            alert("please fill in the fields")
        }
    }
    const onSubmit=(e)=>{

        e.preventDefault();
        loginUser()
    }
    const guestLogin=async(e)=>{
        e.preventDefault();
        await setValues({...values,email:"guest@gmail.com",password:"guest123"})
        loginUser()
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
                    <p id="error-message" style={{display:"none",marginBottom:"10px",color:"#fd4d4d"}}>Email or password is wrong</p>
                    <input type="email" onChange={handleChange("email")} placeholder="Email" />
                    <input type="password" onChange={handleChange("password")} placeholder="Password" />
                    <div><button type="submit" onClick={onSubmit} style={{fontSize:"18px",marginBottom:"5px"}}>Login</button></div>
                    <div><button type="submit" onClick={guestLogin} style={{fontSize:"18px"}}>Login as Guest</button></div>
                    <div className="redirect" style={{fontSize:"18px"}}>
                        <p>Not a registerd User ?<Link className="link" to="/signup">Signup</Link></p>
                    </div>
                </form>
            </div>
        )
    }
    return (
        <>
        {loading?loadingScreen("spin"):[loginForm(),performRedirect()]}
        </>
    )
}

export default Signin
