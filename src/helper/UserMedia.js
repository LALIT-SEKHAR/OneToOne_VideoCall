// for getting the media streams
export const getMediaStream = () => {
  return navigator.mediaDevices
    .getUserMedia({ audio: true, video: true })
    .then((stream) => {
      window.mediaStream = stream;
      return stream;
    })
    .catch((error) => alert(error.message));
};
