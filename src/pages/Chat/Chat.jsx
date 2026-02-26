import React from 'react'
import './Chat.css'
import LeftSidebar from "../../component/LeftSidebar/LeftSidebar.jsx";
import ChatBox from '../../component/ChatBox/ChatBox'
import RightSidebar from '../../component/RightSidebar/RightSidebar'

const Chat = () => {
  return (
    <div className="chat">
      <div className="chat-container">
        <LeftSidebar />
        <ChatBox />
        <RightSidebar />
      </div>
    </div>
  );
}

export default Chat