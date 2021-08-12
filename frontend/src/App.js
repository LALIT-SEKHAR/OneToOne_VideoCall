import { useEffect, useRef } from "react";
import io from "socket.io-client";
import "./App.css";
import { v1 as uuid } from "uuid";

function App() {
  const socketRef = useRef();
  const MyVideoRef = useRef();

  // for getting the media streams
  const getMediaStream = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then((stream) => {
        MyVideoRef.current.srcObject = stream;
        window.mediaStream = stream;
        RtcConnection();
      })
      .catch((error) => alert(error.message));
  };

  //for RtcPeerConnection
  const RtcConnection = () => {
    const Ic = new RTCPeerConnection({
      // iceServers: [
      //   { urls: "stun:stun.stunprotocol.org" },
      //   {
      //     urls: "turn:numb.viagenie.ca",
      //     credential: "muazkh",
      //     username: "webrtc@live.com",
      //   },
      // ],
    });
    window.mediaStream.getTracks().forEach((track) => {
      Ic.addTrack(track, window.mediaStream);
    });
    Ic.onicecandidate = (e) => {
      // console.log("Ice Candidate: ", e);
      // console.log(Ic.localDescription);
      console.log("Ice Candidate");
    };
    Ic.ontrack = (e) => {
      console.log("Track", e);
    };
    Ic.onnegotiationneeded = (e) => {
      console.log("Negotiation End: ", e);
    };
    Ic.createOffer()
      .then((offer) => Ic.setLocalDescription(offer))
      .then(() => console.log("Offer set successfully"));
  };

  useEffect(() => {
    getMediaStream();
    socketRef.current = io.connect("/");
    socketRef.current.emit("join room", uuid());
  });

  return (
    <div className="App">
      <h1>WebRTC</h1>
      <video className="videoTag" ref={MyVideoRef} muted autoPlay></video>
    </div>
  );
}

export default App;
