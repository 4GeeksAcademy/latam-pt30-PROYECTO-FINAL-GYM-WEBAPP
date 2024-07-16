import React, { useState, useEffect } from "react";

const Timer = ({ startTimer, resetTimer }) => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

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
      setShowAlert(true);
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

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains('modal')) {
      setShowAlert(false);
    }
  };

  return (
    <div className="timer">
      <div className="time">{formatTime(time)}</div>
      <div className="buttons">
        <button className="pause-btn" onClick={() => setIsActive(!isActive)}>
          {isActive ? "Pause" : "Start"}
        </button>
        <button className="reset-btn" onClick={() => setTime(0)}>Reset</button>
      </div>
      {showAlert && (
        <div className="modal show d-block" tabIndex="-1" role="dialog" onClick={handleBackdropClick}>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content custom-alert">
              <div className="modal-header">
                <h5 className="modal-title">Alerta de descanso</h5>
                <button type="button" className="close btn-close" aria-label="Close" onClick={handleAlertClose}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Ya se ha agotado tu tiempo de descanso, empieza la siguiente serie.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Timer;
