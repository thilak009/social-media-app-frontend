import React,{useState,useEffect} from 'react'
import { getAllPosts } from './user'

const PostsContext = React.createContext()


function PostsProvider({children}){

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
            setPosts(data);
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
        <PostsContext.Provider value={{
            posts,setPosts,
            extraPostsAvailable,setExtraPostsAvailable,
            loading,setLoading,
            loadMorePosts
        }}>
            {children}
        </PostsContext.Provider>
    )
}

export {PostsContext,PostsProvider}