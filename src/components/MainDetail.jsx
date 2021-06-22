import { useEffect, useState } from "react";
import { getCriptoUpdateUrl } from "../constants";

function currentTime() {
  return Math.round(Date.now() / 1000);
}

function convertToSeconds(dateValue) {
  // This guard is needed due to the API discrepancies in handling dates
  return typeof dateValue === "string"
    ? Math.round(Date.parse(dateValue) / 1000)
    : dateValue;
}

/* 
  Ignore the code above
*/

export default function MainDetail({
  selectedCrypto: { id, name, current_price, last_updated, symbol },
  updateCryptoData
}) {
  // Some parts of the sate will be replaced by your custom hooks
  const [counter, setCounter] = useState(30);
  const [playTicker, setPlayTicker] = useState(false);
  const [currTime, setCurrTime] = useState(currentTime());

  //////////////////////////////////////////////////////////////////////////////////////
  //                                                                                  //
  //  The following comments give you an indication of what you can put in            //
  //  a custom hook.                                                                  //
  //                                                                                  //
  //  They don't represent separate hooks that you might have to create.              //
  //                                                                                  //
  //  You can put them all in one custon hook, if you think that's the best approach  //
  //                                                                                  //
  //////////////////////////////////////////////////////////////////////////////////////

  // You can turn this into a custom hook////////////////////
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
      setCounter(30);
    }
  }, [id, counter, setCounter, updateCryptoData]);
  ///////////////////////////////////////////////////////////

  // You can turn this into a custom hook////////////////////
  useEffect(() => {
    const interval =
      playTicker &&
      setInterval(() => {
        setCounter((count) => count - 1);
      }, 1000);

    return () => clearInterval(interval);
  }, [setCounter, playTicker]);
  ///////////////////////////////////////////////////////////

  // You can turn this into a custom hook////////////////////
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrTime((current) => current + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [setCurrTime]);
  ///////////////////////////////////////////////////////////

  return (
    <>
      <section className="main-detail__central">
        <div className="main-detail__update">
          <p>
            {playTicker &&
              `next update ${counter ? `in ${counter}` : "about to happen"}`}
          </p>
          <button
            className="main-detail__button"
            onClick={() => setPlayTicker((val) => !val)}
          >
            {playTicker ? "Pause" : "Start"} update
          </button>
        </div>
        <div className="main-detail__name">
          <h2>{name}</h2>
          <p>
            <span className="small">a.k.a </span>
            {symbol}
          </p>
        </div>
        <div className="main-detail__price">
          <p>£{current_price}</p>
          <p>Updated {currTime - convertToSeconds(last_updated)} seconds ago</p>
        </div>
      </section>
    </>
  );
}
