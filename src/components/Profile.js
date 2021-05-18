import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {editProfile,updateProfilePhoto,uploadPhoto} from '../user/profile'
import '../CSS/profile.css'
import { isAuthenticated } from '../auth';
import UserProfile from './UserProfile';



function Profile() {

    const {user} = isAuthenticated();

    const [values,setValues] = useState({
        formData: "",
        photo: "",
        name:"",
        fullname: "",
        bio: ""
    })
    const [images,setImages] = useState([]);
    const [selectedImage,setSelectedImage] = useState('')

    const getImages=async()=>{
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/helper/get-images`,{
            method:"GET"
        })
        const data = await response.json();
        setImages(data);
        //console.log(data);
    }

    useEffect(()=>{
        setForm();
        getImages();
    },[])

    const setForm=()=>{
        setValues({...values, formData: new FormData()});
    }
    
    const {formData} = values;

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
                alert('profile pic updated')
            }
        })
        .catch(err=>console.log(err))
    }
    const uploadPhotoToCatalog=(e)=>{
        e.preventDefault()

        uploadPhoto(formData)
        .then(data=>{
            if(data.error){
                console.log(data.error);
            }
            else{
                console.log(data);
                alert('photo uploaded')
            }
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

    return (
        <div className="profile-page">
            <div className="profile-page-elements">
                <Link to="/">Home</Link>
                <div className="user-info">
                    <div className="user-info-display">
                        <img src={`${process.env.REACT_APP_BASE_URL}/user/profile/${user._id}/photo`} alt="profile"/>
                        <div className="user-details">
                            <h4>Thilak</h4>
                            <p>@username</p>
                            <p>Joined on : </p>
                        </div>
                    </div>
                    <form className="image-update-form">
                        <input type="text" onChange={handleChange("fullname")} placeholder="Fullname"/>
                        <input type="text" onChange={handleChange("bio")} placeholder="Bio"/>
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
                </div>
                <form className="image-update-form">
                    <input
                    onChange={handleChange("photo")}
                    type="file"
                    name="photo"
                    accept="image"
                    placeholder="choose a file"
                    />
                    <input type="text" onChange={handleChange("name")} placeholder="name"/>
                    <button type="submit" onClick={uploadPhotoToCatalog}>
                        upload photo
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
                {/* <UserProfile userId={user._id}/> */}
            </div>
        </div>
    )
}

export default Profile
