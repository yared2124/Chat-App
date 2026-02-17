import Login from './pages/login/Login.jsx'
import Home from './pages/homes/Home.jsx'
import { Routes, Route } from 'react-router-dom'
import ProfileUpdate from './pages/profilelUpdate/ProfileUpdate.jsx'
import './App.css'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/profile" element={<ProfileUpdate />}/>
    </Routes>
  );
}

export default App
