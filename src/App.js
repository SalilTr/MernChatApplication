import './App.css';
import React from "react";
import Join from './Component/Join/Join';
import Navbar from './Component/Navbar';
import Chatting from './Component/Chat/Chatting';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  
} from "react-router-dom";



function App() {
  

  return (
    <Router>
    <Navbar/>
    <Routes>
    <Route path={"/"} element={<Join/>} />
    <Route path={"/chat"} element={<Chatting/>} />
   

    </Routes>
    </Router>
  );
}

export default App;
