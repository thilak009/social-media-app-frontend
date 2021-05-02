import React, { useEffect, useState } from 'react'
//import { isAuthenticated } from '../auth';
import { createPost, getAllPosts } from '../user';
import Navbar from './Navbar';
import Post from './Post';
import './CSS/home.css'


function Modal({ shown, close }) {
    
    const [postValues,setPostValues] = useState({
        title:"",
        description:""
    })
    const handleChange = name => event =>{
        setPostValues({...postValues, [name]: event.target.value})
    }
    const onSubmit=(e)=>{
        
        e.preventDefault()
        const {title,description} = postValues

        if(title && description){
            createPost({title,description})
            .then(data=>{
                console.log('post created');
            })
            // document.getElementById('post-modal').style.display='none'
            close()
        }
        else{
            document.getElementById('post-error-message').style.display='block'
        }
    }
    return shown ? (
      <div
        className="modal-backdrop"
        id="post-modal"
        onClick={() => {
          // close modal when outside of modal is clicked
          close();
        }}
      >
        <div
          className="modal-content"
          onClick={e => {
            // do not close modal if anything inside modal content is clicked
            e.stopPropagation();
          }}
        >
            <form>
                <h3>Create a post</h3>
                <p id="post-error-message">enter all details</p>
                <input type="text" onChange={handleChange("title")} placeholder="title" />
                <input type="text" onChange={handleChange("description")} placeholder="description" />
                <div><button type="submit" onClick={onSubmit}>Post</button></div>
            </form>
        </div>
      </div>
    ) : null;
  }

function Home() {

    const [modalShown, toggleModal] = useState(false);

    const [posts,setPosts] = useState([])

    useEffect(()=>{
        
    },[])

    const getData=()=>{

        getAllPosts()
        .then(data=>{
            setPosts(data);
        })
    }
    

    return (
        <div className="home">
            <div className="navbar-feed">
                <Navbar toggle={toggleModal}/>
                <div className="feed">
                    <button onClick={getData}>get posts</button>
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
                    <Modal
                        shown={modalShown}
                        close={() => {
                        toggleModal(false);
                        }}
                    >
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default Home
