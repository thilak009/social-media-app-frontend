import React, { useContext, useEffect, useState } from 'react'
import { createPost, getAllPosts } from '../user';
import Navbar from './Navbar';
import Post from './Post';
import '../CSS/home.css';
import {loadingScreen} from './LoadingScreen';
import { useHistory } from 'react-router';
import { PostsContext } from '../context';


function Modal({ shown, close }) {
    
    const history = useHistory()
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
                alert('post created');
            })
            // document.getElementById('post-modal').style.display='none'
            close()
            history.goBack()
        }
        else{
            document.getElementById('post-error-message').style.display='block'
            setTimeout(()=>{
                document.getElementById('post-error-message').style.display='none'
            },2500)
        }
    }
    return shown ? (
      <div
        className="modal-backdrop"
        id="post-modal"
        onClick={() => [close(),history.goBack()]
          // close modal when outside of modal is clicked
        }
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
                <textarea type="text" onChange={handleChange("description")} placeholder="description" />
                <div><button type="submit" onClick={onSubmit} style={{fontSize:"18px"}}>Post</button></div>
            </form>
        </div>
      </div>
    ) : null;
}

function Home() {

    const history= useHistory()
    const {posts,loading,extraPostsAvailable,loadMorePosts} = useContext(PostsContext)
    const [modalShown, toggleModal] = useState(false)

    useEffect(()=>{
        var feed = document.getElementById("feed-scroll")
        feed.scrollTop = sessionStorage.getItem("pointer")?sessionStorage.getItem("pointer"):0
        return history.listen(location=>{
            if(history.action === "POP"){
                toggleModal(false)
            }
        })
    },[])

    const handleScroll=(e)=>{
        let element = e.target
        sessionStorage.setItem('pointer',element.scrollTop);
    }
    const homePage=()=>{
        return(
            <div className="home">
                <div className="navbar-feed">
                    <Navbar toggle={toggleModal}/>
                    <div className="feed" onScroll={handleScroll} id="feed-scroll">
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
                        <div style={{display:"flex",justifyContent:"center"}}>
                            {
                                extraPostsAvailable ?<button onClick={loadMorePosts}>See More Posts</button>:<p>You have reached the end of the road</p>
                            }
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
    return (
        <>
        {loading?loadingScreen():homePage()}
        </>
    )
}

export default Home