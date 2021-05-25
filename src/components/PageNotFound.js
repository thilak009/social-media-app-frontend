import React from 'react'
import { Link } from 'react-router-dom'
import image404 from '../assets/ORFI0N0.jpg'

function PageNotFound() {
    return (
        <div style={{display:"grid",gridTemplateColumns:"auto",justifyItems:"center",rowGap:"1rem"}}>
            <div style={{position:"relative"}}>
                <img src={image404} style={{width:"40rem",height:"30rem"}}/>
                <Link to="/" style={{position:"absolute",bottom:"0.5rem",left:"45%"}}>
                    <button>Go to Home</button>
                </Link>
            </div>
        </div>
    )
}

export default PageNotFound
