import React, { useEffect, useState, useRef } from 'react';

const VideoView = props => {
  const [showMessage, setShowMessage] = useState(true);
  const [message, setMessage] = useState('We have everything under control');
  const [messageDuration, setMessageDuration] = useState(0);
  const [maxLength, setMaxLength] = useState(0);
  const [videoPosition, setVideoPosition] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const video = useRef();
  const minLength = 0;
  const progressBarWidth = 100;

  useEffect(() => {
    var supportsVideo = !!document.createElement('video').canPlayType;
    if (supportsVideo) {
      video.current.controls = false;
    }
  });

  useEffect(() => {
    var timerID = setInterval(() => ticker(), 1000);

    return function cleanup() {
      clearInterval(timerID);
    };
  });

  var alterVolume = function(dir) {
    var currentVolume = Math.floor(video.current.volume * 10) / 10;
    if (dir === '+') {
      if (currentVolume < 1) video.current.volume += 0.1;
    } else if (dir === '-') {
      if (currentVolume > 0) video.current.volume -= 0.1;
    }
  };

  function ticker() {
    // our job is to turn off messages when we can
    setMessageDuration(messageDuration + 1);
    if (messageDuration == 4) {
      setShowMessage(false);
      setMessageDuration(0);
      setMessage('');
    }
  }

  function handleProgressClick(e) {
    // i'm just setting current time to 8 when clicked , sorry
    video.current.currentTime = Math.min(
      video.current.currentTime + 5,
      maxLength
    );
  }

  function handleLoadedMetaData(e) {
    console.warn('metadata loaded');
    setMaxLength(video.current.duration);
  }

  function handleTimeUpdate(e) {
    setVideoPosition(video.current.currentTime);
  }

  function handleStopClick(e) {
    video.current.pause();
    video.current.currentTime = 0;
    setVideoPosition(0);
  }

  function handleMute(e) {
    video.current.muted = !video.current.muted;
    setMessage('Sorry for the noise');
    setShowMessage(true);
    setMessageDuration(0);
  }

  function handleVolumeUp(e) {
    video.current.muted = !video.current.muted;
    setMessage('Crank it!');
    setShowMessage(true);
    setMessageDuration(0);
  }

  function handleVolumeDown(e) {
    video.current.muted = !video.current.muted;
    setMessage('Baby is crying');
    setShowMessage(true);
    setMessageDuration(0);
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
          width="100%"
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
      <div id="controls" className="card">
        <div className="card-body text-info">
          <h4 className="card-title">Control Panel</h4>
          <div className="progress" style={{ width: progressBarWidth }}>
            <progress
              id="progress"
              min={minLength}
              max={maxLength}
              value={videoPosition}
              onClick={handleProgressClick}
            />
          </div>
          <br />
          <div
            className="btn-group text-info"
            role="group"
            aria-label="First group"
          >
            <button
              className="btn btn-sm btn-dark"
              id="playpause"
              type="button"
              onClick={e => {
                if (video.current.paused || video.current.ended) {
                  setIsPlaying(true);
                  video.current.play();
                  setMessage('So glad you are enjoying this!');
                  setShowMessage(true);
                } else {
                  video.current.pause();
                  setIsPlaying(false);
                  setMessage('Take a break.');
                  setShowMessage(true);
                }
              }}
            >
              Play/Pause
            </button>
            <button
              type="button"
              onClick={handleStopClick}
              className="btn btn-sm btn-dark"
            >
              Stop
            </button>
          </div>
          <div
            className="btn-group text-info"
            role="group"
            aria-label="Second group"
          >
            <button
              type="button"
              onClick={handleMute}
              className="btn btn-sm btn-dark"
            >
              Mute/Unmute
            </button>
            <button
              type="button"
              onClick={() => alterVolume('+')}
              className="btn btn-sm btn-dark"
            >
              Vol+
            </button>
            <button
              type="button"
              onClick={() => alterVolume('-')}
              className="btn btn-sm btn-dark"
            >
              Vol-
            </button>
          </div>
        </div>
        <div
          className="alert alert-info"
          style={{ visibility: showMessage ? 'visible' : 'hidden' }}
          role="alert"
        >
          {message}
        </div>
      </div>
    </>
  );
};

export default VideoView;
