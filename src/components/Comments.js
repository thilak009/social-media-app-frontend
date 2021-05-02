import React, { useEffect, useState } from 'react'
import { getComments } from '../user'


function Comments({postId}) {

    const [comments,setComments] = useState()
    const [show,setShow] = useState(false)

    useEffect(()=>{
        //TODO: see if you can stop loading data
        //whenevr comment button is clicked, may be store the
        //first response(comments) and display them if no new
        //comment is aadded
        getComments(postId)
        .then(data=>{
            console.log(data);
            setComments(data)
            setShow(true)
        })
    },[])

    return (
        <div className="comments-container">
            {   show && (
                comments.map((comment,index)=>{
                    return(
                        <div key={index} className="comment-info">
                            <h4>{comment.userId.username}</h4>
                            <p>{comment.comment}</p>
                        </div>
                    )
                })
            )
            }
        </div>
    )
}

export default Comments
