import ReactPaginate from 'react-paginate';
import React from "react";

interface PaginationProps {
	onChangePage: (pageNumber: number) => void;
	count: number;
	currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ onChangePage, count, currentPage }) => {
	return (
		<ReactPaginate
			className="pagination"
			pageClassName="page-item"
			activeClassName="active"
			pageLinkClassName="page-link"
			breakLabel="..."
			breakLinkClassName="page-link"
			breakClassName="page-item"
			nextLabel=">"
			nextClassName="page-item"
			nextLinkClassName="page-link"
			previousLabel="<"
			previousClassName="page-item"
			previousLinkClassName="page-link"
			onPageChange={(event) => onChangePage(event.selected)}
			pageRangeDisplayed={3}
			pageCount={Math.ceil(count / 3)}
			forcePage={currentPage}
			renderOnZeroPageCount={null}
		/>
	);
};

export default Pagination;
