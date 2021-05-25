import React from 'react'
import ReactLoading from 'react-loading'

const loadingScreen=(type="bars",color="#fd4d4d")=>{
    return( 
        <div className="loader">
            <div>
                <ReactLoading type={type} color={color}/>
            </div>
        </div>
    )
}
const loadingAnimation=(type="bars",color="#fd4d4d")=>{
    return(
        <div style={{display:"flex",justifyContent:"center"}}>
            <ReactLoading type={type} color={color}/>
        </div>
    )
}

export  {loadingScreen,loadingAnimation}