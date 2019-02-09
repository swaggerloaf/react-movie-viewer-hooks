import React, { useEffect, useState, useRef } from 'react';

const TodoPage = props => {
  const [supportsVideo, setSupportsVideo] = useState(false);
  const [maxLength, setMaxLength] = useState(0);
  const [minLength, setMinLength] = useState(0);
  const [videoPosition, setVideoPosition] = useState(0);
  const [progressBarWidth, setProgressBarWidth] = useState(100);
  const [isPlaying, setIsPlaying] = useState(false);
  //const videoContainer = useRef();
  const video = useRef();

  useEffect(() => {
    var supportsVideo = !!document.createElement('video').canPlayType;
    if (supportsVideo) {
      setSupportsVideo(true);
      video.current.controls = false;
    }
  });

  function handleLoadedMetaData(e) {
    console.warn('metadata loaded');
    setMaxLength(video.current.duration);
  }

  function handleTimeUpdate(e) {
    setVideoPosition(video.current.currentTime);
    progressBar.style.width =
      Math.floor((video.currentTime / video.duration) * 100) + '%';
  }

  return (
    <>
      <figure id="videoContainer">
        <video
          ref={video}
          onLoadedMetadata={handleLoadedMetaData}
          onTimeUpdate={handleTimeUpdate}
          id="video"
          preload="metadata"
          controls
          width="80%"
        >
          <source src="./media/videos/Orange_flowers.webm" type="video/webm" />
          <p>Sorry, your browser doesn't support HTML 5 video.</p>
        </video>
        <figcaption>
          Swaggerloaf |{' '}
          <a href="https://github.com/swaggerloaf/react-movie-viewer-hooks.git">
            react movie viewer using hooks
          </a>
        </figcaption>
      </figure>
      <div id="controls" class="card">
        <div class="card-body">
          <div class="btn-group" role="group" aria-label="First group">
            <button
              className="btn btn-sm btn-dark"
              id="playpause"
              type="button"
              onClick={e => {
                if (video.current.paused || video.current.ended) {
                  setIsPlaying(true);
                  video.current.play();
                } else {
                  video.current.pause();
                  setIsPlaying(false);
                }
              }}
            >
              Play/Pause
            </button>
            <button className="btn btn-sm btn-dark" id="stop" type="button">
              Stop
            </button>
          </div>
          <div className="progress" style={{ width: progressBarWidth }}>
            <progress
              id="progress"
              min={minLength}
              max={maxLength}
              value={videoPosition}
            />
          </div>
          <div class="btn-group" role="group" aria-label="Second group">
            <button className="btn btn-sm btn-dark" id="mute" type="button">
              Mute/Unmute
            </button>
            <button className="btn btn-sm btn-dark" id="volinc" type="button">
              Vol+
            </button>
            <button className="btn btn-sm btn-dark" id="voldec" type="button">
              Vol-
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoPage;
