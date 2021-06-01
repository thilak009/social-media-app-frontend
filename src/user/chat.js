import { isAuthenticated } from "../auth";

export const checkChatRoom=(userId)=>{
    const {user,token} = isAuthenticated()
    return fetch(`${process.env.REACT_APP_BASE_URL}/user/chat/${user._id}/${userId}`,{
        method:"GET",
        headers:{
            "auth-token": token
        }
    })
    .then(res=>{
        return res.json()
    })
    .catch(err=>console.log(err))
}

export const getAllMessages=(chatId)=>{
    const {user,token} = isAuthenticated()
    return fetch(`${process.env.REACT_APP_BASE_URL}/user/chat/${user._id}/${chatId}/get-messages`,{
        method:"GET",
        headers:{
            "auth-token": token
        }
    })
    .then(res=>{
        return res.json()
    })
    .catch(err=>console.log(err))
}

export const sendMessage=(chatId,message)=>{
    const {user,token} = isAuthenticated()

    return fetch(`${process.env.REACT_APP_BASE_URL}/user/chat/${user._id}/${chatId}/send`,{
        method:"POST",
        headers:{
            "auth-token": token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message:message
         })
    })
    .then(res=>{
        return res.json()
    })
    .catch(err=>console.log(err))
}