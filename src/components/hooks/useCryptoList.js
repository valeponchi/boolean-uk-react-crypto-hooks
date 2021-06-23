import { CRIPTO_LIST } from "../../constants";
import useFetch from "./useFetch";


function useCryptoList() {
  //CRIPTO_LIST
  const [cryptoList, setCryptoList]=useFetch(CRIPTO_LIST)

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

