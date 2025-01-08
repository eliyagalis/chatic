import React, { useEffect, useState } from "react";

const Timer = () => {
  const [timer, setTimer] = useState({ minutes: 0, seconds: 0 });
  const [intervalData, setIntervalData] = useState({ intervalId: null, isRunning: false });

  const toggleTimer = (e) => {
    e.preventDefault();
    if (intervalData.isRunning) {
      clearInterval(intervalData.intervalId);
      setIntervalData((prev) => ({ ...prev, isRunning: false }));
    } else {
      const newIntervalId = setInterval(() => {
        setTimer((prev) => {
          const newSeconds = prev.seconds + 1;
          const newMinutes = prev.minutes + Math.floor(newSeconds / 60);

          return {
            minutes: newMinutes,
            seconds: newSeconds % 60,
          };
        });
      }, 1000);

      setIntervalData({ intervalId: newIntervalId, isRunning: true });
    }
  };

  return (
    <div className="timer-bar">
        <div className="challenge-head">
            <button className="help instructions">?</button>
            <div className="popup-window">You have 6 attempts to guess a 5 word letter</div>
        </div>
        <div className="challenge-head">
            {timer.minutes}:{timer.seconds.toString().padStart(2, "0")}
        </div>
      <div className="challenge-head">
      <button onClick={toggleTimer} className="help">
        {intervalData.isRunning ? "II" : "▶"}
        </button>
      </div>
    </div>
  );
};

export default Timer;
