import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { isAuthenticated } from '../auth'
import { checkChatRoom, getAllMessages, sendMessage } from '../user/chat'
import {IoArrowBackSharp} from 'react-icons/io5';
import '../CSS/chat.css'
import io from 'socket.io-client'
import { Button, Element, FormItem, FormWrapper, InputField, Portion, Row } from 'fictoan-react';


var socket;

function Chat() {

    const {user} = isAuthenticated()
    const {userId} = useParams()
    const history = useHistory()

    const [chatRoom,setChatRoom] = useState({})
    const [loading,setLoading] = useState(true)
    const [prevoiusMessages,setPreviousMessages] = useState([])
    const [message,setMessage] = useState('')

    useEffect(()=>{
        
        const getChatRoom=()=>{
            checkChatRoom(userId)
            .then(data=>{
                setChatRoom(data)
                setLoading(false)
            })
        }
        getChatRoom()
        socket = io('https://social-media-backend-nodejs.herokuapp.com')
        socket.on('new message',data=>{
            const {message,ownerUserId} = data
            var msg = document.createElement('li')
            msg.textContent = message
            msg.className = `message-item ${user._id === ownerUserId?'right':'left'}`
            document.getElementById('chat').appendChild(msg)
            var chat = document.getElementById('chat')
            chat.scrollTop = chat.scrollHeight
        })
        socket.on('is typing',name=>{
            console.log(name);
            document.getElementById('is-typing').value=name
        })
        
    },[])
    useEffect(()=>{
        const getPreviousMessages=()=>{
        
            getAllMessages(chatRoom._id)
            .then(data=>{
                setPreviousMessages(data)
                var chat = document.getElementById('chat')
                chat.scrollTop = chat.scrollHeight
            })
        }
        if(!loading){
            getPreviousMessages()
            socket.emit("connect chat",chatRoom._id)
        }
    },[loading])

    
    const uploadMessage=(e)=>{
        e.preventDefault()
        const messageData ={
            message:message,
            chatId: chatRoom._id,
            userId: user._id
        }
        socket.emit('new message',messageData)
        sendMessage(chatRoom._id,message)
        .then(data=>{
            // document.getElementById('msg-input').value=""
            setMessage("")
        })
        
    }
    const handleChange=(e)=>{
        setMessage(e.target.value)
        const userData ={
            username: user.username,
            chatId: chatRoom._id
        }
        socket.emit('is typing',userData)
    }
    const messagesList=()=>{
        
            return(
                <ul id="chat" className="messages-list">
                    {
                        prevoiusMessages.map((message)=>{
                            return(
                                <li key={message._id} 
                                 className={`message-item ${user._id === message.author_id?"right":"left"}`}>
                                        {message.message}
                                </li>
                            ) 
                        })
                    }
                </ul>
            )
    }
    return (
        <>
        {/* <div className="chat-page"> */}
            <Row sidePadding="huge" style={{height:"90vh"}}>
                <Portion>
                    <div>
                        <span onClick={()=> history.goBack()} style={{cursor:"pointer"}}>
                            <IoArrowBackSharp className='is-clickable' style={{fontSize:"25px",color:"#fd6868"}}/>
                        </span>
                    </div>
                    <p id="is-typing"></p>
                    {!loading && messagesList()}
                    <FormWrapper>
                        <Element as="div" className="vertically-center-items">
                        <FormItem marginBottom='none'>
                            <InputField
                                placeholder="Message" onChange={handleChange}
                                value={message}
                            />
                        </FormItem>
                        <FormItem>
                            <Button
                                kind='secondary'
                                onClick={uploadMessage}
                            >
                                Send
                            </Button>
                        </FormItem>
                        </Element>
                    </FormWrapper>
                    {/* <div style={{width:"100%",display:"flex"}}>
                        <form id="msg-form">
                            <input id="msg-input" type="text" placeholder="Message" onChange={handleChange}></input>
                            <button onClick={uploadMessage}>Send</button>
                        </form>
                    </div> */}
                </Portion>
            </Row>
            {/* <div className="chat-center">
                <div className="back-btn">
                    <span onClick={()=> history.goBack()} style={{cursor:"pointer"}}>
                        <IoArrowBackSharp className='is-clickable' style={{fontSize:"25px",color:"#fd6868"}}/>
                    </span>
                </div>
                <p id="is-typing"></p>
                {!loading && messagesList()}
                <div style={{width:"100%",display:"flex"}}>
                    <form id="msg-form">
                        <input id="msg-input" type="text" placeholder="Message" onChange={handleChange}></input>
                        <button onClick={uploadMessage}>Send</button>
                    </form>
                </div>
            </div> */}
        {/* </div> */}
        </>
    )
}

export default Chat
