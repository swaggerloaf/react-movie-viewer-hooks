import React, { useEffect, useRef } from 'react';
import VideoButton from './VideoButton.jsx';
import Message from './Message.jsx';
import useVideo from '../hooks/use-video';
import useInterval from '../hooks/use-interval';
import useMessage from '../hooks/use-message';

const VideoView = props => {
  // state
  const {
    showMessage,
    setShowMessage,
    message,
    setMessage,
    messageDuration,
    setMessageDuration,
    messageMaxDuration,
    setMessageMaxDuration
  } = useMessage();

  const {
    isMuted,
    setIsMuted,
    maxLength,
    setMaxLength,
    videoPosition,
    setVideoPosition,
    isPlaying,
    setIsPlaying
  } = useVideo();

  // ref
  const video = useRef();
  // const
  const minLength = 0;
  const progressBarWidth = 100;

  useEffect(() => {
    var supportsVideo = !!document.createElement('video').canPlayType;
    if (supportsVideo) {
      video.current.controls = false;
    }
  });

  useInterval(ticker, 1000, messageMaxDuration);

  var alterVolume = function(dir) {
    setMessage('As you wish');
    setShowMessage(true);
    setMessageDuration(0);
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
    if (messageDuration === messageMaxDuration) {
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
    ticker();
  }

  function handleStopClick(e) {
    video.current.pause();
    video.current.currentTime = 0;
    setVideoPosition(0);
  }

  function handleMute(e) {
    const isMuted = !video.current.muted;
    video.current.muted = isMuted;
    setIsMuted(isMuted);
    if (isMuted) {
      setMessage('Sorry for the noise');
      setShowMessage(true);
      setMessageDuration(0);
    }
  }

  return (
    <div className="container" id="videoContainer">
      <figure>
        <video
          ref={video}
          onLoadedMetadata={handleLoadedMetaData}
          onTimeUpdate={handleTimeUpdate}
          id="video"
          preload="metadata"
          controls
          width="220px"
        >
          <source
            src="https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"
            poster="https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217"
            width="620"
          />
          <source
            src="./media/videos/big-buck-bunny_trailer.webm"
            type="video/webm"
          />
          <p>Sorry, your browser doesn't support HTML 5 video.</p>
        </video>
        <figcaption>
          Swaggerloaf |{' '}
          <a
            className="text-info"
            href="https://github.com/swaggerloaf/react-movie-viewer-hooks.git"
          >
            react movie viewer using hooks
          </a>
        </figcaption>
      </figure>
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
          id="buttons"
          className="btn-group text-info"
          role="group"
          aria-label="First group"
        >
          <VideoButton
            onClick={e => {
              if (video.current.paused || video.current.ended) {
                setIsPlaying(true);
                video.current.play();
                setMessage('So glad you are enjoying this!');
              } else {
                video.current.pause();
                setIsPlaying(false);
                setMessage('Take a break.');
              }
              setShowMessage(true);
              setMessageDuration(0);
            }}
          >
            Play/Pause
          </VideoButton>
          <VideoButton onClick={handleStopClick}>Stop</VideoButton>
          <label>
            Mute/Unmute
            <input
              name="isMuted"
              type="checkbox"
              checked={isMuted}
              onChange={handleMute}
            />
          </label>
          <VideoButton onClick={() => alterVolume('+')}>Vol+</VideoButton>
          <VideoButton onClick={() => alterVolume('-')}>Vol-</VideoButton>
        </div>
      </div>
      <Message showMessage={showMessage}>{message}</Message>
    </div>
  );
};

export default VideoView;
