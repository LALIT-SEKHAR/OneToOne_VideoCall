import { getMediaStream, ServerCommunication } from 'helper';
import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { v1 as uuid } from "uuid";
// import CR from "../css/CreateRoom.module.css";

const CreateRoom = () => {

    const history = useHistory();

    const VideoTag = useRef()

    const Id = useRef(uuid())

    const [Value, setValue] = useState()

    const InitiateCall = async () => {
        // history.push(`/call/${Id.current}`)
        await getMediaStream();
        window.remoteStream = new MediaStream();
        VideoTag.current.srcObject = window.mediaStream;
        await ServerCommunication()
    }
    const JoinCall = (e) => {
        e.preventDefault()
        history.push(`/call/${Value.callId}`)
    }

    const onHandelChange = (e) => {
        setValue({...Value, [e.target.name]: e.target.value})
    }

    useEffect(()=>{
        window.callId = Id.current
        InitiateCall()
    },[])

    return (
        <div>
            <h1>Shear this Id: {Id.current}</h1>
            <form>
                <input type="text" placeholder="Enter Call Id" name="callId" required onChange={onHandelChange}/>
                <button onClick={JoinCall}>Call</button>
            </form>
            {/* <button onClick={InitiateCall}>Create Call</button> */}
            <video ref={VideoTag} autoPlay muted></video>
            <video id="ClintVideoTag" autoPlay muted></video>
        </div>
    );
};

export default CreateRoom;