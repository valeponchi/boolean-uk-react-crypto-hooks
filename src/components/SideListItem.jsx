export default function SideListItem({
  isSelectedCrypto,
  selectCrypto,
  item: { id, name }
}) {
  return (
    <li key={id}>
      <button
        className={isSelectedCrypto(id) ? "selected" : ""}
        onClick={() => selectCrypto(id)}
      >
        {name}
      </button>
    </li>
  );
}
