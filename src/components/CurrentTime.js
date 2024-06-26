import React, { useState, useEffect } from 'react';

const CurrentTime = () => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour12: false }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <h3 className="text-end fw-bold text-danger" style={{ fontSize: '70px' }}>
      {currentTime}
    </h3>
  );
};

export default CurrentTime;
