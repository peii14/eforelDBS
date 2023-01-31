export interface PaginationHasPrevProps{
    value: number;
    onSet(): void;
    onDecrement(): void;
}

const PaginationHasPrevProps = ({value, onSet, onDecrement}) => {
    return(
        <>
            <div onClick={onDecrement} className='px-3 py-2 leading-tight duration-300 text-gray-500 border-2 border-primary hover:bg-primary-400 mx-1 cursor-pointer'>
                <span>Prev</span>
            </div>
            {value>=3 && (
                <div className='px-3 py-2 leading-tight duration-300 text-gray-500 border-2 border-primary hover:bg-primary-400 mx-1 cursor-pointer'>
                    <span>...</span>
                </div>
            )}
            {value-1 > 0 && (
                <div onClick={() =>onSet(value-1)} className='px-3 py-2 leading-tight duration-300 text-gray-500 border-2 border-primary hover:bg-primary-400 mx-1 cursor-pointer'>
                    <span>{value-1}</span>
                </div>
            )}
            <div onClick={() =>onSet(value)} className='px-3 py-2 leading-tight duration-300 text-gray-500 border-2 border-primary hover:bg-primary-400 mx-1 cursor-pointer'>
                <span>{value}</span>
            </div>
        </>
    );
};

export default PaginationHasPrevProps;