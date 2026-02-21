import React from 'react'
import './ChatBox.css'
import assets from '../../assets/assets'
const ChatBox = () => {
  return (
    <div className='chat-box'>
<div className="chat-user">
  <img src={assets.profile_img} alt="" />
  <p>yared aregayehu <img className='dot' src={assets.green_dot} alt="" /></p>
  <img src={assets.help_icon} className=' help' alt="" />

</div>
<div className="chat-input">
  <input type="text" placeholder='send a message' />
  <input type="text" id='image' accept='image/png, image/jpng' hidden />
  <label htmlFor="image">
    <img src={assets.gallery_icon} alt="" />
  </label>
  <img src={assets.send_button} alt="" />
</div>
    </div>
  )
}

export default ChatBox