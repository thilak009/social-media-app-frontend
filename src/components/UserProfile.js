import React, { useEffect, useState } from 'react';
import { getUserPosts, getUserProfile } from '../user';
import Post from './Post';
import moment from 'moment';
import { Link,useHistory,useParams } from 'react-router-dom';
import { checkFollow, editProfile, removeFollow, setFollow,updateProfilePhoto, getImagesFromCatalog} from '../user/profile';
import {AiOutlineEdit} from 'react-icons/ai';
import {IoArrowBackSharp} from 'react-icons/io5';
import {AiOutlineMessage} from 'react-icons/ai'
import { isAuthenticated } from '../auth';
import '../CSS/profile.css';
import {loadingAnimation, loadingScreen} from './LoadingScreen';


function UserProfile() {

    const {user} = isAuthenticated()
    const {userId} = useParams()
    const history = useHistory()

    const [posts,setPosts] = useState([]);
    const [userProfile,setUserProfile] = useState({});
    const [showForm,setShowForm] = useState(false)
    const [followData,setFollowData] = useState({})
    const [followDataChanged,setFollowDataChanged] = useState(false)
    const [images,setImages] = useState([]);
    const [selectedImage,setSelectedImage] = useState('')
    const [values,setValues] = useState({
        formData: "",
        photo: "",
        name:"",
        fullname: "",
        bio: ""
    })
    const [loading,setLoading] = useState(false)
    const [picsLoading,setPicsLoading] = useState(false)
    const {formData} = values;

    const setForm=()=>{
        setValues({...values, formData: new FormData()});
    }
    const getImages=()=>{
        setPicsLoading(true)
        getImagesFromCatalog()
        .then(data=>{
            setImages(data)
            setPicsLoading(false)
        })
    }
    useEffect(()=>{

    },[loading,picsLoading])

    useEffect(()=>{
        setLoading(true)
        getUserProfile(userId)
        .then(data=>{
            setUserProfile(data)
        })
        .catch(err=>console.log(err))

        getUserPosts(userId)
        .then(data=>{
            setPosts(data)
            setLoading(false)
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
    },[followDataChanged])

    const handleChange= name => event =>{
        const value = name === "photo" ? event.target.files[0]:event.target.value;
        
        formData.set(name,value);
        setValues({...values, [name]:value});
    }
    const onSubmit=(e)=>{
        e.preventDefault();
        
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
            setFollowDataChanged(!followDataChanged)
        })
        .catch(err=>console.log(err))
    }
    const setAsFollower=()=>{

        setFollow(userId)
        .then(data=>{
            setFollowDataChanged(!followDataChanged)
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
            return image;
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
                        </div>
                        <div>
                        {
                            (userId === user._id) && <AiOutlineEdit onClick={showProfileEditForm} 
                                style={{fontSize:"20px",cursor:"pointer",marginLeft:"5px"}}/>
                        }
                        {
                            (userId !== user._id) && (
                                <div style={{marginLeft:"5px",display:'flex',gap:"10px"}}>
                                    <div>
                                    {
                                        followData.follow ? <button onClick={removeAsFollower}>Unfollow</button> :<button onClick={setAsFollower}>Follow</button>
                                    }
                                    </div>
                                    <div>
                                    <Link to={`/${userId}/chat`}><AiOutlineMessage style={{fontSize:"22px",color:"#fd4d4d",height:"25px"}}/></Link>
                                    </div>
                                </div>
                            )
                        }
                        </div>
                    </div>
                    <div>
                        <p>@{userProfile.username}</p>
                    </div>
                    <div style={{display:"flex"}}>
                        <p>{followData.followers} Followers</p>
                        <p style={{marginLeft:"4px"}}>{followData.following} Following</p>
                    </div>
                    <div> 
                        <p>{userProfile.bio}</p>
                        <p>Joined on : {moment(userProfile.date).format('MMMM YYYY')}</p>
                    </div>
                </div>
                
            </div>
        )
    }
    const profilePicsListToChoose=()=>{
        return(
            <div className="profile-pics-list">
                {
                    images.map((image)=>{
                        const url = `${process.env.REACT_APP_BASE_URL}/helper/${image.name}`
                        return(
                            <div key={image.name} onClick={()=> selectImage(image.name)}
                             id={image.name} className="profile-pic-container">
                                <img src={url}  alt="none" className="profile-pic-image"/>
                            </div>
                        )
                    })
                }
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
                        {
                            picsLoading?loadingAnimation():profilePicsListToChoose()
                        }
                    </div>
                    <button onClick={updateImage} style={{margin:"5px 0px 8px 0px"}}>Save Image</button>
                </div>
            )
        }
    }
    const userPosts=()=>{
        return(
            <div className="posts">
                <div className="posts-container">
                {
                    posts.map((post)=>{
                        return(
                            <Post key={post._id} post={post}/>
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
                <div className="back-button-container">
                        <span style={{fontSize:"25px",cursor:"pointer",color:"#fd6868"}} onClick={()=>history.goBack()}>
                            <IoArrowBackSharp/>
                        </span>
                </div>
                {
                    loading ? loadingScreen():[userInfo(),userUpdateForm(),userPosts()]
                }
            </div>
        </div>
    )
}

export default UserProfile
