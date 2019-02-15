import React, { useEffect, useState, useRef } from 'react';

const useVideo = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [maxLength, setMaxLength] = useState(0);
  const [videoPosition, setVideoPosition] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  return {
    isMuted,
    setIsMuted,
    maxLength,
    setMaxLength,
    videoPosition,
    setVideoPosition,
    isPlaying,
    setIsPlaying
  };
};

export default useVideo;
