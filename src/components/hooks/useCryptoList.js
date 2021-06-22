import { useEffect, useState } from "react";
import { CRIPTO_LIST } from "../../constants";

function useCryptoList() {
  const [cryptoList, setCryptoList] = useState([]);
  
  useEffect(() => {
    fetch(CRIPTO_LIST)
      .then((resp) => resp.json())
      .then(setCryptoList);
  }, [setCryptoList]);

  return {cryptoList}
}

export default useCryptoList