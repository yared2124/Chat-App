import React, { useContext, useState } from 'react'
import './Chat.css'
import LeftSidebar from "../../component/LeftSidebar/LeftSidebar.jsx";
import ChatBox from '../../component/ChatBox/ChatBox'
import RightSidebar from '../../component/RightSidebar/RightSidebar'
import { AppContext } from '../../context/AppContext.jsx';

const Chat = () => {

  const {chatData,userData} = useContext(AppContext)
  const [loading, setLoading] = useState(true)

  return (
    <div className="chat">
      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <div className="chat-container">
          <LeftSidebar />
          <ChatBox />
          <RightSidebar />
        </div>
      )}
    </div>
  );
}

export default Chat