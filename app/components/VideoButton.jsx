import React from 'react';

const VideoButton = ({ onClick, children }) => (
  <button type="button" onClick={onClick} className="btn btn-sm btn-info">
    {children}
  </button>
);

export default VideoButton;
