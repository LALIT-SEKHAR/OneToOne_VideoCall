import { io } from "socket.io-client";
import { RtcReceive, RtcSetAnswer, RtcSetIce_candidate } from "./RtcPeerHelper";

export const ServerCommunication = () => {
  return new Promise((resolve) => {
    const socket = io.connect(process.env.REACT_APP_SERVER_ENDPOINT);
    socket.emit("join room", window.callId);
    socket.emit("user-two", (userId) => {});
    socket.emit("user joined", (userId) => {});
    socket.on("offer", (offer) => {
      RtcReceive({ offer: offer });
    });
    socket.on("answer", (answer) => {
      RtcSetAnswer({ answer: answer });
    });
    socket.on("ice_candidate", (Ice_candidate) => {
      RtcSetIce_candidate({ Ice_candidate: Ice_candidate });
    });
    socket.on("connect", function () {
      window.socket = socket;
      resolve(socket.id);
    });
  });
};
