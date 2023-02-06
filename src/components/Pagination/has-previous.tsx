export interface PaginationHasPrevProps {
  value: number;
  onSet(): void;
  onDecrement(): void;
}

const PaginationHasPrevProps = ({ value, onSet, onDecrement }) => {
  return (
    <>
      <div
        onClick={onDecrement}
        className="hover:bg-background hover:text-black px-2 rounded-lg hover:scale-105 duration-200"
      >
        <span>Prev</span>
      </div>
      {value >= 3 && (
        <div className="">
          <span>...</span>
        </div>
      )}
      {value - 1 > 0 && (
        <div
          onClick={() => onSet(value - 1)}
          className="hover:bg-background hover:text-black px-2 rounded-lg hover:scale-105 duration-200"
        >
          <span>{value - 1}</span>
        </div>
      )}
      <div
        onClick={() => onSet(value)}
        className="hover:bg-background hover:text-black px-2 rounded-lg hover:scale-105 duration-200"
      >
        <span>{value}</span>
      </div>
    </>
  );
};

export default PaginationHasPrevProps;
