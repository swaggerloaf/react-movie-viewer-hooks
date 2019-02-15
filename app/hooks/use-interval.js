import React, { useEffect, useState, useRef } from 'react';

const useInterval = (callback, delay, msgMaxDuration) => {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  });

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay, msgMaxDuration]);

  return {};
};

export default useInterval;
