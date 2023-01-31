import React from 'react'

const Pagination = ({postPerPage, totalPost, paginate}) => {
    const pageNumbers = [];

    for(let i=1; i<= Math.ceil(totalPost/postPerPage); i++){
        pageNumbers.push(i);
    }

    return(
        <nav aria-label="Page navigation example">
            <ul className="inline-flex -space-x-px">
                {pageNumbers.map(number =>(
                    <li key={number} className="mt-5 cursor-pointer">
                        <a onClick={() => paginate(number)} className="px-3 py-2 leading-tight duration-300 text-gray-500 border-2 border-primary hover:bg-primary-400 rounded-full mr-1">
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
export default Pagination;