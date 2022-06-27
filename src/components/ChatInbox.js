import { Element, HRule, Portion, Row, Text } from 'fictoan-react'
import React,{useState,useEffect} from 'react'
import { getChatInbox } from '../user/profile'
import {IoArrowBackSharp} from 'react-icons/io5';
import { Link, useHistory } from 'react-router-dom';

function ChatInbox() {

    const [items,setItems] = useState([])
    const history = useHistory()

    useEffect(()=>{
        getChatInbox().then(data=>{
            setItems(data)
            console.log(data);
        }).catch(err=>console.log(err))
    },[])
  return (
    <Row sidePadding='huge'>
      <Portion>
        <div>
            <span onClick={()=> history.goBack()} style={{cursor:"pointer"}}>
                <IoArrowBackSharp className='is-clickable' style={{fontSize:"25px",color:"#fd6868"}}/>
            </span>
        </div>
      </Portion>
      {
        items.length>0 && (
          items.map(item=>{
            return(
              <Portion key={item.chat_id} className="is-clickable">
                <Link to={`/${item.other_user_details._id}/chat`}>
                  <HRule kind='secondary' marginTop='nano' marginBottom='nano'/>
                  <Element as="div" className="vertically-center-items">
                    <img src={`${process.env.REACT_APP_BASE_URL}/user/profile/${item.other_user_details._id}/photo`} className="profile-pic" alt="profile pic" />
                    <Element as="div">
                      <Text size="large">{item.other_user_details.fullname}</Text>
                      <Text>{item.last_message}</Text>
                    </Element>
                  </Element>
                </Link>
              </Portion>
            )
          })
        )
      }
    </Row>
  )
}

export default ChatInbox