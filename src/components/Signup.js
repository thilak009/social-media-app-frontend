import { Button, Card, Element, FormWrapper, InputField, Portion, Row, Text } from 'fictoan-react';
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
        if( email && password === confirmPassword){
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
            <Row sidePadding="huge">
                <Portion>
                    <Card
                        shape="rounded"
                        padding="micro"
                        marginTop="medium"
                    >
                    <Row sidePadding="large">
                        <Portion>
                            <FormWrapper>
                                {/* <InputField
                                    label="Username"
                                    placeholder="username"
                                    onChange={handleChange("username")}
                                /> */}
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
                                <InputField
                                    label="Confirm Password"
                                    type="password"
                                    placeholder="confirm password"
                                    onChange={handleChange("confirmPassword")}
                                />
                                <Button
                                    kind="secondary"
                                    size="small"
                                    onClick={onSubmit}
                                    marginBottom="nano"
                                >
                                    Register
                                </Button>
                                {/* <div><button type="submit" onClick={onSubmit} style={{fontSize:"18px"}}>Register</button></div> */}
                                <Text size="large">Already a User ? <Element as="span" textColour="blue-80"><Link to="/signin">Login</Link></Element></Text>
                            </FormWrapper>
                        </Portion>
                    </Row>
                    </Card>
                </Portion>
            </Row>
            // <div className="custom-form">
            //     <form className="signin-login-form">
            //         <h3>Signup</h3>
            //         <input type="text" onChange={handleChange("username")} placeholder="Username"/>
            //         <input type="email" onChange={handleChange("email")} placeholder="Email" />
            //         <input type="password" onChange={handleChange("password")} placeholder="Password" />
            //         <input type="password" onChange={handleChange("confirmPassword")} placeholder="Confirm Password" />
            //         <div><button type="submit" onClick={onSubmit} style={{fontSize:"18px"}}>Register</button></div>
            //         <div className="redirect" style={{fontSize:"18px"}}>
            //             <p>Already a User ?<Link className="link" to="/signin">Login</Link></p>
            //         </div>
            //     </form>
            // </div>
        )
    }
    return (
        <>
            {loading?loadingScreen("spin"):[signupForm(), performRedirect()]}
        </>
    )
}

export default Signup
