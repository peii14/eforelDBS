import React from 'react';
import { useState } from "react";
import PaginationHasNextProps from './has-next';
import PaginationHasPrevProps from './has-previous';
import { toast } from "react-toastify";

export interface PaginationProps{
    current: number;
    onChange(page: number): void;
    hasNext: number;
}

const Pagination = ({current, onChange, hasNext, postPerPage, contentLength}) => {
    const [search, setSearchData] = useState(null);
    const increment = () => onChange(current+1);
    const decrement = () => onChange(current-1);
    const setPage = (num: number) =>  onChange(num);

    const getSearchData = (val) => {
        setSearchData(parseInt(val.target.value));
    }
    const handleClick = (search) => {
        if (search<=hasNext){
            setPage(search);
            setSearchData('');
        }
        else{
            toast.error("Something went wrong 🤯");
        }
    }

    var endIndex = current * postPerPage;
    var startIndex = ((current - 1) * postPerPage) + 1;

    return(
        <>
        <div className='flex'>
            <div className='inline-flex my-3'>
                {current > 1 && <PaginationHasPrevProps value={current-1} onDecrement={decrement} onSet={setPage}></PaginationHasPrevProps>}
                <div className='px-3 py-2 leading-tight duration-300 text-gray-500 border-2 border-primary hover:bg-primary-400 mx-1 cursor-pointer bg-primary-400 rounded-full'>
                    <span>{current}</span>
                </div>
                {current < hasNext && <PaginationHasNextProps value={current+1} onIncrement={increment} onSet={setPage} maxpage={hasNext}></PaginationHasNextProps>}
            </div>
            <div className='mt-4 ml-5'>
                <input type="number" onChange={getSearchData} min="1" max={hasNext} className="w-20 h-8 border border-gray-400 rounded-lg focus:outline-none focus:shadow-outline text-gray-600"/>
            </div>
            <button onClick={() => handleClick(search)} className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg my-3 ml-3">Submit</button>
        </div>
        <span className='text-sm text-gray-600 ml-2'>Showing <b>{startIndex}</b> to <b>{endIndex>contentLength? contentLength: endIndex}</b> of <b>{contentLength}</b> Entries</span>
        </>
    );
};
export default Pagination;