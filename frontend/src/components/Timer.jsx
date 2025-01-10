import React, { useEffect, useState } from "react";

const Timer = () => {
  const [timer, setTimer] = useState({ minutes: 0, seconds: 0 });
  const [intervalData, setIntervalData] = useState({ intervalId: null, isRunning: false });
  const [isHovering, setIsHovering] = useState({help:false, timer: false});

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
        <div className="challenge-bar">
            <button className="help instructions" onMouseEnter={() => setIsHovering({...isHovering, help:true})}
      onMouseLeave={() => setIsHovering({...isHovering, help:false})}>?</button>
            {isHovering.help && (<div className="popup-window">
                    <div><b>How To Play</b></div>
                    <div>Guess the WordCode in 6 tries.</div>
                    <ul>
                        <li>Each guess must be a valid 5-letter word.</li>
                        <li>The color of the tiles will change to show how close your guess was to the word.</li>
                    </ul>
                    <div>You can put a timer if you wish.</div>
                </div>
            )}
        </div>
        <div >
            {timer.minutes}:{timer.seconds.toString().padStart(2, "0")}
        </div>
      <div className="challenge-bar">
        <button onMouseEnter={() => setIsHovering({...isHovering, timer:true})}
      onMouseLeave={() => setIsHovering({...isHovering, timer:false})} onClick={toggleTimer} className="help">
        {intervalData.isRunning ? "II" : "▶"}
        </button>
        {isHovering.timer && (<div className="popup-window">
                    <div>This is the timer. Use it wisely.</div>
                </div>
            )}
      </div>
    </div>
  );
};

export default Timer;
