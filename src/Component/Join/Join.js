import React, { useState } from 'react';
import "./join.css";
import socketIo from 'socket.io-client';

import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
const ENDPOINT="http://localhost:8000/"
let user;

const Join = () => {
  const socket=socketIo(ENDPOINT,{transports:["websocket"]})
  socket.on("connect",()=>{
console.log("server socket connection done");
  })


  const [name,setName]=useState("");
  const sendUser=()=>{
   let valueOfInputTag=document.getElementById("name").value
   user=valueOfInputTag;
   
   console.log(name);
   valueOfInputTag="";
   }
  
  
  return (
    <div className="joinPage">
      <div className="joinContainer">
        <div className="upper">
          <img src={logo} alt="" />
          <h1>V CHAT</h1>
         
        </div>
        <div className="lower">
          <input onChange={(e)=>setName(e.target.value)} type="text" placeholder="Enter your Name" id="name" />
          <Link onClick={(e)=>name===""?e.preventDefault():null} to={"/chat"}>
            <button onClick={sendUser} className="button">Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Join;
export {user};
