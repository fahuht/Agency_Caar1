
"use client";

import { useEffect, useState } from "react";

import { Countdown } from "./type";

export default function CountDownTime(seconds: number): Countdown {
  const [countDown, setCountDown] = useState(seconds);
  const [isCountDown, setIsCountDown] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
  
    if (isCountDown) {
      interval = setInterval(() => {
        setCountDown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsCountDown(false);
            return 0;
          } 
            return prev - 1;
          
        });
      }, 1000);
    }
    return () => {}
  }, [isCountDown]);

  // useEffect(() => {
  //   if (isCountDown) {
  //     const interval = setInterval(() => {
  //       setCountDown((prev) => {
  //         prev <= 1 && clearInterval(interval);
  //         return prev - 1;
  //       });
  //     }, 1000);
  //     return () => {
  //       clearInterval(interval);
  //     };
  //   }
  //   return () => {''}
  // }, [isCountDown]);

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
