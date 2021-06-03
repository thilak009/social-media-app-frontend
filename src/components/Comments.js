import React, { useEffect, useRef, useState } from 'react'
import { createComment, getComments, getPost } from '../user'
import '../CSS/post.css'
import { loadingAnimation } from './LoadingScreen'
import {AiOutlineClose} from 'react-icons/ai'
import moment from 'moment'
import { Link, useParams } from 'react-router-dom'
import { isAuthenticated } from '../auth'


function Comments() {

    const {user} =isAuthenticated()
    const {postId} = useParams()
    const [post,setPost] = useState({
        _id:"",
        postedBy:{
            _id:"",
            username: "",
            fullname: ""
        },
        createdAt: "",
        title:"",
        description:""
    })
    const commentRef = useRef()
    const [comments,setComments] = useState([])
    const [show,setShow] = useState(false)
    const [loading,setLoading] = useState(false)
    const [reloadComments,setReloadComments]= useState(false)
    
    useEffect(()=>{
        setLoading(true)
        getPost(postId)
        .then(data=>{
            setPost(data)
            setLoading(false)
        })
    },[])
    useEffect(()=>{
        setLoading(true)
        getComments(postId)
        .then(data=>{
            setComments(data)
            setShow(true)
            setLoading(false)
        })
        .catch(err=>console.log(err))
    },[reloadComments])
    
    const comment=(e)=>{
        e.preventDefault()
        if(!commentRef.current.value){
            alert('please enter something')
        }
        else{
            const details = {
                postId : post._id,
                comment: commentRef.current.value
            }
            createComment(details)
            .then(data=>{
                alert('commented successfully')
                setReloadComments(!reloadComments)
            })
        }
    }
    const profileClickable=()=>{
        if(post.postedBy){
            if(window.location.pathname.includes("post")){
                return(
                    <Link to={`/profile/${post.postedBy._id}`}>
                        <img src={`${process.env.REACT_APP_BASE_URL}/user/profile/${post.postedBy._id}/photo`} className="profile-pic" alt="profile pic"/>
                    </Link>
                )
            }
            else{
                return(
                    <img src={`${process.env.REACT_APP_BASE_URL}/user/profile/${post.postedBy._id}/photo`} className="profile-pic" alt="profile pic"/>
                )
            }
        }
    }

    const commentsContainer=()=>{
        return show ?(
            <div className="comments-page">
                <div className="comments-container">
                    
                    <div className="post-user-info">
                        <div className="post-user">
                            {
                                profileClickable()
                            }
                            <div>
                                <h4>{post.postedBy.fullname}</h4>
                                <p style={{color:"grey"}}>@{post.postedBy.username}</p>
                            </div>
                        </div>
                        <h6>{moment(post.createdAt).format('MMMM Do YYYY, H:mm')}</h6>
                    </div>
                    <div className="post-info post-info-in-modal">
                        <h3 className="post-title">{post.title}</h3>
                        <p>{post.description}</p>
                    </div>
                    <form>
                        <input ref={commentRef} type="text" placeholder="comment"/>
                        <button onClick={comment}>Comment</button>
                    </form>
                    <div className="actual-comments">
                        {   
                        show && (
                            comments.map((comment)=>{
                                return(
                                    <div key={comment._id}>
                                        <section className="comment-info">
                                            <div style={{display:"flex",gap:"3px"}}>
                                                <Link to={`/profile/${comment.userId._id}`}>      
                                                    <img src={`${process.env.REACT_APP_BASE_URL}/user/profile/${comment.userId._id}/photo`} className="comment-profile-pic"/>
                                                </Link>
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
