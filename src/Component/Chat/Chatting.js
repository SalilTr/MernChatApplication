import "../Join/join.css"
import Message from "../message/Message";
import ReactScrollToBottom from "react-scroll-to-bottom"
import logo from "../../assets/logo.png"
import React, { useEffect ,useState} from "react";
import { user } from "../Join/Join";
import socketIo from "socket.io-client";
import { Link } from "react-router-dom";
const ENDPOINT = "http://localhost:8000/";
const Chatting = () => {
  const[id,setid]=useState("");
  const[messages,setMessages]=useState([]);
 
  
  useEffect(()=>{
    const socket=socketIo(ENDPOINT,{transports:["websocket"]})
    socket.on('connect', () => {
      console.log('Connected to server');
      setid(socket.id)
    });

 socket.emit("joined",{user})

  // second socket created inside whole circuit (io),lots of sockets can be created inside a circuit
  socket.on("welcome",(data)=>{
    setMessages([...messages,data])

     
   })
  // second socket created inside whole circuit (io),lots of sockets can be created inside a circuit
  socket.on("userJoined",(data)=>{
    setMessages([...messages,data])

    
   })
   socket.on("userDisconnected",(data)=>{
    setMessages([...messages,data])

     
    })
 return()=>{
 
  socket.emit("disconnected",{user})
 
  socket.off();
 }
  },[])
  useEffect(()=>{
    const socket=socketIo(ENDPOINT,{transports:["websocket"]})

    socket.on("userMessage",(data)=>{
      setMessages([...messages,data])
      console.log(data.message );
      console.log(data.id);
      console.log(data.user);
       console.log(messages);
      })
      return()=>{
        socket.off()
      }
  
  },[messages])
  const send=()=>{
    
    const socket=socketIo(ENDPOINT,{transports:["websocket"]})
    let message=document.getElementById("chatInput").value;
    
   socket.emit("message",{message,id});
   document.getElementById("chatInput").value="";
   console.log(`i m id:${id}`);
   console.log(message);
   
 }



  return (
    <div className="chatPAge">
      <div className="chatContainer">
        <div className="header"><Link to="/"><img src={logo} alt=""width={30} />V CHAT
        </Link>
        </div>
        <ReactScrollToBottom className="chatBox">
        {
          messages && messages.map((element,index)=>{
            return(
              <Message key={index} user={element.user} message={element.message} classs={element.id===id?"right":"left"} />
            )


          }
          )
        }
        
        </ReactScrollToBottom>
        <div className="inputBox">
        <input  type="text" id="chatInput"/>
        <button onClick={send} className="button"><i class="bi bi-send"></i></button>
        </div>
      </div>
    </div>
  );
};

export default Chatting;
