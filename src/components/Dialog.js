import React from 'react'
import { useHistory } from 'react-router-dom'
import '../CSS/home.css'

const ConfirmDialog=({message,action,close})=>{
    const history = useHistory()

    return(
        <div className="modal-backdrop" onClick={()=> [close(),history.goBack()]}>
            <div className="dialog-modal" 
             onClick={e=> e.stopPropagation()}>
                <p>{message}</p>
                <div style={{display:"flex",gap:"20px"}}>
                    <button onClick={()=> [action(),history.goBack()]}>Yes</button>
                    {
                        close && <button onClick={()=> [close(),history.goBack()]}>Cancel</button>
                    }
                </div>
            </div>
        </div>
    )
}
const AcknowledgeMessage=({message,close})=>{

    setTimeout(()=>{
        document.getElementById("ack-msg").style.display="none"
    },1500)
    return(
        <div className="modal-backdrop" id="ack-msg" onClick={()=> close()}>
            <div className="dialog-modal" 
             onClick={e=> e.stopPropagation()}>
                <p>{message}</p>
                <div style={{display:"flex",gap:"20px"}}>
                    {/* <button onClick={close}>Ok</button> */}
                </div>
            </div>
        </div>
    )
}

export {ConfirmDialog,AcknowledgeMessage}