import React, { useState, useEffect } from "react";

const Timer = ({ startTimer, resetTimer }) => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  useEffect(() => {
    if (startTimer) {
      setIsActive(true);
    }
  }, [startTimer]);

  useEffect(() => {
    if (resetTimer) {
      setIsActive(false);
      setTime(0);
    }
  }, [resetTimer]);

  useEffect(() => {
    if (time === 25) {
      alert("Ya se ha agotado tu tiempo de descanso, empieza la siguiente serie");
      setIsActive(false);
      setTime(0);
    }
  }, [time]);

  const formatTime = (time) => {
    const getSeconds = `0${time % 60}`.slice(-2);
    const minutes = `${Math.floor(time / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(time / 3600)}`.slice(-2);

    return `${getHours}:${getMinutes}:${getSeconds}`;
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(0);
  };

  return (
    <div className="timer-container">
      <div className="timer">
        <div className="time">{formatTime(time)}</div>
        <div className="buttons">
          <button className="pause-btn" onClick={handlePause}>Pause</button>
          <button className="reset-btn" onClick={handleReset}>Reset</button>
        </div>
      </div>
    </div>
  );
};

export default Timer;

