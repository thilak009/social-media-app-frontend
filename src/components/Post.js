import React, { useEffect, useRef, useState } from 'react';
import '../CSS/post.css';
import moment from 'moment';
import { createComment, deletePost } from '../user';
import { isAuthenticated } from '../auth';
import {BiUpvote, BiDownvote} from 'react-icons/bi';
import {AiOutlineClose} from 'react-icons/ai'
import { Link } from 'react-router-dom';
import { upVote, removeUpVote, downVote, removeDownVote, getVoteDetails } from '../user/profile';
import {useHistory} from 'react-router-dom';
import {ConfirmDialog} from './Dialog';
import { Button, Card, Element, HRule, Portion, Row, TextArea } from 'fictoan-react';

function CommentModal({post,shown,close}){

    const history = useHistory()
    const {user} = isAuthenticated()
    const {_id,title,description,postedBy,createdAt}=post
    const commentRef = useRef()
    
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
                console.log(data)
                close()
                history.goBack()
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
    return shown ? (
        <div className="modal-backdrop" onClick={()=>[close(),history.goBack()]}>
            <Row sidePadding="huge">
                <Portion>
                    <Element as="div" onClick={e=>{e.stopPropagation()}}>
                        <Card
                            shape="rounded"
                            padding="micro"
                        >
                            {/* <AiOutlineClose style={{fontSize:"22px",backgroundColor:"black",cursor:"pointer"}} onClick={()=>[close(),history.goBack()]}/> */}
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
                            <div className="post-info post-info-in-modal">
                                <h3 className="post-title">{title}</h3>
                                <p>{description}</p>
                            </div>
                            {/* <div style={{display:"block",padding:"5px"}}> */}
                                <Element as="div" className='vertically-center-items push-to-ends' marginTop='nano'>
                                    <TextArea
                                        ref={commentRef}
                                        placeholder="Reply"
                                    />
                                    <Button
                                        kind="secondary"
                                        size="small"
                                        marginLeft="micro"
                                        onClick={comment}
                                    >
                                        Comment
                                    </Button>
                                    {/* <textarea ref={commentRef} type="text" placeholder="Reply"></textarea> */}
                                    {/* <button onClick={comment}>comment</button> */}
                                </Element>
                            {/* </div> */}
                        </Card>
                    </Element>
                </Portion>
            </Row>
            {/* <div className="comment-modal" onClick={e=>{e.stopPropagation()}}>
                <div style={{padding:"5px"}}>
                    <AiOutlineClose style={{fontSize:"22px",cursor:"pointer"}} onClick={()=>[close(),history.goBack()]}/>
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
                <div className="post-info post-info-in-modal">
                    <h3 className="post-title">{title}</h3>
                    <p>{description}</p>
                </div>
                <div style={{display:"block",padding:"5px"}}>
                    <textarea id="comment-teaxtarea" ref={commentRef} type="text" placeholder="Reply"></textarea>
                    <button onClick={comment}>comment</button>
                </div>
            </div> */}
        </div>
    ) :null;
}

function Post({post}) {

    const history = useHistory()
    const {user} = isAuthenticated()
    const {_id,title,description,postedBy,createdAt}=post

    const postRef = useRef()

    const [modalShown,toggleModalShown] = useState(false)
    const [postModal,togglePostModal] = useState(false)
    const [voteDetails,setVoteDetails] = useState({})
    const [votesChanged,setVotesChanged] = useState(false)
    const [dialog,toggleDialog] = useState(false)

    useEffect(()=>{

        return history.listen(location=>{
            if(history.action === "POP"){
                toggleModalShown(false)
                togglePostModal(false)
                toggleDialog(false)
            }
        })
    },[])
    useEffect(()=>{
        getVoteDetails(_id)
        .then(data=>{
            setVoteDetails(data)
        })
        .catch(err=>console.log(err))
    },[votesChanged])

    const {upvoted,downvoted,upvoteCount,downvoteCount} = voteDetails

    const removePost=()=>{
        
        const postInfo={
            postId: _id,
            userId: postedBy._id
        }
        deletePost(postInfo)
        .then(data=>{
            postRef.current.style.display = 'none';
        })
        .catch(err=>console.log(err))
    }
    const profileClickable=()=>{
        if(window.location.pathname === "/"){
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

        if(!upvoted){
            upVote(_id,downvoted)
            .then(data=>{
                setVotesChanged(!votesChanged)
            })
            .catch(err=>console.log(err))
        }
        else{
            removeUpVote(_id)
            .then(data=>{
                setVotesChanged(!votesChanged)
            })
            .catch(err=>console.log(err))
        }
    }
    const checkAndDownvote=()=>{
        if(!downvoted){
            downVote(_id,upvoted)
            .then(data=>{
                setVotesChanged(!votesChanged)
            })
            .catch(err=>console.log(err))
        }
        else{
            removeDownVote(_id)
            .then(data=>{
                setVotesChanged(!votesChanged)
            })
            .catch(err=>console.log(err))
        }
    }

    const profilePicUrl = user ? `${process.env.REACT_APP_BASE_URL}/user/profile/${postedBy._id}/photo` : ''
    
    return (
        // <div className="single-post-container" ref={postRef}>
        <>
            <Card
                shape="rounded"
                padding="nano"
                marginBottom="nano"
            >
                <Row marginBottom="none" gutters="micro">
                    <Portion>
                        <Element as="div" className='vertically-center-items push-to-ends'>
                            <Element as="div" className='vertically-center-items'>
                                {
                                    profileClickable()
                                }
                                <div>
                                    <h4>{postedBy.fullname}</h4>
                                    <p style={{color:"grey"}}>@{postedBy.username}</p>
                                </div>
                            </Element>
                            <Element as="div">
                                <h6>{moment(createdAt).isSame(moment(),'day')?moment(createdAt).fromNow():moment(createdAt).format('MMMM Do YYYY, H:mm')}</h6>
                            </Element>
                        </Element>
                        <HRule kind="primary" marginTop="none" marginBottom="none"/>
                    </Portion>
                    <Portion>
                        <Link to={`/${user._id}/post/${_id}`}>
                            <div className={`post-info ${description.length > 1000?"post-info-in-modal":""}`}
                                style={{cursor:"pointer"}}>
                                <h3 className="post-title">{title}</h3>
                                <p>{description}</p>
                            </div>
                        </Link>
                        <HRule kind="primary" marginTop="nano" marginBottom="none"/>
                    </Portion>
                    <Portion>
                        {/* <div className="post-reactions"> */}
                        <Element as="div" className='vertically-center-items push-to-ends'>
                            <Element as="div" className='vertically-center-items'>
                                <BiUpvote style={{color: upvoted && "#5575e7"}} className="is-clickable" onClick={checkAndUpvote}/>
                                <p>{upvoteCount?upvoteCount:0}</p>
                                <BiDownvote style={{color: downvoted && "#fd4d4d"}} className="is-clickable" onClick={checkAndDownvote}/>
                                <p>{downvoteCount?downvoteCount:0}</p>
                            </Element>
                            {
                                (user._id === postedBy._id) && (
                                    <Button
                                        bgColour="red-30"
                                        borderColour="red-90"
                                        textColour="red"
                                        size="small"
                                        onClick={()=> [toggleDialog(!dialog),history.push("#delete")]}
                                    >
                                        Delete
                                    </Button>
                                    // <button onClick={()=> [toggleDialog(!dialog),history.push("#delete")]}>delete</button>
                                )
                            }
                            <Button
                                kind="secondary"
                                size="small"
                                onClick={()=> [toggleModalShown(!modalShown),history.push('#comment')]}
                            >
                                Comment
                            </Button>
                            {/* <button onClick={()=> [toggleModalShown(!modalShown),history.push('#comment')]}>Comment</button> */}
                        </Element>
                        {/* </div> */}
                    </Portion>
                </Row>
            </Card>
            {/* <div className="post-user-info">
                <div className="post-user">
                    {
                        profileClickable()
                    }
                    <div>
                        <h4>{postedBy.fullname}</h4>
                        <p style={{color:"grey"}}>@{postedBy.username}</p>
                    </div>
                </div>
                <h6>{moment(createdAt).isSame(moment(),'day')?moment(createdAt).fromNow():moment(createdAt).format('MMMM Do YYYY, H:mm')}</h6>
            </div>
            <Link to={`/${user._id}/post/${_id}`}>
            <div className={`post-info ${description.length > 1000?"post-info-in-modal":""}`}
                style={{cursor:"pointer"}}>
                <h3 className="post-title">{title}</h3>
                <p>{description}</p>
            </div>
            </Link>
            <div className="post-reactions">
                <div className="votes">
                    <BiUpvote style={{color: upvoted && "#5575e7"}} onClick={checkAndUpvote}/>
                    <p>{upvoteCount?upvoteCount:0}</p>
                    <BiDownvote style={{color: downvoted && "#fd4d4d"}} onClick={checkAndDownvote}/>
                    <p>{downvoteCount?downvoteCount:0}</p>
                </div>
                {
                    (user._id === postedBy._id) && (
                        <button onClick={()=> [toggleDialog(!dialog),history.push("#delete")]}>delete</button>
                    )
                }
                <button onClick={()=> [toggleModalShown(!modalShown),history.push('#comment')]}>Comment</button>
            </div> */}
            <CommentModal 
                post={post}
                shown={modalShown}
                close={()=>{toggleModalShown(false)}}>
            </CommentModal>
            {
                dialog && <ConfirmDialog message="Are you sure you want to delete post"
                     action={removePost} close={()=> toggleDialog(false)}/>
            }
        </>
        // </div>
    )
}

export default Post