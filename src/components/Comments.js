import React, { useEffect, useRef, useState } from 'react'
import { createComment, getComments } from '../user'
import '../CSS/post.css'
import { loadingAnimation } from './LoadingScreen'
import {AiOutlineClose} from 'react-icons/ai'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth'


function Comments({post,shown,close}) {

    const {user} =isAuthenticated()
    const {_id,title,description,postedBy,createdAt}=post

    const commentRef = useRef()
    const [comments,setComments] = useState([])
    const [show,setShow] = useState(false)
    const [loading,setLoading] = useState(false)

    useEffect(()=>{

    },[loading])
    useEffect(()=>{
        // setLoading(true)
        //TODO: see if you can stop loading data
        //whenevr comment button is clicked, may be store the
        //first response(comments) and display them if no new
        //comment is aadded
        fetchComments()
    },[])
    const fetchComments=()=>{
        getComments(post._id)
            .then(data=>{
                setComments(data)
                setShow(true)
                setLoading(false)
            })
            .catch(err=>console.log(err))
    }
    const comment=(e)=>{
        e.preventDefault()
        if(!commentRef.current.value){
            alert('please enter something')
        }
        else{
            const details = {
                postId : _id,
                comment: commentRef.current.value
            }
            createComment(details)
            .then(data=>{
                alert('commented successfully')
            })
        }
    }
    const profileClickable=()=>{
        if(window.location.pathname === '/'){
            return(
                <Link to={`/profile/${postedBy._id}`}>
                    <img src={profilePicUrl} className="profile-pic" alt="profile pic"/>
                </Link>
            )
        }
        else{
            return(
                <img src={profilePicUrl} className="profile-pic" alt="profile pic"/>
            )
        }
    }
    const profilePicUrl = user ? `${process.env.REACT_APP_BASE_URL}/user/profile/${postedBy._id}/photo` : ''

    const commentsContainer=()=>{
        return shown ?(
            <div className="comments-page">
                <div className="comments-container">
                    <div>
                        <AiOutlineClose style={{fontSize:"22px",cursor:"pointer"}} onClick={()=>close()}/>
                    </div>
                    <div className="post-user-info">
                        <div className="post-user">
                            {
                                profileClickable()
                            }
                            <div>
                                <h4>{postedBy.fullname}</h4>
                                <p style={{color:"grey"}}>@{postedBy.username}</p>
                            </div>
                        </div>
                        <h6>{moment(createdAt).format('MMMM Do YYYY, H:mm')}</h6>
                    </div>
                    <div className="post-info">
                        <h3 className="post-title">{title}</h3>
                        <p>{description}</p>
                    </div>
                    <form>
                        <input ref={commentRef} type="text" placeholder="comment"/>
                        <button onClick={comment}>Comment</button>
                    </form>
                    <div>
                        {   
                        show && (
                            comments.map((comment)=>{
                                return(
                                    <div key={comment._id}>
                                        <section className="comment-info">
                                            <div style={{display:"flex",gap:"3px"}}>
                                                <img src={`${process.env.REACT_APP_BASE_URL}/user/profile/${comment.userId._id}/photo`} className="comment-profile-pic"/>
                                                <div>
                                                    <p style={{fontSize:"15px"}}>{comment.userId.fullname}</p>
                                                    <p style={{fontSize:"13px",color:"grey"}}>@{comment.userId.username}</p>
                                                </div>
                                            </div>
                                            <div style={{padding:"5px 5px 0px 5px"}}>
                                                <p style={{fontSize:"15px"}}>{comment.comment}</p>
                                            </div>
                                        </section>
                                    </div>
                                )
                            })
                        )
                        }
                    </div>
                </div>
            </div>
        ):null;
    }
    return (
        <>
        {loading? loadingAnimation("bubbles") : commentsContainer()}
        </>
    )
}

export default Comments
