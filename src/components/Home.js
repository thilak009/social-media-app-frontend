import React, { useContext, useEffect, useState } from 'react'
import { createPost } from '../user';
import Navbar from './Navbar';
import Post from './Post';
import '../CSS/home.css';
import {loadingScreen} from './LoadingScreen';
import { useHistory } from 'react-router';
import { PostsContext } from '../context';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Card, FormWrapper, Heading, InputField, Portion, Row, TextArea } from 'fictoan-react';


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
               
               toast.info('Post created', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                });
            })
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
            <Card
                shape="rounded"
                padding="micro"
            >
                <FormWrapper>
                    <Heading as="h3" marginBottom="micro">Create a post</Heading>
                    <p id="post-error-message">enter all details</p>
                    <InputField
                        label="Question summary"
                        placeholder="short summary of the question"
                        onChange={handleChange("title")}
                    />
                    <TextArea
                        label="Description"
                        placeholder="Elaborate on the question"
                        onChange={handleChange("description")}
                    />
                    <Button
                        kind="primary"
                        type="submit" onClick={onSubmit}
                    >
                        Post
                    </Button>
                    {/* <input type="text" onChange={handleChange("title")} placeholder="title" /> */}
                    {/* <textarea type="text" onChange={handleChange("description")} placeholder="description" /> */}
                    {/* <div><button type="submit" onClick={onSubmit} style={{fontSize:"18px"}}>Post</button></div> */}
                </FormWrapper>
            </Card>
        </div>
      </div>
    ) : null;
}

function Home() {

    const history= useHistory()
    const {posts,loading,extraPostsAvailable,loadMorePosts} = useContext(PostsContext)
    const [modalShown, toggleModal] = useState(false)
    const [acknowledgeMessage,toggleAcknowledgeMessage] = useState(false)

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
            // <div className="home">
            <Row sidePadding="huge">
                <Portion>
                    {/* <div className="navbar-feed"> */}
                        <Navbar toggle={toggleModal}/>
                        <div className="feed" onScroll={handleScroll} id="feed-scroll">
                            {/* <div className="posts"> */}
                                {/* <div className="posts-container"> */}
                                {
                                    posts.map((post)=>{
                                        return(
                                            <Post key={post._id} post={post}/>
                                        )
                                    })
                                }
                                {/* </div> */}
                            {/* </div> */}
                            <div style={{display:"flex",justifyContent:"center"}}>
                                {

                                    extraPostsAvailable ?(
                                        <Button
                                            kind="primary"
                                            size="small"
                                            onClick={loadMorePosts}
                                        >
                                            See more posts
                                        </Button>
                                    )
                                    // <button onClick={loadMorePosts}>See More Posts</button>
                                    :
                                    <p>No more posts to fetch</p>
                                }
                            </div>
                            <Modal
                                shown={modalShown}
                                close={() => {
                                toggleModal(false);
                                }}
                            >
                            </Modal>
                            <ToastContainer
                                position="top-center"
                                autoClose={1000}
                                hideProgressBar
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable={false}
                                pauseOnHover
                                closeButton={false}
                                />
                        </div>
                    {/* </div> */}
                </Portion>
            </Row>
            // </div>
        )
    }
    return (
        <>
        {/* {loading?loadingScreen():homePage()} */}
        {homePage()}
        </>
    )
}

export default Home