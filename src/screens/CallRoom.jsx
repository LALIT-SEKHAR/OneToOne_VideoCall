import { VideoMeetRoom } from 'components';
import { getMediaStream, RtcSender, ServerCommunication } from 'helper';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';

const CallRoom = () => {

    const { callId } = useParams()

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
        document.getElementById("VideoTag").srcObject = window.mediaStream;
        await ServerCommunication()
        RtcSender()
    }

    return (
        <VideoMeetRoom/>
    );
};

export default CallRoom;