import React, { useEffect, useState } from 'react'
import { getUserPosts, getUserProfile } from '../user';
import Post from './Post';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { checkFollow, editProfile, removeFollow, setFollow,updateProfilePhoto} from '../user/profile';
import {AiOutlineEdit} from 'react-icons/ai'
import { isAuthenticated } from '../auth';
import '../CSS/profile.css'


function UserProfile() {

    const {user} = isAuthenticated()
    const {userId} = useParams()

    const [posts,setPosts] = useState([]);
    const [userProfile,setUserProfile] = useState({});
    const [showForm,setShowForm] = useState(false)
    const [followData,setFollowData] = useState({})
    const [images,setImages] = useState([]);
    const [selectedImage,setSelectedImage] = useState('')
    const [values,setValues] = useState({
        formData: "",
        photo: "",
        name:"",
        fullname: "",
        bio: ""
    })
    const {formData} = values;

    const setForm=()=>{
        setValues({...values, formData: new FormData()});
    }
    const getImages=async()=>{

        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/helper/get-images`,{
            method:"GET"
        })
        const data = await response.json();
        setImages(data);
        //console.log(data);
    }
    useEffect(()=>{

        getUserProfile(userId)
        .then(data=>{
            setUserProfile(data)
        })
        .catch(err=>console.log(err))

        getUserPosts(userId)
        .then(data=>{
            setPosts(data)
        })
        .catch(err=>console.log(err))

        setForm()
        if(userId === user._id){
            getImages()
        }
       
    },[])
    
    //for re-rendering when followed/unfollowed
    useEffect(()=>{
        checkFollow(userId)
        .then(data=>{
            setFollowData(data)
        })
        .catch(err=>console.log(err))
    },[followData])

    const handleChange= name => event =>{
        const value = name === "photo" ? event.target.files[0]:event.target.value;
        
        formData.set(name,value);
        setValues({...values, [name]:value});
    }
    const onSubmit=(e)=>{
        e.preventDefault();
        console.log(...formData);

        editProfile(formData)
        .then(data=>{
            if(data.error){
                console.log(data.error);
            }
            else{
                console.log(data);
                alert('profile updated')
            }
        })
        .catch(err=>console.log(err))
    }
    const showProfileEditForm=()=>{
        setShowForm(!showForm)
    }
    const removeAsFollower=()=>{

        removeFollow(userId)
        .then(data=>{
            setFollowData(...followData,{follow: false})
        })
        .catch(err=>console.log(err))
    }
    const setAsFollower=()=>{

        setFollow(userId)
        .then(data=>{
            setFollowData(...followData,{follow: true})
        })
        .catch(err=>console.log(err))
    }
    const updateImage=()=>{

        if(selectedImage){
            
            updateProfilePhoto(selectedImage)
            .then(data=>{
                console.log(data);
                alert('uploaded')
            })
            .catch(err=>console.log(err))
        }
        else{
            alert('select an image')
        }
    }
    const selectImage=(name)=>{

        setSelectedImage(name)
        document.getElementById(name).style.backgroundColor="#323d4d"
        images.map((image)=>{
            if(image.name !== name){
                document.getElementById(image.name).style.backgroundColor="#0b0e11"
            }
        })
    }
    //HTML return functions to make code more readable

    const userInfo=()=>{

        return(
            <div className="user-info">
                <img src={`${process.env.REACT_APP_BASE_URL}/user/profile/${userId}/photo`} alt="profile"/>
                <div className="user-details">
                    <div className="user-main">
                        <div>
                            <h3>{userProfile.fullname}</h3>
                            <p>@{userProfile.username}</p>
                        </div>
                        {
                            (userId === user._id) && <AiOutlineEdit onClick={showProfileEditForm} 
                                style={{fontSize:"20px",cursor:"pointer",marginLeft:"5px"}}/>
                        }
                        {
                            (userId !== user._id) && (
                                <div style={{marginLeft:"5px"}}>
                                    {
                                        followData.follow ? <button onClick={removeAsFollower}>Unfollow</button> :<button onClick={setAsFollower}>Follow</button>
                                    }
                                </div>
                            )
                        }
                    </div>
                    <div style={{display:"flex"}}>
                        <p>{followData.followers} Followers</p>
                        <p style={{marginLeft:"4px"}}>{followData.following} Following</p>
                    </div>
                    <div style={{}}> 
                        <p>{userProfile.bio}</p>
                        <p>Joined on : {moment(userProfile.date).format('MMMM YYYY')}</p>
                    </div>
                </div>
                
            </div>
        )
    }
    const userUpdateForm=()=>{
        
        if(userId === user._id && showForm){
            return(
                <div className="user-update-options">
                    <form className="image-update-form">
                        <div>
                            <label>Fullname :  </label><br/>
                            <input type="text" onChange={handleChange("fullname")} placeholder="Fullname" defaultValue={userProfile.fullname}
                             style={{width:"100%"}}/>
                        </div>
                        <div>
                            <label>Bio : </label><br/>
                            <textarea type="text" onChange={handleChange("bio")} placeholder="Bio" defaultValue={userProfile.bio}
                            style={{minHeight:"100px",width:"100%"}}/>
                        </div>
                        <p>Choose Image from your Device:</p><br/>
                        <input
                        onChange={handleChange("photo")}
                        type="file"
                        name="photo"
                        accept="image"
                        placeholder="choose a file"
                        />
                        <button type="submit" onClick={onSubmit}>
                            update user
                        </button>
                    </form>
                    <div className="profile-pics-container">
                        <p>Or choose from our amazing Catalog:</p><br/>
                        <div className="profile-pics-list">
                            {
                                images.map((image,index)=>{
                                    const url = `${process.env.REACT_APP_BASE_URL}/helper/${image.name}`
                                    return(
                                        <div onClick={()=> selectImage(image.name)}
                                        id={image.name} className="profile-pic-container" key={index}>
                                            <img src={url}  alt="none" className="profile-pic-image"/>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <button onClick={updateImage}>Save Image</button>
                </div>
            )
        }
    }
    const userPosts=()=>{
        return(
            <div className="posts">
                <div className="posts-container">
                {
                    posts.map((post,index)=>{
                        return(
                            <Post key={index} post={post}/>
                        )
                    })
                }
                </div>
            </div>
        )
    }

    return (
        <div className="user-profile-page">
            <div className="user-profile-center">
                {userInfo()}
                {userUpdateForm()}
                {userPosts()}
            </div>
        </div>
    )
}

export default UserProfile
