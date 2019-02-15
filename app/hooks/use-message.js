import React, { useEffect, useState, useRef } from 'react';

const useMessage = () => {
  const [showMessage, setShowMessage] = useState(true);
  const [message, setMessage] = useState('We have everything under control');
  const [messageDuration, setMessageDuration] = useState(0);
  const [messageMaxDuration, setMessageMaxDuration] = useState(7);
  return {
    showMessage,
    setShowMessage,
    message,
    setMessage,
    messageDuration,
    setMessageDuration,
    messageMaxDuration,
    setMessageMaxDuration
  };
};

export default useMessage;
