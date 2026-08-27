import { useEffect, useState } from "react";

export function useResendCountdown(initialSeconds = 60) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  
  const startCountdown = () => {
    setSecondsLeft(initialSeconds);
  };

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  const formattedTime = `${minutes}m:${String(seconds).padStart(2, "0")}s`;

  return {
    secondsLeft,
    formattedTime,
    startCountdown,
    isCounting: secondsLeft > 0,
  };
}
