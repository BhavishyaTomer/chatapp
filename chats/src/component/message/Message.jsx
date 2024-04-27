import React from 'react'
import './messgae.css'

const Message = ({user,message,classs}) => {

    if(user){
        return (
   
            <div className={`msgbox ${classs}`}>{`${user}: ${message}`}</div>
        
          )
    }
    else{
        return (

            <div className={`msgbox ${classs}`}>{`You : ${message}`}</div>

          )
    }
    
 
}

export default Message