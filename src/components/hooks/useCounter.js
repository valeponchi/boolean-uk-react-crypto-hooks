import { useEffect, useState } from "react";
import { getCriptoUpdateUrl } from "../../constants";
import useCurrentTime from "./useCurrentTime";


//initialValue = 30
//intervalTime = 1000
//id will come from obj passing as props in MainDetails.js



function useCounter(initialValue, intervalTime, id, updateCryptoData) {
  const [counter, setCounter] = useState(initialValue);
  const [playTicker, setPlayTicker] = useState(false);
  const currTime = useCurrentTime(1000)

  useEffect(() => {
    const interval =
      playTicker &&
      setInterval(() => {
        setCounter((count) => count - 1);
      }, intervalTime);

    return () => clearInterval(interval);
  }, [setCounter, playTicker]);


  useEffect(() => {
    if (counter < 0) {
      fetch(getCriptoUpdateUrl(id))
        .then((resp) => resp.json())
        .then((data) => {
          updateCryptoData(
            {
              current_price: data[id].gbp,
              last_updated: data[id]["last_updated_at"]
            },
            id
          );
        });
      setCounter(initialValue);
    }
  }, [id, counter, setCounter, updateCryptoData]);

  return {counter, currTime, playTicker, setPlayTicker}
}

export default useCounter