import { useEffect, useState } from "react";
import { CRIPTO_LIST } from "../../constants";

function useCryptoList() {
  const [cryptoList, setCryptoList] = useState([]);
  
  useEffect(() => {
    fetch(CRIPTO_LIST)
      .then((resp) => resp.json())
      .then(setCryptoList);
  }, [setCryptoList]);

  function updateCryptoData(data, id) {
    setCryptoList((cryptoList) =>
      cryptoList.map((crypto) =>
        crypto.id === id ? { ...crypto, ...data } : crypto
      )
    );
  }

  return {cryptoList, updateCryptoData}
}

export default useCryptoList