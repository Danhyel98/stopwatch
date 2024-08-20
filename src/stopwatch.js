import React, { useState, useEffect } from 'react';

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 10);
    } else if (!isRunning && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, time]);

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
    setLaps([]);
  };

  const handleLap = () => {
    setLaps([...laps, time]);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 6000);
    const seconds = Math.floor((time % 6000) / 100);
    const centiseconds = time % 100;

    return `${minutes < 10 ? '0' : ''}${minutes}:${
      seconds < 10 ? '0' : ''
    }${seconds}:${centiseconds < 10 ? '0' : ''}${centiseconds}`;
  };

  return (
    <div className="text-center mt-12 ">
      <h1 class="text-white-700 font-bold text-6xl mb-8">Stopwatch</h1>
      <div className="text-5xl font-mono mb-5">{formatTime(time)}</div>
      <div className="space-x-4">
        <button
          onClick={handleStartPause}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {isRunning ? 'PAUSE' : time === 0 ? 'START' : 'RESUME'}
        </button>
        <button
          onClick={handleReset}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          RESET
        </button>
        <button
          onClick={handleLap}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          disabled={!isRunning}
        >
          LAP
        </button>
      </div>
      <div className="mt-10 text-left flex justify-center">
        <div>
          <h2 className="text-xl font-bold">Laps</h2>
          <ul className="list-decimal list-inside">
            {laps.map((lap, index) => (
              <li key={index} className="my-1">{`Lap ${index + 1}: ${formatTime(lap)}`}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Stopwatch;
