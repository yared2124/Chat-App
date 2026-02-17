import Login from './pages/login/Login.jsx'
import { Routes, Route } from 'react-router-dom'
import ProfileUpdate from './pages/profilelUpdate/ProfileUpdate.jsx'
import './App.css'
import Chat from './pages/Chat/Chat.jsx'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Chat />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/profile" element={<ProfileUpdate />}/>
    </Routes>
  );
}

export default App
