import { useEffect, useRef, useState } from "react";

const PomodoroTimer = () => {
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("Work");
  const [cycleCount, setCycleCount] = useState(0);
  const intervalRef = useRef(null);
  const audioRef = useRef(null);

  const formatTime = (secs) => {
    const m = String(Math.floor(secs / 60)).padStart(2, "0");
    const s = String(secs % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          audioRef.current?.play();

          if (mode === "Work") {
            setCycleCount((prev) => prev + 1);
            setMode("Break");
            setSecondsLeft(cycleCount % 4 === 3 ? 15 * 60 : 5 * 60);
          } else {
            setMode("Work");
            setSecondsLeft(25 * 60);
          }

          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isRunning, mode, cycleCount]);

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setMode("Work");
    setSecondsLeft(25 * 60);
    setCycleCount(0);
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-black text-white px-4 font-press">
      <div className="bg-transparent p-10 rounded-2xl border border-none z-10 text-center max-w-lg w-full">
        <h2 className="text-lg mb-6">
          {mode === "Work" ? "🧠 FOCUS TIME" : "☕ BREAK TIME"}
        </h2>

        <p className="text-2xl sm:text-4xl lg:text-4xl mb-8 tracking-widest">
          {formatTime(secondsLeft)}
        </p>

        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={handleStartPause}
            className="bg-green-600 px-4 py-2 text-sm sm:text-base rounded-xl hover:bg-green-500 transition-all"
          >
            {isRunning ? "PAUSE" : "START"}
          </button>
          <button
            onClick={handleReset}
            className="bg-red-600 px-4 py-2 text-sm sm:text-base rounded-xl hover:bg-red-500 transition-all"
          >
            RESET
          </button>
        </div>

        <p className="text-xs text-gray-400">CYCLE: {cycleCount}</p>
      </div>

      <audio ref={audioRef}>
        <source
          src="https://www.soundjay.com/buttons/sounds/beep-07.mp3"
          type="audio/mpeg"
        />
      </audio>
    </div>
  );
};

export default PomodoroTimer;
