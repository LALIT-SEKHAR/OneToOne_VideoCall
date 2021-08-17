import { getMediaStream, RtcSender, ServerCommunication } from 'helper';
import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router';
import CR from "../css/CreateRoom.module.css";

const CallRoom = () => {

    const { callId } = useParams()
    const VideoTag = useRef()

    useEffect(() => {
        init()
        return () => {
            window.mediaStream = undefined;
            window.callId = undefined;
            window.socket = undefined
        }
    })
    
    const init = async () => {
        window.callId = callId;
        window.remoteStream = new MediaStream();
        await getMediaStream()
        VideoTag.current.srcObject = window.mediaStream;
        await ServerCommunication()
        RtcSender()
    }

    return (
        <div className={CR.page}>
            <video className={CR.myVideo} ref={VideoTag} autoPlay muted></video>
            <video className={CR.clintVideo} id="ClintVideoTag" autoPlay muted></video>
        </div>
    );
};

export default CallRoom;