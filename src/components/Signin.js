import { Button, Card, Element, FormWrapper, Heading, InputField, Portion, Row } from 'fictoan-react';
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

    const onSubmit=(e)=>{
        e.preventDefault();
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
    const guestLogin=(e)=>{
        e.preventDefault();
        setLoading(true)
        const email = "guest@gmail.com"
        const password = "guest123"
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
            // <div className="custom-form">
                <Row sidePadding="huge">
                    <Portion>
                        <Card
                            shape="rounded"
                            padding="micro"
                            marginTop="medium"
                        >
                            {/* <form className="signin-login-form"> */}
                            <FormWrapper>
                                <Row sidePadding="huge">
                                    <Portion>
                                        <Heading as="h3" marginBottom="micro">
                                            Login
                                        </Heading>
                                        <p id="error-message" style={{display:"none",marginBottom:"10px",color:"#fd4d4d"}}>Email or password is wrong</p>
                                        <InputField
                                            label="Email"
                                            placeholder="email"
                                            onChange={handleChange("email")}
                                        />
                                        <InputField
                                            label="Password"
                                            type="password"
                                            placeholder="password"
                                            onChange={handleChange("password")}
                                        />
                                        {/* <input type="email" onChange={handleChange("email")} placeholder="Email" /> */}
                                        {/* <input type="password" onChange={handleChange("password")} placeholder="Password" /> */}
                                        <Element as="div" className="vertically-center-items" marginTop='micro' marginBottom='micro'>
                                            <Button
                                                kind="primary"
                                                onClick={onSubmit}
                                                disabled={!values.email || !values.password}
                                            >
                                                Login
                                            </Button>
                                            {/* <Button
                                                kind="primary"
                                                onClick={guestLogin}
                                                marginLeft="micro"
                                            >
                                                Login as Guest
                                            </Button> */}
                                        </Element>
                                        {/* <div><button type="submit" onClick={onSubmit} style={{fontSize:"18px",marginBottom:"5px"}}>Login</button></div> */}
                                        {/* <div><button type="submit" onClick={guestLogin} style={{fontSize:"18px"}}>Login as Guest</button></div> */}
                                        {/* <div className="redirect" style={{fontSize:"18px"}}> */}
                                            <p>Not a registerd User ? <Element as="span" textColour='blue-80'><Link to="/signup">Signup</Link></Element></p>
                                        {/* </div> */}
                                    </Portion>
                                </Row>
                            </FormWrapper>
                        </Card>
                    </Portion>
                </Row>
            // </div>
        )
    }
    return (
        <>
        {loading?loadingScreen("spin"):[loginForm(),performRedirect()]}
        </>
    )
}

export default Signin
