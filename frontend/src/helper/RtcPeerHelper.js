//for RtcPeerConnection
export const RtcSender = () => {
  const peer = new RTCPeerConnection({
    iceServers: [
      { urls: "stun:stun.stunprotocol.org" },
      {
        urls: "turn:numb.viagenie.ca",
        credential: "muazkh",
        // n7dKFzczuh5UN7N
        username: "webrtc@live.com",
      },
    ],
  });
  window.mediaStream.getTracks().forEach((track) => {
    peer.addTrack(track, window.mediaStream);
  });
  peer.onicecandidate = (e) => {
    console.log("Ice Candidate");
    const payload = {
      target: window.callId,
      caller: window.socket.id,
      offer: peer.localDescription,
    };
    window.socket.emit("offer", payload);
  };
  peer.ontrack = (e) => {
    console.log("Sender Track", e);
  };
  peer.onnegotiationneeded = (e) => {
    peer
      .createOffer()
      .then((offer) => {
        return peer.setLocalDescription(offer);
      })
      .then(() => {
        // const payload = {
        //   target: window.callId,
        //   caller: window.socket.id,
        //   offer: peer.localDescription,
        // };
        // window.socket.emit("offer", payload);
        console.log("Offer send successfully");
      })
      .catch((error) =>
        console.error({ message: "WebRTC localDescription error", error })
      );
  };
  window.myPeer = peer;
};

//for RtcPeerConnection clint
export const RtcReceive = ({ offer }) => {
  return new Promise((resolve) => {
    const peer = new RTCPeerConnection({
      iceServers: [
        { urls: "stun:stun.stunprotocol.org" },
        {
          urls: "turn:numb.viagenie.ca",
          credential: "muazkh",
          // n7dKFzczuh5UN7N
          username: "webrtc@live.com",
        },
      ],
    });
    window.mediaStream.getTracks().forEach((track) => {
      peer.addTrack(track, window.mediaStream);
    });
    peer.onicecandidate = (e) => {
      const payload = {
        target: window.callId,
        caller: window.socket.id,
        answer: peer.localDescription,
      };
      window.socket.emit("answer", payload);
      console.log("Remote answer set successfully");
    };
    peer.ontrack = async (e) => {
      console.log("Receive Track", e);
      await window.remoteStream.addTrack(e.track, window.remoteStream);

      document.getElementById("ClintVideoTag").srcObject = window.remoteStream;
    };
    peer.setRemoteDescription(offer).then((e) => {
      console.log("offer Set Successfully");
    });
    peer
      .createAnswer()
      .then((answer) => peer.setLocalDescription(answer))
      .then((e) => {
        console.log("Answer created");
        // const payload = {
        //   target: window.callId,
        //   caller: window.socket.id,
        //   answer: peer.localDescription,
        // };
        // window.socket.emit("answer", payload);
        // console.log("answer set successfully");
        window.clintPeer = peer;
        resolve(peer);
      })
      .catch((error) =>
        console.error({ message: "WebRTC localDescription error", error })
      );
  });
};

//for RtcPeerConnection clint
export const RtcSetAnswer = ({ answer }) => {
  window.myPeer.setRemoteDescription(answer).then((e) => {
    console.log("remote answer Set Successfully");
  });
};
