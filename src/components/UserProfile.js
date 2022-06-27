import React, { useEffect, useState } from 'react';
import { getUserPosts, getUserProfile } from '../user';
import Post from './Post';
import moment from 'moment';
import { Link,useHistory,useParams } from 'react-router-dom';
import { checkFollow, editProfile, removeFollow, setFollow,updateProfilePhoto, getImagesFromCatalog, uploadAndRegisterUsers, updatePassword} from '../user/profile';
import {IoArrowBackSharp} from 'react-icons/io5';
import { isAuthenticated } from '../auth';
import '../CSS/profile.css';
import {loadingAnimation, loadingScreen} from './LoadingScreen';
import { Button, Card, Element, FormWrapper, Heading, InputField, Portion, Row, Text } from 'fictoan-react';
import {ReactComponent as EditIcon} from "../assets/edit.svg"
import { useQuery } from 'react-query';


function UserProfile() {

    const {user} = isAuthenticated()
    const {userId} = useParams()
    const history = useHistory()

    const {data,isFetching,isError} =useQuery(["posts",user._id], async()=>{
        const {user,token} = isAuthenticated()
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/user/${user._id}/profile/${userId}/posts`,{
            method:"GET",
            headers:{
                "auth-token": token,
                "Content-Type": "application/json",
            }
        })
        if(!response.ok){
            throw new Error("Network response was not ok")
        }
        return response.json()
    })

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

    const [addUsersFormIsOpen,setAddUsersFormIsOpen] = useState(false)
    const [registerUsersFile,setRegisterUsersFile] = useState(undefined)
    const [registerUsersError,setRegisterUsersError] = useState([])

    const [updatePasswordIsOpen,setUpdatePasswordIsOpen] = useState(false)
    const [currentPassword,setCurrentPassword] = useState("")
    const [newPassword,setNewPassword] = useState("")

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
    const registerUsers=(e)=>{
        e.preventDefault();
        const formdata = new FormData()
        formdata.append("file",registerUsersFile,registerUsersFile.name)
        uploadAndRegisterUsers(formdata).then(res=>{
            if(res?.failure?.length>0){
                setRegisterUsersError(res.failure)
            }
        })
        .catch(err=>{
            console.log(err);
        })
    }
    const updatePasswordForUser=(e)=>{
        e.preventDefault();
        updatePassword({currentPassword,newPassword}).then(res=>{
            if(res.error){
                alert(res.error)
            }
            else{
                alert("password changed")
                setUpdatePasswordIsOpen(false)
                setCurrentPassword("")
                setNewPassword("")
            }
        }).catch(err=>{
            console.log(err);
        })
    }
    //HTML return functions to make code more readable

    const userInfo=()=>{

        return(
            <div className="user-info">
                <img src={`${process.env.REACT_APP_BASE_URL}/user/profile/${userId}/photo`} alt="profile"/>
                <div className="user-details">
                    <div className="user-main">
                        <Element as="div" className='vertically-center-items'>
                            <Heading as="h3" marginRight='nano'>{userProfile.fullname}</Heading>
                            {
                                (userId === user._id) && <EditIcon className='is-clickable' onClick={showProfileEditForm} />
                                    // style={{fontSize:"20px",cursor:"pointer",marginLeft:"5px"}}/>
                            }
                        </Element>
                        <div>
                        {
                            (userId !== user._id) && (
                                <div style={{marginLeft:"5px",display:'flex',gap:"10px"}}>
                                    <div>
                                    {
                                        // followData.follow ? <Button bgColour='red-20' borderColour='red-90' textColour='red-90' size='small' onClick={removeAsFollower}>Unfollow</Button>:<Button kind='secondary' size='small' onClick={setAsFollower}>Follow</Button>
                                    }
                                    </div>
                                    <div>
                                    <Link to={`/${userId}/chat`}>
                                        {/* <AiOutlineMessage style={{fontSize:"22px",color:"red",height:"25px"}}/> */}
                                        <Button
                                            kind='primary'
                                            size="small"
                                        >
                                            Message
                                        </Button>
                                    </Link>
                                    </div>
                                </div>
                            )
                        }
                        </div>
                    </div>
                    <div> 
                        <p>{userProfile.bio}</p>
                        <p>Joined on : {moment(userProfile.date).format('MMMM YYYY')}</p>
                    </div>
                    {
                        user._id===userProfile._id && userProfile.role==="Admin" && (
                            <Element as="div" marginTop='nano'>
                                <Button
                                    kind='primary'
                                    size='small'
                                    onClick={()=> setAddUsersFormIsOpen(true)}
                                >
                                    Add users
                                </Button>
                            </Element>
                        )
                    }
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
                    <Card
                        shape="rounded"
                        padding="micro"
                        marginBottom="micro"
                    >
                        <FormWrapper marginBottom='micro'>
                            <InputField
                                label="Name"
                                onChange={handleChange("fullname")}
                                defaultValue={userProfile.fullname}
                            />
                            <InputField
                                label="Bio"
                                placeholder="short bio about yourself"
                                onChange={handleChange("bio")}
                                defaultValue={userProfile.bio}
                            />
                            <InputField
                                type="file"
                                label="Choose Image form your device"
                                onChange={handleChange("photo")}
                            />
                            <Element as="div" className="vertically-center-items">
                                <Button kind="primary" size="small" onClick={onSubmit}>
                                    Update user
                                </Button>
                                <Button
                                    kind="secondary"
                                    size="small"
                                    marginLeft="micro"
                                    onClick={()=> setShowForm(false)}
                                >
                                    Cancel
                                </Button>
                            </Element>
                        </FormWrapper>
                        {
                            !updatePasswordIsOpen &&(
                                <Button
                                    kind='primary'
                                    size='small'
                                    onClick={()=> setUpdatePasswordIsOpen(true)}
                                >
                                    Change Password ?
                                </Button>
                            )
                        }
                        <FormWrapper onSubmit={updatePasswordForUser}>
                            {
                                updatePasswordIsOpen && (
                                    <>
                                        <InputField
                                            label='Current password'
                                            onChange={(e)=> setCurrentPassword(e.currentTarget.value)}
                                        />
                                        <InputField
                                            label='New password'
                                            onChange={(e)=> setNewPassword(e.currentTarget.value)}
                                        />
                                        <Element as="div" marginTop="nano">
                                            <Button kind="primary" size="small"
                                                disabled={!currentPassword || !newPassword}
                                            >
                                                Update password
                                            </Button>
                                            <Button
                                                kind="secondary"
                                                size="small"
                                                marginLeft='micro'
                                                type='button'
                                                onClick={()=> setUpdatePasswordIsOpen(false)}
                                            >
                                                Cancel
                                            </Button>
                                        </Element>
                                    </>
                                )
                            }
                        </FormWrapper>
                    </Card>
                </div>
            )
        }
    }
    const userPosts=()=>{
        return(
            <div className="posts">
                <div className="posts-container">
                {
                    data && data.map((post)=>{
                        return(
                            <Post key={post._id} post={post}/>
                        )
                    })
                }
                </div>
            </div>
        )
    }
    const addUsersForm=()=>{
        if(addUsersFormIsOpen){
            return(
                <Element as="div">
                    <Card
                        shape="rounded"
                        padding="micro"
                        marginBottom="micro"
                    >
                        <FormWrapper onSubmit={registerUsers}>
                            <InputField
                                type='file'
                                label='Upload a xlsx sheet'
                                accept='.xlsx'
                                onChange={(e)=> e.currentTarget.files?setRegisterUsersFile(e.currentTarget.files[0]):setRegisterUsersFile(undefined)}
                            />
                            <Element as="div" className='vertically-center-items'>
                                <Button
                                    kind='primary'
                                    size='small'
                                    type='submit'
                                    disabled={!registerUsersFile}
                                >
                                    Create users
                                </Button>
                                <Button
                                    kind='secondary'
                                    size='small'
                                    type='button'
                                    marginLeft='micro'
                                    onClick={()=> {
                                        setAddUsersFormIsOpen(false)
                                        setRegisterUsersError([])
                                    }}
                                >
                                    Cancel
                                </Button>
                            </Element>
                        </FormWrapper>
                        <Element as="div">
                            {
                                registerUsersError.length>0 && (
                                    registerUsersError.map((error,index)=>{
                                        return <Text key={index} textColour="red-80">{error}</Text>
                                    })
                                )
                            }
                        </Element>
                    </Card>
                </Element>
            )
        }
    }
    return (
        <>
            <Row sidePadding="huge">
                <Portion>
                    <div className="back-button-container">
                        <span style={{fontSize:"25px",cursor:"pointer",color:"#fd6868"}} onClick={()=>history.goBack()}>
                            <IoArrowBackSharp/>
                        </span>
                    </div>
                    {
                        loading ? loadingScreen():[userInfo(),addUsersForm(),userUpdateForm(),userPosts()]
                    }
                </Portion>
            </Row>
        </>
    )
}

export default UserProfile
