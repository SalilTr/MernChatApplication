import React from 'react'
import "../Join/join.css"
const Message = ({user,message,classs}) => {
  if(user){
    return (
       
        <div className={`messageBox  ${classs}`}>
        <p><h6 >{user}<span>:{message}</span></h6> </p>
            
            </div>
       
        )
  }
  else
  return (
    <>
    <div className={`messageBox  ${classs}`}>
    <p><h6 >admin<span>:{message}</span></h6> </p>
        
        </div>
    </>
    )
}

export default Message
