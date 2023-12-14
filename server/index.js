const express=require("express");
const http=require("http")
const socketIo=require("socket.io")
const cors=require("cors")
const app=express();

// creating server
const server=http.createServer(app);

// attaching server with socket as server is backend and socket is used in frontend to create connection between frontend and backend
const io=socketIo(server);
// creating route
app.get("/",(req,res)=>{
  res.send("from server side")
})
// creating an array for all users
const users=[];



// As the connection gets established between server and socket by method on

io.on("connection",(socket)=>{
  console.log("connection bw socket and server done");
  // first socket created inside whole circuit (io),lots of sockets can be created inside a circuit
  socket.on("joined",({user})=>{
   users[socket.id]=user; 
  console.log(`${user} joined`);
   
  socket.emit("welcome",{message:`${users[socket.id]} u are welcome`})
  socket.broadcast.emit("userJoined",{message:`${users[socket.id]} joined the chat`})
  
  

  })
//  creating socket for disconnecting the user and disconnection in done from client side
// because buttons are there on client side 
  socket.on("disconnected",()=>{
    
    socket.broadcast.emit("userDisconnected",{message:`${users[socket.id]} has left the chat`})

  console.log(`${users[socket.id]} left`);
   
  // socket.emit("welcome",{message:`${users[socket.id]} u are welcome`})
  // socket.broadcast.emit("userJoined",{message:`${users[socket.id]} joined the chat`})
  
  

  })
//  creating socket for messaging the user and messaging in done from client side
// because nothing can be written in server side as messaging
  socket.on("message",({message,id})=>{
    console.log(id);
   
  // socket.emit("welcome",{message:`${users[socket.id]} u are welcome`})
   io.emit("userMessage",{user:`${users[id]}`,message:`${message }`,id:id})
  
  

  })
 
  


})
// end of circuit

server.listen(8000,()=>{
  console.log("server is running");
})