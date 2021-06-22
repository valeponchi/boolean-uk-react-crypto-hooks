import SideListItem from "./SideListItem";

export default function SideList({
  cryptoList,
  isSelectedCrypto,
  selectCrypto
}) {
  return (
    <ul>
      {cryptoList.map((item) => (
        <SideListItem
          item={item}
          isSelectedCrypto={isSelectedCrypto}
          selectCrypto={selectCrypto}
        />
      ))}
    </ul>
  );
}
