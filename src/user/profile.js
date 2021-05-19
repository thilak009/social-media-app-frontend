import { isAuthenticated } from "../auth";
const {user,token} = isAuthenticated();

export const editProfile = (formData)=>{

    return fetch(`${process.env.REACT_APP_BASE_URL}/user/profile/${user._id}/edit-profile`,{
        method:"PUT",
        headers:{
            "auth-token":token,
            //"Content-Type":"multipart/form-data"
        },
        body: formData
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))

}

export const uploadPhoto=(formData)=>{
    
    return fetch(`${process.env.REACT_APP_BASE_URL}/user/profile/${user._id}/upload-photo-to-catalog`,{
        method:"POST",
        headers:{
            "auth-token":token,
            //"Content-Type":"multipart/form-data"
        },
        body: formData
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))
}

export const updateProfilePhoto=(name)=>{

    return fetch(`${process.env.REACT_APP_BASE_URL}/user/profile/${user._id}/edit-profile-pic`,{
        method:"PUT",
        headers:{
            "auth-token":token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name
        })
    })
    .then(res=>{
        return res.json()
    })
    .catch(error=>console.log(error))
}

export const checkFollow=(userProfileId)=>{

    return fetch(`${process.env.REACT_APP_BASE_URL}/user/profile/${user._id}/follow/${userProfileId}`,{
        method: "GET",
        headers:{
            "auth-token":token,
        }
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))
}

export const setFollow=(userProfileId)=>{

    return fetch(`${process.env.REACT_APP_BASE_URL}/user/profile/${user._id}/follow/${userProfileId}`,{
        method:"PUT",
        headers:{
            "auth-token":token,
        }
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))
}

export const removeFollow =(userProfileId)=>{

    return fetch(`${process.env.REACT_APP_BASE_URL}/user/profile/${user._id}/unfollow/${userProfileId}`,{
        method:"PUT",
        headers:{
            "auth-token":token,
        }
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))
}

export const upVote=(postId)=>{

    return fetch(`${process.env.REACT_APP_BASE_URL}/user/${user._id}/${postId}/upvote`,{
        method:"PUT",
        headers:{
            "auth-token": token,
            "Content-Type": "application/json"
        },
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))
}

export const removeUpVote=(postId)=>{

    return fetch(`${process.env.REACT_APP_BASE_URL}/user/${user._id}/${postId}/remove-upvote`,{
        method:"PUT",
        headers:{
            "auth-token": token,
            "Content-Type": "application/json"
        },
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))
}

export const downVote=(postId)=>{
    return fetch(`${process.env.REACT_APP_BASE_URL}/user/${user._id}/${postId}/downvote`,{
        method:"PUT",
        headers:{
            "auth-token": token,
            "Content-Type": "application/json"
        },
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))
}

export const removeDownVote=(postId)=>{
    return fetch(`${process.env.REACT_APP_BASE_URL}/user/${user._id}/${postId}/remove-downvote`,{
        method:"PUT",
        headers:{
            "auth-token": token,
            "Content-Type": "application/json"
        },
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))
}