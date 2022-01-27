import { useEffect, useState } from "react";

interface TimerProps {
  seconds: number;
  active: boolean;
  setSeconds: () => void;
}

export default function Timer({ seconds, active, setSeconds }: TimerProps) {
  const [time, setTime] = useState(seconds);
  const [isActive, setIsActive] = useState(active);

  function start() {
    setIsActive(true);
  }

  useEffect(() => {
    let interval: any = null;
    if (active) {
      interval = setInterval(() => {
        setTime(time - 1);
      }, 1000);
    } else if (!active && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [active, time, setTime]);
  return (
    <div>
      <span>{time}</span>
      <button onClick={start}>Start Timer</button>
    </div>
  );
}
