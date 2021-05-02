import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../auth';
import {GoHome} from 'react-icons/go';
import {IoCreateOutline} from 'react-icons/io5';
import {RiLogoutBoxLine} from 'react-icons/ri';
import {BsPerson} from 'react-icons/bs'
import './CSS/navbar.css'

function Navbar({toggle}) {

    const [redirect,setRedirect] = useState(false);
   
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
            <div className="navbar">
                <ul>
                    <li className="nav-item">
                        <Link className="nav-item" to="/"><GoHome/><span className="icon-info">Home</span></Link>
                    </li>
                    <li className="nav-item">
                        <p style={{cursor: 'pointer'}} onClick={()=>toggle(true)}
                        className="nav-item">
                            <IoCreateOutline/><span className="icon-info">Create</span>
                        </p>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-item" to="/profile"><BsPerson/><span className="icon-info">Profile</span></Link>
                    </li>
                    {
                        isAuthenticated() && (
                        <li className="nav-item">
                            <span style={{cursor:'pointer'}} onClick={()=>signout()}
                            className="nav-item">
                                <RiLogoutBoxLine/><span className="icon-info">Logout</span>
                            </span>
                        </li>
                    )}
                </ul>
            </div>
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
