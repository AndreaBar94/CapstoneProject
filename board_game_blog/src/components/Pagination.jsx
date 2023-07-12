// import React from 'react';

// const Pagination = (articles, articlesPerPage, currentPage, handlePageChange) => {

//     const totalArticles = articles.totalElements;
//     const totalPages = Math.ceil(totalArticles / articlesPerPage);
    
//         return (
//         <ul className="pagination">
//             {Array.from({ length: totalPages }, (_, index) => (
//             <li
//                 key={index + 1}
//                 className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
//             >
//                 <button
//                 className="page-link"
//                 onClick={() => handlePageChange(index + 1)}
//                 >
//                 {index + 1}
//                 </button>
//             </li>
//             ))}
//         </ul>
//         );
//     };
    
// export default Pagination;