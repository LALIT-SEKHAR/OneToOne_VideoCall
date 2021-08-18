//for RtcPeerConnection
export const RtcSender = async () => {
  const peer = new RTCPeerConnection({
    iceServers: [
      { urls: "stun:stun.stunprotocol.org" },
      {
        urls: process.env.REACT_APP_STUN_URL,
        credential: process.env.REACT_APP_STUN_URL_PASSWORD,
        username: process.env.REACT_APP_STUN_USERNAME,
      },
    ],
  });
  await window.mediaStream.getTracks().forEach((track) => {
    peer.addTrack(track, window.mediaStream);
  });
  window.Peer = peer;
  peer.onicecandidate = (e) => {
    const payload = {
      target: window.callId,
      caller: window.socket.id,
      ice_candidate: JSON.stringify(e.candidate),
    };
    window.socket.emit("ice_candidate", payload);
  };
  peer.ontrack = async (e) => {
    await window.remoteStream.addTrack(e.track, window.remoteStream);
    document.getElementById("ClintVideoTag").srcObject = window.remoteStream;
  };
  peer.onnegotiationneeded = (e) => {
    peer
      .createOffer()
      .then((offer) => {
        return peer.setLocalDescription(offer);
      })
      .then(() => {
        const payload = {
          target: window.callId,
          caller: window.socket.id,
          offer: peer.localDescription,
        };
        window.socket.emit("offer", payload);
      })
      .catch((error) =>
        console.error({ message: "WebRTC localDescription error", error })
      );
  };
  window.Peer = peer;
};

//for RtcPeerConnection clint
export const RtcReceive = ({ offer }) => {
  return new Promise(async (resolve) => {
    const peer = new RTCPeerConnection({
      iceServers: [
        { urls: "stun:stun.stunprotocol.org" },
        {
          urls: process.env.REACT_APP_STUN_URL,
          credential: process.env.REACT_APP_STUN_URL_PASSWORD,
          username: process.env.REACT_APP_STUN_USERNAME,
        },
      ],
    });
    await window.mediaStream.getTracks().forEach((track) => {
      peer.addTrack(track, window.mediaStream);
    });
    window.Peer = peer;
    peer.onicecandidate = (e) => {
      const payload = {
        target: window.callId,
        caller: window.socket.id,
        ice_candidate: JSON.stringify(e.candidate),
      };
      window.socket.emit("ice_candidate", payload);
    };
    peer.ontrack = async (e) => {
      await window.remoteStream.addTrack(e.track, window.remoteStream);
      document.getElementById("ClintVideoTag").srcObject = window.remoteStream;
    };
    peer.setRemoteDescription(offer).then((e) => {});
    peer
      .createAnswer()
      .then((answer) => peer.setLocalDescription(answer))
      .then((e) => {
        const payload = {
          target: window.callId,
          caller: window.socket.id,
          answer: peer.localDescription,
        };
        window.socket.emit("answer", payload);
        window.Peer = peer;
        resolve(peer);
      })
      .catch((error) =>
        console.error({ message: "WebRTC localDescription error", error })
      );
  });
};

//for RtcPeerConnection clint
export const RtcSetAnswer = ({ answer }) => {
  window.Peer.setRemoteDescription(answer).then((e) => {});
};

//for Set Ice_candidate
export const RtcSetIce_candidate = ({ Ice_candidate }) => {
  window.Peer &&
    window.Peer.addIceCandidate(JSON.parse(Ice_candidate.ice_candidate)).catch(
      (error) => console.log("ERROR Ice_candidate: ", error.message)
    );
};
