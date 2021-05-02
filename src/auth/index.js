
export const signup=(user)=>{

    const {username,email,password} = user;
    return fetch('http://localhost:5500/api/user/register',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                username,email,password
            })
        })
        .then(res=>{
            return res.json()
        })
        .catch(error=>{
            console.log(error);
        })
}

export const signin=(user)=>{

    const {email,password} = user;
    return fetch('http://localhost:5500/api/user/login',{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            email,password
        })
    }).then(res=>res.json())
}

export const isAuthenticated=()=>{

    if(localStorage.getItem("token")){
        return JSON.parse(localStorage.getItem("token"));
    }
    else{
        return false;
    }
}