import { BottomControls, Welcome } from 'components';
import React, { useRef, useState } from 'react';
import CR from "../css/CreateRoom.module.css";

const CreateRoom = () => {


    const VideoTag = useRef();
    const ClintVideoTag = useRef();
    
    const [IsConnected, setIsConnected] = useState(false);
    
    const resided =  () => {
        VideoTag.current.srcObject = window.mediaStream;
        setIsConnected(true)
    }
    
    return (
        <div className={CR.page}>
                {!IsConnected && <Welcome/>}
                <video onPlay={resided} className={CR.clintVideo} ref={ClintVideoTag} id="ClintVideoTag" autoPlay muted></video>
                <video className={CR.myVideo} ref={VideoTag} autoPlay muted></video>
                <BottomControls/>
        </div>
    );
};

export default CreateRoom;