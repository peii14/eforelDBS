export interface PaginationHasNextProps{
    value: number;
    onSet(): void;
    onIncrement(): void;
    maxpage: number;
}

const PaginationHasNextProps = ({value, onSet, onIncrement, maxpage}) => {
    return(
        <>
            {value <= maxpage && (
                <div onClick={() =>onSet(value)} className='px-3 py-2 leading-tight duration-300 text-gray-500 border-2 border-primary hover:bg-primary-400 mx-1 cursor-pointer'>
                    <span>{value}</span>
                </div>
            )}
            {value+1 <= maxpage && (
                <div onClick={() =>onSet(value+1)} className='px-3 py-2 leading-tight duration-300 text-gray-500 border-2 border-primary hover:bg-primary-400 mx-1 cursor-pointer'>
                    <span>{value+1}</span>
                </div>
            )}
            {value+2 <= maxpage && (
                <div className='px-3 py-2 leading-tight duration-300 text-gray-500 border-2 border-primary hover:bg-primary-400 mx-1 cursor-pointer'>
                    <span>...</span>
                </div>
            )}
            <div onClick={onIncrement} className='px-3 py-2 leading-tight duration-300 text-gray-500 border-2 border-primary hover:bg-primary-400 mx-1 cursor-pointer'>
                <span>Next</span>
            </div>
        </>
    );
};

export default PaginationHasNextProps;