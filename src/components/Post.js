import React, { useEffect, useRef, useState } from 'react';
import '../CSS/post.css';
import moment from 'moment';
import { createComment, deletePost } from '../user';
import { isAuthenticated } from '../auth';
import Comments from './Comments';
import {BiUpvote, BiDownvote} from 'react-icons/bi';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { upVote, removeUpVote, downVote, removeDownVote } from '../user/profile';

function Post({post}) {

    const {user} = isAuthenticated()
    const {_id,title,description,postedBy,createdAt,upvoted,downvoted,count}=post

    const commentRef = useRef()
    const postRef = useRef()
    
    const [commentField,setCommentField] = useState(false)
    const [upvote,setUpvote] = useState(upvoted)
    const [downvote,setDownvote] = useState(downvoted)
    const [votesCount,setVotesCount] = useState(count)

    useEffect(()=>{

    },[upvote,downvote])

    const removePost=()=>{
        
        const postInfo={
            postId: _id,
            userId: postedBy._id
        }
        deletePost(postInfo)
        .then(data=>{
            console.log('post deleted');
            postRef.current.style.display = 'none';
        })
        .catch(err=>console.log(err))
    }

    const comment=(e)=>{

        //TODO: need to prevent refresh so i think
        //i have to render comments as a separate route
        //or a whole new component
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
                console.log(data);
                setCommentField(false)
            })
        }
    }
    //TODO: why the hell redirect is not working
    const showUserProfile=()=>{
        
        return <Redirect to={`/profile/${postedBy._id}`}/>
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
    const checkAndUpvote=()=>{

        if(!upvote){
            upVote(_id)
            .then(data=>{
                setUpvote(true)
                downvote?setVotesCount(votesCount+2):setVotesCount(votesCount+1)
                setDownvote(false)
            })
            .catch(err=>console.log(err))
        }
        else{
            removeUpVote(_id)
            .then(data=>{
                setUpvote(false)
                setVotesCount(votesCount-1)
            })
            .catch(err=>console.log(err))
        }
    }
    const checkAndDownvote=()=>{
        if(!downvote){
            downVote(_id)
            .then(data=>{
                setDownvote(true)
                upvote?setVotesCount(votesCount-2):setVotesCount(votesCount-1)
                setUpvote(false)
            })
            .catch(err=>console.log(err))
        }
        else{
            removeDownVote(_id)
            .then(data=>{
                setDownvote(false)
                setVotesCount(votesCount+1)
            })
            .catch(err=>console.log(err))
        }
    }
    const profilePicUrl = user ? `${process.env.REACT_APP_BASE_URL}/user/profile/${postedBy._id}/photo` : ''
    
    return (
        <div className="single-post-container" ref={postRef}>
            <div className="post-user-info">
                <div className="post-user">
                    {
                        profileClickable()
                    }
                    <h4>{postedBy.username}</h4>
                </div>
                <h6>{moment(createdAt).format('MMMM Do YYYY, h:mm:ss a')}</h6>
            </div>
            <div className="post-info">
                <h3 className="post-title">{title}</h3>
                <p>{description}</p>
            </div>
            <div className="post-reactions">
                <div className="votes">
                    <BiUpvote style={{color: upvote && "#5575e7"}} onClick={checkAndUpvote}/>
                    <p>{votesCount}</p>
                    <BiDownvote style={{color: downvote && "#fd4d4d"}} onClick={checkAndDownvote}/>
                </div>
                {
                    (user._id === postedBy._id) && (
                        <button onClick={removePost}>delete</button>
                    )
                }
                <button onClick={()=> setCommentField(!commentField)}>{commentField ? 'close' : 'comment'}</button>
            </div>
            {
                commentField && (
                    <div>
                        <input ref={commentRef} type="text" placeholder="type something"></input>
                        <button onClick={comment}>comment</button>
                        <Comments postId={_id}/>
                    </div>
                )
            }
            
        </div>
    )
}

export default Post
