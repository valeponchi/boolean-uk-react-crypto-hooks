import { useEffect, useState } from "react";

function useCurrentTime(intervalTime) {
  const [currTime, setCurrTime] = useState(currentTime());
  
  function currentTime() {
    return Math.round(Date.now() / 1000);
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrTime((current) => current + 1);
    }, intervalTime);
    return () => clearInterval(timer);
  }, [setCurrTime]);

  return currTime
}

export default useCurrentTime