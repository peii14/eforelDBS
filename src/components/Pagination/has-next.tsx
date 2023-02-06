export interface PaginationHasNextProps {
  value: number;
  onSet(): void;
  onIncrement(): void;
  maxpage: number;
}

const PaginationHasNextProps = ({ value, onSet, onIncrement, maxpage }) => {
  return (
    <>
      {value <= maxpage && (
        <div
          onClick={() => onSet(value)}
          className="hover:bg-background hover:text-black px-2 rounded-lg hover:scale-105 duration-200"
        >
          <span>{value}</span>
        </div>
      )}
      {value + 1 <= maxpage && (
        <div
          onClick={() => onSet(value + 1)}
          className="hover:bg-background hover:text-black px-2 rounded-lg hover:scale-105 duration-200"
        >
          <span>{value + 1}</span>
        </div>
      )}
      {value + 2 <= maxpage && (
        <div className="">
          <span>...</span>
        </div>
      )}
      <div
        onClick={onIncrement}
        className="hover:bg-background hover:text-black px-2 rounded-lg hover:scale-105 duration-200"
      >
        <span>Next</span>
      </div>
    </>
  );
};

export default PaginationHasNextProps;
