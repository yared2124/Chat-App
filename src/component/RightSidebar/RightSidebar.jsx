import React, { useContext, useEffect, useState } from "react";
import assets from "../../assets/assets";
import "./RightSidebar.css";
import { logout } from "../../config/firebase";
import {AppContext} from '../../context/AppContext'

const RightSidebar = () => {

    const {chatUser, messages} = useContext(AppContext)
    const [msgImages,setMsgImages] =useState([])

    useEffect(() => {
      let temVar = []
      messages.map((msg)=>{
        if (msg.image) {
          temVar.push(msg.image)
        }
      })
    setMsgImages(temVar)
    }, [messages]);

  return chatUser ? (
    <div className="rs">
      <div className="rs-profile">
        <img src={chatUser.userData.avatar} alt="" />
        <h3>
          {chatUser.userData.name}{" "}
          <img src={assets.green_dot} className="dot" alt="" />
        </h3>
        <p>{chatUser.userData.bio}</p>
      </div>
      <hr />
      <div className="rs-media">
        <p>media</p>
        <div>
        {msgImages.map((url,index)=>(<img onClick={()=>window.open(url)} key={index} src={url} alt='' />))}
          {/* <img src={assets.pic1} alt="" />
        <img src={assets.pic2} alt="" />
        <img src={assets.pic3} alt="" />
        <img src={assets.pic4} alt="" />
        <img src={assets.pic1} alt="" />
        <img src={assets.pic2} alt="" /> */}
        </div>
      </div>
      <button onClick={() => logout()}>Logout</button>
    </div>
  ) : (
    <div className="rs">
      <button onClick={() => logout()}>Logout</button>
    </div>
  );

};

export default RightSidebar;
