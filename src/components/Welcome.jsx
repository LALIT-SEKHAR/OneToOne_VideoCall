import { Footer } from 'components';
import { getMediaStream, ServerCommunication } from 'helper';
import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import { v1 as uuid } from "uuid";
import WC from "../css/Welcome.module.css";

const Welcome = () => {

    const history = useHistory();

    const Id = useRef(uuid())

    const [Value, setValue] = useState({callId: ''})
    const [IsLinkCopped, setIsLinkCopped] = useState(false)
    const [IsIdCopped, setIsIdCopped] = useState(false)

    const JoinCall = (e) => {
        e.preventDefault()
        if (Value.callId.trim() !== '') {
            history.push(`/call/${Value.callId}`)
        }
    }
    
    const onHandelChange = (e) => {
        setValue({...Value, [e.target.name]: e.target.value})
    }

    const InitiateCall = async () => {
        await getMediaStream();
        window.remoteStream = new MediaStream();
        await ServerCommunication()
    }
    
    useEffect(()=>{
        window.callId = Id.current
        InitiateCall()
    },[])

    const CopyCallID = () => {
        navigator.clipboard.writeText(Id.current)
        .then( e => setIsIdCopped(true))
        .catch( error => alert(error.message))
    }
    const CopyCallLink = () => {
        navigator.clipboard.writeText(`https://videocall.lalitsekhar.dev/call/${Id.current}`)
        .then( e => setIsLinkCopped(true))
        .catch( error => alert(error.message))
    }

    return (
        <div className={WC.container}>
            <div className={WC.Page}>
                <div className={WC.ShearLink_Warper}>
                    <h2>Your call is ready</h2>
                    <p>your call id is </p>
                    <span className={WC.ShearLink}>
                        <p>{Id.current}</p>
                        <button onClick={CopyCallID} className={WC.CopyId_btn}>
                            {!IsIdCopped ? <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg> 
                            : <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#00a316"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z"/></svg>}
                        </button>
                    </span>
                    <hr />
                    <p>just shear this link and wait to join</p>
                    <span className={WC.ShearLink}>
                        <p>videocall.lalitsekhar.dev/call/{Id.current}</p>
                        <button onClick={CopyCallLink} className={WC.CopyId_btn}>
                            {!IsLinkCopped ? <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg> 
                            : <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#00a316"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z"/></svg>}
                        </button>
                    </span>
                    <p>if you already have a Call Id the enter bellow and join the call</p>
                </div>
                <form className={WC.Form}>
                    <input className={WC.input} type="text" placeholder="Enter the Call Id" name="callId" autoComplete="off" required onChange={onHandelChange}/>
                    <button className={WC.submit_btn} onClick={JoinCall}>Call</button>
                </form>
            </div>
            <Footer/>
        </div>
    );
};

export default Welcome;