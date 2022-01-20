import { useEffect, useState } from "react";

interface TimerProps {
  seconds: number;
  active: boolean;
  setSeconds: (seconds: number) => void;
}

export default function Timer({ seconds, active, setSeconds }: TimerProps) {
  useEffect(() => {
    let interval: any = null;
    if (active) {
      interval = setInterval(() => {
        setSeconds(seconds - 1);
      }, 1000);
    } else if (!active && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [active, seconds, setSeconds]);
  return <div>{seconds}</div>;
}
