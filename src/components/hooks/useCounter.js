import { useEffect } from "react";
import { getCriptoUpdateUrl } from "../../constants";
import useCount from "./useCount";
import useCryptoList from "./useCryptoList";
import useCurrentTime from "./useCurrentTime";
import useToggle from "./useToggle";

//initialValue = 30
//intervalTime = 1000
//id will come from obj passing as props in MainDetails.js

function useCounter(initialValue, intervalTime, id, updateCryptoData) {
  // const [counter, setCounter] = useState(initialValue);
  const [playTicker, setPlayTicker] = useToggle(true);
  const currTime = useCurrentTime(1000)
  const {counter, down, reset, setCounter} =useCount(initialValue)

  useEffect(() => {
    const interval =
      playTicker &&
      setInterval(() => {
        down();
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
      reset()
    }
  }, [id, counter, setCounter, updateCryptoData]);

  return {counter, currTime, playTicker, setPlayTicker}
}

export default useCounter