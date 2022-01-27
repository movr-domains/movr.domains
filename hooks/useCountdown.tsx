import { useState, useEffect } from "react";

interface Props {
  seconds: number;
}

export default function useCountdown(props: Props) {
  console.log({ props });
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(60);

  useEffect(() => {
    let interval: any = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime(time - 1);
      }, 1000);
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, time, setTime]);

  return {
    isActive,
    time,
    start: setIsActive(true),
    stop: setIsActive(false),
    reset: setTime(60),
  };
}
