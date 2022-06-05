import { Button, Card, Element, Text } from 'fictoan-react'
import React from 'react'
import { useHistory } from 'react-router-dom'
import '../CSS/home.css'

const ConfirmDialog=({message,action,close})=>{
    const history = useHistory()

    return(
        <div className="modal-backdrop" onClick={()=> [close(),history.goBack()]}>
            <div className="dialog-modal" 
             onClick={e=> e.stopPropagation()}>
                <Card
                    shape='rounded'
                    padding='micro'
                    style={{display:"flex", justifyContent:"center"}}
                >
                    <div>
                        <Text marginBottom='micro'>{message}</Text>
                        {/* <div style={{display:"flex",gap:"20px"}}> */}
                        <Element as="div" className='vertically-center-items' style={{justifyContent:"center"}}>
                            <Button
                                shape='rounded'
                                size='small'
                                bgColour='red-20'
                                borderColour='red-90'
                                textColour='red-90'
                                onClick={()=> [action(),history.goBack()]}
                            >
                                Yes
                            </Button>
                            {
                                close &&(
                                    <Button
                                        kind='secondary'
                                        size='small'
                                        marginLeft='micro'
                                        onClick={()=> [close(),history.goBack()]}
                                    >
                                        Cancel
                                    </Button>
                                )
                            }
                            {/* <button onClick={()=> [action(),history.goBack()]}>Yes</button> */}
                            {/* {
                                close && <button onClick={()=> [close(),history.goBack()]}>Cancel</button>
                            } */}
                        </Element>
                    </div>
                </Card>
                {/* </div> */}
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