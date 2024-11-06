import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import React from "react";

interface PaginationProps {
  dataPerPage: number;
  total: number;
  paginateFront: () => void;
  paginateBack: () => void;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = (props) => {
  const { dataPerPage, total, paginateFront, paginateBack, currentPage } =
    props;

  const maxPage = Math.ceil(total / dataPerPage);

  if (total <= dataPerPage) {
    return null;
  }

  const start = (currentPage - 1) * dataPerPage + 1;
  const end = () => {
    if (!total) {
      return "0";
    }

    return Math.min(currentPage * dataPerPage, total);
  };

  return (
    <div className="flex items-center justify-between rounded-lg bg-[#0a1d30] mt-4 py-2 md:px-4 md:py-3">
      <div className="text-sm text-white md:flex md:flex-row gap-1">
        <p>
          Showing <span className="font-medium">{start}</span> to{" "}
          <span className="font-medium">{end()}</span>
        </p>
        <p>
          of <span className="font-medium">{total || 0}</span> results
        </p>
      </div>

      <nav className=" flex flex-col md:flex-row pl-2" aria-label="Pagination">
        <button
          disabled={currentPage <= 1}
          onClick={() => {
            paginateBack();
          }}
          className="relative inline-flex items-center rounded-l-lg px-2 py-2 text-white ring-1
                ring-inset ring-gray-300 hover:bg-white/20 focus:z-20 focus:outline-offset-0
                disabled:bg-gray-400"
        >
          <span className="text-sm">Previous</span>
          <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
        </button>
        <button
          disabled={maxPage === currentPage}
          onClick={() => {
            paginateFront();
          }}
          className="relative inline-flex items-center rounded-r-lg px-2 py-2 text-white ring-1
                ring-inset ring-gray-300 hover:bg-white/20 focus:z-20 focus:outline-offset-0
                disabled:bg-gray-400"
        >
          <span className="text-sm">Next</span>
          <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
