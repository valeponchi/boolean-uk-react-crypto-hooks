import { useEffect, useState } from "react";
import { getCriptoUpdateUrl } from "../../constants";
import useCryptoList from "./useCryptoList";

function currentTime() {
  return Math.round(Date.now() / 1000);
}

//initialValue = 30
//intervalTime = 1000
//id will come from obj passing as props in MainDetails.js

function useCounter(initialValue, intervalTime, id) {
  const [counter, setCounter] = useState(initialValue);
  const [playTicker, setPlayTicker] = useState(false);
  const [currTime, setCurrTime] = useState(currentTime());
  const {cryptoList, setCryptoList} = useCryptoList()

  function updateCryptoData(data, id) {
  setCryptoList((cryptoList) =>
    cryptoList.map((crypto) =>
      crypto.id === id ? { ...crypto, ...data } : crypto
    )
  );
}


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrTime((current) => current + 1);
    }, intervalTime);
    return () => clearInterval(timer);
  }, [setCurrTime]);


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