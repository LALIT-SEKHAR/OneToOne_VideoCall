import { getMediaStream, RtcSender, ServerCommunication } from 'helper';
import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router';

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
        <div>
            <h1>CallRoom : {callId}</h1>
            <video ref={VideoTag} autoPlay muted></video>
            <video id="ClintVideoTag" autoPlay muted></video>
        </div>
    );
};

export default CallRoom;