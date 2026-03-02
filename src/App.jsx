import Login from './pages/login/Login.jsx'
import { Routes, Route, useNavigate } from 'react-router-dom'
import ProfileUpdate from './pages/profilelUpdate/ProfileUpdate.jsx'
import './App.css'
import Chat from './pages/Chat/Chat.jsx'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'
import { auth } from './config/firebase.js'


const App = () => {


  const navigate=useNavigate();

  useEffect(() => {
  onAuthStateChanged(auth, async(user) => {
    if (user) {
navigate("/chat");
    }else{
     navigate("/")
    }
  })
}, [])


  return (
<>
    <ToastContainer />
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/profile" element={<ProfileUpdate />} />
    </Routes>
    {toast.success("Welcome to Chat App")}
    </>
  );
}

export default App
