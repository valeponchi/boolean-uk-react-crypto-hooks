import { useEffect } from "react";
import { getCriptoUpdateUrl } from "../../constants";

function useCounter() {

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

  return
}

export default useCounter