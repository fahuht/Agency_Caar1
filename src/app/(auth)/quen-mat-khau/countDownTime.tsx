"use client";

/* eslint-disable react-hooks/rules-of-hooks */
import  { useEffect, useState } from "react";

import { Countdown } from "./type";

export default function countDownTime(seconds: number): Countdown {
  const [countDown, setCountDown] = useState(seconds);
  const [isCountDown, setIsCountDown] = useState(false);
  useEffect(() => {
    if (isCountDown) {
      const interval = setInterval(() => {
        setCountDown((prev) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          prev <= 1 && clearInterval(interval);
          return prev - 1;
        });
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
    return () =>{}
  }, [isCountDown]);

  function startCountDown() {
    setIsCountDown(true);
  }
  function stopCountDown() {
    setIsCountDown(false);
  }
  function resetCountDown(newSecond: number) {
    setCountDown(newSecond);
  }
  return { countDown, startCountDown, stopCountDown, resetCountDown };
}
