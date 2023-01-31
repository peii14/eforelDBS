import React from 'react'
import PaginationHasNextProps from './has-next';
import PaginationHasPrevProps from './has-previous';

export interface PaginationProps{
    current: number;
    onChange(page: number): void;
    hasNext: number;
}

const Pagination = ({current, onChange, hasNext}) => {
    const increment = () => onChange(current+1);
    const decrement = () => onChange(current-1);
    const setPage = (num: number) =>  onChange(num);
    return(
        <div className='flex'>
            <div className='inline-flex mt-2'>
                {current > 1 && <PaginationHasPrevProps value={current-1} onDecrement={decrement} onSet={setPage}></PaginationHasPrevProps>}
                <div className='px-3 py-2 leading-tight duration-300 text-gray-500 border-2 border-primary hover:bg-primary-400 mx-1 cursor-pointer bg-primary-400 rounded-full'>
                    <span>{current}</span>
                </div>
                {current < hasNext && <PaginationHasNextProps value={current+1} onIncrement={increment} onSet={setPage} maxpage={hasNext}></PaginationHasNextProps>}
            </div>
        </div>
    );
};
export default Pagination;