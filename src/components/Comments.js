import React, { useEffect, useState } from 'react'
import { getComments } from '../user'
import '../CSS/post.css'
import { loadingAnimation } from './LoadingScreen'

function Comments({postId}) {

    const [comments,setComments] = useState()
    const [show,setShow] = useState(false)
    const [loading,setLoading] = useState(false)

    useEffect(()=>{

    },[loading])
    useEffect(()=>{
        setLoading(true)
        //TODO: see if you can stop loading data
        //whenevr comment button is clicked, may be store the
        //first response(comments) and display them if no new
        //comment is aadded
        getComments(postId)
        .then(data=>{
            setComments(data)
            setShow(true)
            setLoading(false)
        })
        .catch(err=>console.log(err))
    },[])

    const commentsContainer=()=>{
        return(
            <div className="comments-container">
                {   
                show && (
                    comments.map((comment)=>{
                        return(
                            <div key={comment._id}>
                                <section className="comment-info">
                                    <div style={{display:"flex",gap:"3px"}}>
                                    <p style={{fontSize:"15px"}}>{comment.userId.fullname}</p>
                                    <p style={{fontSize:"13px",color:"grey"}}>@{comment.userId.username}</p>
                                    </div>
                                    <p style={{fontSize:"12px"}}>{comment.comment}</p>
                                </section>
                            </div>
                        )
                    })
                )
                }
            </div>
        )
    }
    return (
        <>
        {loading? loadingAnimation("bubbles") : commentsContainer()}
        </>
    )
}

export default Comments
