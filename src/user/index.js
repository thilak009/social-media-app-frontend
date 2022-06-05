import { isAuthenticated } from "../auth";

export const getAllPosts=(lastId)=>{
    
    const {user,token} = isAuthenticated()
    return fetch(`${process.env.REACT_APP_BASE_URL}/user/${user._id}/`,{
        method:"GET",
        headers:{
            "auth-token": token,
            "Content-Type": "application/json",
            "lastId": lastId
        }
    })
    .then(res=>{
        return res.json()
    })
    .catch(err=>{console.log(err)})
}

export const getUserProfile=(userId)=>{

    const {user,token} = isAuthenticated()

    return fetch(`${process.env.REACT_APP_BASE_URL}/user/${user._id}/profile/${userId}`,{
        method:"GET",
        headers:{
            "auth-token": token,
            "Content-Type": "application/json",
        }
    })
    .then(res=>{
        return res.json()
    })
    .catch(err=>console.log(err))
}

export const getUserPosts=(userId)=>{

    const {user,token} = isAuthenticated()

    return fetch(`${process.env.REACT_APP_BASE_URL}/user/${user._id}/profile/${userId}/posts`,{
        method:"GET",
        headers:{
            "auth-token": token,
            "Content-Type": "application/json",
        }
    })
    .then(res=>{
        return res.json()
    })
    .catch(err=>console.log(err))
}

export const getPost=(postId)=>{
    const {user,token} = isAuthenticated()
    return fetch(`${process.env.REACT_APP_BASE_URL}/user/${user._id}/${postId}`,{
        method:"GET",
        headers:{
            "auth-token": token,
            "Content-Type": "application/json",
        }
    })
    .then(res=>{
        return res.json()
    })
    .catch(err=>console.log(err))
}

export const createPost=(post)=>{

    const {user , token} = isAuthenticated()
    const {title,description,tag}=post
    
    return fetch(`${process.env.REACT_APP_BASE_URL}/user/${user._id}/create-post/`,{
        method: "POST",
        headers:{
            "auth-token": token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title,
            description,
            tag
        })
    })
    .then(res=>{
        return res.json()
    })
    .catch(err=>console.log(err))
}

export const deletePost=(postInfo)=>{

    const {userId, postId} = postInfo
    const {token} = isAuthenticated()

    return fetch(`${process.env.REACT_APP_BASE_URL}/user/${userId}/delete-post/${postId}`,{
        method: "DELETE",
        headers:{
            "auth-token": token,
            "Content-Type": "application/json"
        }
    })
    .then(res=>{
        return res.json()
    })
    .catch(err=>console.log(err))
}

export const createComment=(details)=>{

    const {token,user} = isAuthenticated()
    const {postId, comment} = details

    return fetch(`${process.env.REACT_APP_BASE_URL}/user/${user._id}/${postId}/comment`,{
        method:"POST",
        headers:{
            "auth-token": token,
            "Content-Type": "application/json"
        },
        body:JSON.stringify({
            comment: comment
        })
    })
    .then(res=>{
        return res.json()
    })
    .catch(err=>console.log(err))
}

export const getComments=(postId)=>{

    const {user,token} = isAuthenticated()
    return fetch(`${process.env.REACT_APP_BASE_URL}/user/${user._id}/${postId}/get-comments`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            "auth-token": token
        }
    })
    .then(res=>{
        return res.json()
    })
    .catch(err=>console.log(err))
}