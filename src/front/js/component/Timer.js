import React, { useState, useEffect } from "react";
import { Context } from "../store/appContext";

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
    <div className="timer alert alert-success mt-4 col-9">
      <h1 className="time display-1">{formatTime(time)}</h1>
      <div className="buttons">
        <button 
        className="pause-btn btn btn-outline-warning m-2" 
        onClick={() => setIsActive(!isActive)}>
          {isActive ? "Pause" : "Start"}
        </button>
        <button 
        className="btn btn-outline-warning m-2"
        onClick={() => setTime(0)}>Reset</button>
      </div>
      {showAlert && (
        // <div className=" modal d-block" tabIndex="-1" role="dialog" onClick={handleBackdropClick}>
        //   <div className="modal-dialog modal-dialog-centered" role="document">
        //     <div className="modal-content custom-alert">
        //       <div className="alert-warning modal-header">
        //         <h5 className="modal-title">Alerta de descanso</h5>
        //         <button 
        //         type="button" 
        //         className="close btn-close" 
        //         aria-label="Close" 
        //         onClick={handleAlertClose}>
        //           <span aria-hidden="true">&times;</span>
        //         </button>
        //       </div>
        //       <div className="modal-body bg-ligh">
        //         <p>Time is over! Go for your next set!.</p>
        //       </div>
        //     </div>
        //   </div>
        // </div>
        <div 
        class="alert alert-warning text-light" 
        role="alert"
        onClick={handleBackdropClick}
        >
          Time is over ⏱️ Go for your next Set 💪
          <button 
                 type="button" 
                 className="close btn-close" 
                 aria-label="Close" 
                 onClick={handleAlertClose}>
                   <span aria-hidden="true">&times;</span>
                 </button>
          
        </div>
      )}
    </div>
  );
};

export default Timer;
