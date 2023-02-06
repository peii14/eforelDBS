import React from "react";
import { useState } from "react";
import PaginationHasNextProps from "./has-next";
import PaginationHasPrevProps from "./has-previous";
import { toast } from "react-toastify";

export interface PaginationProps {
  current: number;
  onChange(page: number): void;
  hasNext: number;
}

const Pagination = ({
  current,
  onChange,
  hasNext,
  postPerPage,
  contentLength,
}) => {
  const [search, setSearchData] = useState(null);
  const increment = () => onChange(current + 1);
  const decrement = () => onChange(current - 1);
  const setPage = (num: number) => onChange(num);

  const getSearchData = (val) => {
    setSearchData(parseInt(val.target.value));
  };
  const handleClick = (search) => {
    if (search <= hasNext) {
      setPage(search);
      setSearchData("");
    } else {
      toast.error("Something went wrong 🤯");
    }
  };

  let endIndex = current * postPerPage;
  let startIndex = (current - 1) * postPerPage + 1;

  return (
    <>
      <div className="flex justify-between items-center">
        <div className=" inline-flex my-3 cursor-pointer bg-primary text-white space-x-5 p-3 items-center rounded-xl">
          {current > 1 && (
            <PaginationHasPrevProps
              value={current - 1}
              onDecrement={decrement}
              onSet={setPage}
            ></PaginationHasPrevProps>
          )}
          <div className="rounded-lg bg-background text-black px-2 scale-105">
            <span>{current}</span>
          </div>
          {current < hasNext && (
            <PaginationHasNextProps
              value={current + 1}
              onIncrement={increment}
              onSet={setPage}
              maxpage={hasNext}
            ></PaginationHasNextProps>
          )}
        </div>
        <div>
          <div className="mt-4 ml-5 flex flex-row items-center space-x-3">
            <p>Go to page</p>
            <input
              type="number"
              onChange={getSearchData}
              min="1"
              max={hasNext}
              className="w-20 h-8 border border-gray-400 rounded-lg focus:outline-none focus:shadow-outline text-gray-600"
            />
            <button
              onClick={() => handleClick(search)}
              className="bg-primary text-white px-5 py-1 rounded-xl duration-200 hover:bg-primary-500"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <span className="text-sm text-gray-600 ml-2">
        Showing <b>{startIndex}</b> to{" "}
        <b>{endIndex > contentLength ? contentLength : endIndex}</b> of{" "}
        <b>{contentLength}</b> Entries
      </span>
    </>
  );
};
export default Pagination;
