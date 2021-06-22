import { useEffect, useState } from "react";

import { CRIPTO_LIST } from "./constants";
import MainDetail from "./components/MainDetail";
import NewsFeed from "./components/NewsFeed";
import SideList from "./components/SideList";
import useCryptoList from "./components/hooks/useCryptoList";
import useStatusUpdates from "./components/hooks/useStatusUpdates";

//////////////////////////////////////////////////
//                                              //
//  Don't forget to check all the code again!!  //
//                                              //
//////////////////////////////////////////////////

function App() {
  const [selectedCrypto, setSelectedCripto] = useState(null);
  const {cryptoList, setCryptoList} = useCryptoList()
  

  function selectCrypto(selectedId) {
    setSelectedCripto(selectedId);
  }

  function findCripto(criptoId) {
    return cryptoList.find(({ id }) => id === criptoId);
  }

  function updateCryptoData(data, id) {
    setCryptoList((cryptoList) =>
      cryptoList.map((crypto) =>
        crypto.id === id ? { ...crypto, ...data } : crypto
      )
    );
  }

  function isSelectedCrypto(id) {
    return selectedCrypto === id;
  }

  return (
    /* These (<> </>) are called React Fragments, and allow us to return more than one top element */
    <>
      <aside className="side-list">
        {/* No need to worry about SideList and it's children, you can safey ignore it! */}
        <SideList
          cryptoList={cryptoList}
          isSelectedCrypto={isSelectedCrypto}
          selectCrypto={selectCrypto}
        />
      </aside>
      <main className="main-detail">
        {selectedCrypto ? (
          // Let's have a look at MainDetail
          <MainDetail
            selectedCrypto={findCripto(selectedCrypto)}
            updateCryptoData={updateCryptoData}
          />
        ) : (
          "Select a coin bro!"
        )}
        <NewsFeed />
      </main>
    </>
  );
}

export default App;
