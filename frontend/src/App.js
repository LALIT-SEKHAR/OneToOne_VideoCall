import { useEffect, useRef } from "react";
import io from "socket.io-client";
import "./App.css";
import { v1 as uuid } from "uuid";

function App() {
  const socketRef = useRef();
  const MyVideoRef = useRef();

  // // for getting the media streams
  // const getMediaStream = () => {
  //   navigator.mediaDevices
  //     .getUserMedia({ audio: true, video: true })
  //     .then((stream) => {                                               | Copy Done |
  //       MyVideoRef.current.srcObject = stream;
  //       window.mediaStream = stream;
  //     })
  //     .catch((error) => alert(error.message));
  // };

  // //for RtcPeerConnection
  // const RtcConnection = () => {
  //   const peer = new RTCPeerConnection({
  //     iceServers: [
  //       { urls: "stun:stun.stunprotocol.org" },
  //       {
  //         urls: "turn:numb.viagenie.ca",
  //         credential: "muazkh",
  //         // n7dKFzczuh5UN7N
  //         username: "webrtc@live.com",
  //       },
  //     ],
  //   });
  //   window.mediaStream.getTracks().forEach((track) => {
  //     peer.addTrack(track, window.mediaStream);
  //   });
  //   peer.onicecandidate = (e) => {
  //     // console.log("Ice Candidate: ", e);                                 | Copy Done |
  //     // console.log(Ic.localDescription);
  //     console.log("Ice Candidate");
  //   };
  //   peer.ontrack = (e) => {
  //     console.log("Track", e);
  //   };
  //   peer.onnegotiationneeded = (e) => {
  //     peer
  //       .createOffer()
  //       .then((offer) => {
  //         return peer.setLocalDescription(offer);
  //       })
  //       .then(() => {
  //         const payload = {};
  //         console.log(peer.localDescription);
  //         console.log("Offer set successfully");
  //       });
  //   };
  // };

  // const ServerCommunication = () => {
  //   socketRef.current = io.connect("/");
  //   socketRef.current.emit("join room", uuid());
  //   socketRef.current.on("offer", () => {
  //     console.log("got an offer");
  //   });
  //   socketRef.current.on("answer", () => {                                   | Copy Done |
  //     console.log("got an answer");
  //   });
  //   socketRef.current.on("ice-candidate", () => {
  //     console.log("got an ice-candidate");
  //   });
  // };

  useEffect(() => {
    getMediaStream();
  });

  const ConnectToTheParticipant = () => {};
  const CreatMeet = () => {
    ServerCommunication();
    RtcConnection();
  };

  return (
    <div className="App">
      <h1>WebRTC</h1>
      <form>
        <input type="text" />
        <button onClick={ConnectToTheParticipant}>Connect</button>
      </form>
      <button onClick={CreatMeet}>Create Meet</button>
      <video className="videoTag" ref={MyVideoRef} muted autoPlay></video>
    </div>
  );
}

export default App;
