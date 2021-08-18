import React from 'react';
import { BottomControls } from 'components';
import CR from "../css/CreateRoom.module.css";

const VideoMeetRoom = () => {

    
  return (
        <div className={CR.page}>
            <video className={CR.myVideo} id="VideoTag" autoPlay muted></video>
            <video className={CR.clintVideo} id="ClintVideoTag" autoPlay muted></video>  
            <BottomControls/>
        </div>
    );
};

export default VideoMeetRoom;