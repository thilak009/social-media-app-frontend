import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {editProfile} from '../user'

function Profile() {

    const [values,setValues] = useState({
        formData: "",
        photo: ""
    })
    useEffect(()=>{
        setForm();
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

    return (
        <div>
            <Link to="/">Home</Link>
            <form>
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
    )
}

export default Profile
