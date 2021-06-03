import React,{useState,useEffect} from 'react'
import Signin from './components/Signin';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import PrivateRoute from './auth/PrivateRoute';
import Home from './components/Home';
import Signup from './components/Signup';
import UserProfile from './components/UserProfile';
import PageNotFound from './components/PageNotFound';
import Chat from './components/Chat';
import Comments from './components/Comments';
import UserCheckRoute from './auth/UserCheckRoute';
import { getAllPosts } from './user';
import PostsContext from './Context';
import { loadingScreen } from './components/LoadingScreen';


function App() {

  const [posts,setPosts] = useState([])
  const [lastId,setLastId] = useState('')
  const [loading,setLoading] = useState(false)
  const [extraPostsAvailable,setExtraPostsAvailable] = useState(true)
  
  useEffect(()=>{
      getData()
  },[])
  const getData=()=>{

      setLoading(true);
      getAllPosts(lastId)
      .then(data=>{
          setPosts([...posts,...data]);
          setLoading(false);
          setLastId(data.slice(-1)[0]._id)
      })
  }
  const loadMorePosts=()=>{
      getAllPosts(lastId)
      .then(data=>{
          setPosts([...posts,...data]);
          if(data.length>0){
              setLastId(data.slice(-1)[0]._id)
              setExtraPostsAvailable(true)
          }
          else{
              setExtraPostsAvailable(false)
          }
      })
  }
  return (
    <>
    {loading?loadingScreen():
      <Router>
        <Switch>
          <UserCheckRoute exact path='/signin' component={Signin}></UserCheckRoute>
          <UserCheckRoute exact path='/signup' component={Signup}></UserCheckRoute>
          <PrivateRoute exact path='/'>
            <PostsContext.Provider value={{
              posts,extraPostsAvailable,getData,loadMorePosts
            }}><Home/>
            </PostsContext.Provider>
          </PrivateRoute>
          <PrivateRoute exact path="/profile/:userId" component={UserProfile}></PrivateRoute>
          <PrivateRoute exact path="/:userId/chat" component={Chat}></PrivateRoute>
          <PrivateRoute exact path='/:userId/post/:postId'><Comments/></PrivateRoute>
          <Route path="*" component={PageNotFound}></Route>
        </Switch>
      </Router>
    }
    </>
  );
}

export default App;

