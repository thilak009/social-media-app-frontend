import React, { useEffect, useState } from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom';
import { isAuthenticated } from '../auth';
// import {GoHome} from 'react-icons/go';
// import {IoCreateOutline} from 'react-icons/io5';
// import {RiLogoutBoxLine} from 'react-icons/ri';
// import {BsPerson,BsSearch} from 'react-icons/bs'
import {ReactComponent as HomeIcon} from "../assets/home.svg"
import {ReactComponent as CreateIcon} from "../assets/edit.svg"
import {ReactComponent as ProfileIcon} from "../assets/user.svg"
import {ReactComponent as LogoutIcon} from "../assets/logout.svg"

import '../CSS/navbar.css'
import {ConfirmDialog} from './Dialog';
 

function Navbar({toggle}) {

    const history = useHistory()
    const {user} = isAuthenticated();
    
    const [redirect,setRedirect] = useState(false);
    const [dialog,toggleDialog] = useState(false)
   
    useEffect(()=>{
        return history.listen(location=>{
            if(history.action === "POP"){
                toggleDialog(false)
            }
        })
    },[])
    const signout=()=>{

        localStorage.removeItem('token');
        setRedirect(true);
    }

    const performRedirect=()=>{
        
        if(redirect){
            return <Redirect to="/signin"/>
        }
    }

    const navbar=()=>{
        return(
            <>
                <div className="navbar">
                    <ul>
                        <li className="nav-item">
                            <Link className="nav-item" to="/"><HomeIcon/><span className="icon-info">Home</span></Link>
                        </li>
                        <li className="nav-item">
                            <p style={{cursor: 'pointer'}} onClick={()=>[toggle(true),history.push("#create")]}
                            className="nav-item">
                                <CreateIcon/><span className="icon-info">Create</span>
                            </p>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-item" to={`/profile/${user?user._id:""}`}><ProfileIcon/><span className="icon-info">Profile</span></Link>
                        </li>
                        {/* <li className="nav-item">
                            <Link className="nav-item" to="/search"><BsSearch/><span className="icon-info">Search</span></Link>
                        </li> */}
                        {
                            isAuthenticated() && (
                            <li className="nav-item">
                                <span style={{cursor:'pointer'}} onClick={()=>[toggleDialog(!dialog),history.push("#logout")]}
                                className="nav-item">
                                    <LogoutIcon/><span className="icon-info">Logout</span>
                                </span>
                            </li>
                        )}
                    </ul>
                </div>
                {
                    dialog && <ConfirmDialog message="Confirm to logout" action={signout} close={()=> toggleDialog(false)}/>
                }
            </>
        )
    }
    return (
        <>
            {navbar()}
            {performRedirect()}
        </>
    )
}

export default Navbar
