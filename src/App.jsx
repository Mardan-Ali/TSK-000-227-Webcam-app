import React, { useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  let videoRef = useRef(null);
  let photoRef = useRef(null);

  // Function to get user Web Cam Access

  useEffect(() => {
    getUserCamera();
  }, [videoRef]);

  const getUserCamera = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
      })

      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Function to Take Picture
  const takePicture = () => {
    let width = 500;
    let height = width / (16 / 9);
    let photo = photoRef.current;
    let video = videoRef.current;

    photo.width = width;
    photo.height = height;

    let ctx = photo.getContext("2d");
    ctx.drawImage(video, 0, 0, photo.width, photo.height);
  };

  const deletePicture = () => {
    let photo = photoRef.current;
    let ctx = photo.getContext("2d");

    ctx.clearRect(0, 0, photo.width, photo.height);
  };
  return (
    <div>
      <div className="container">
        <h1 className="text-center">Web Cam App</h1>
        <video
          className="container"
          height={500}
          width={500}
          ref={videoRef}
        ></video>
        <button onClick={takePicture} className="btn btn-primary container">
          {" "}
          Take Photo
        </button>
        <canvas
          className="container"
          width={100}
          height={100}
          ref={photoRef}
        ></canvas>
        <button className="btn btn-danger container" onClick={deletePicture}>
          {" "}
          Delete Photo
        </button>
      </div>
    </div>
  );
}

export default App;
