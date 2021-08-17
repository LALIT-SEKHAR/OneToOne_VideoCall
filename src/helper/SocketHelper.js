import { io } from "socket.io-client";
import { RtcReceive, RtcSetAnswer, RtcSetIce_candidate } from "./RtcPeerHelper";

export const ServerCommunication = () => {
  return new Promise((resolve) => {
    const socket = io.connect("ws://meet-call.herokuapp.com/");
    socket.emit("join room", window.callId);
    socket.emit("user-two", (userId) => {
      // console.log("UserTwo: ", userId);
    });
    socket.emit("user joined", (userId) => {
      // console.log("user joined: ", userId);
    });
    socket.on("offer", (offer) => {
      // console.log("got an offer");
      // window.myPeer
      RtcReceive({ offer: offer });
    });
    socket.on("answer", (answer) => {
      // console.log("got an answer");
      RtcSetAnswer({ answer: answer });
    });
    socket.on("ice_candidate", (Ice_candidate) => {
      // console.log("got an ice_candidate");
      RtcSetIce_candidate({ Ice_candidate: Ice_candidate });
    });
    socket.on("connect", function () {
      window.socket = socket;
      resolve(socket.id);
    });
  });
};
