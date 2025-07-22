import React from "react";

const Pagination = ({ page, dynamicPage, pageHandler }) => {
  const pageNumbers = Array.from({ length: dynamicPage }, (_, i) => i + 1);

  return (
    <div className="flex flex-wrap justify-center items-center gap-2 mt-10">
      {/* Previous Button */}
      <button
        onClick={() => pageHandler(Math.max(1, page - 1))}
        className="px-3 py-1 rounded-md border bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50"
        disabled={page === 1}
      >
        Prev
      </button>

      {/* Page Numbers */}
      {pageNumbers.map((num) => (
        <button
          key={num}
          onClick={() => pageHandler(num)}
          className={`px-4 py-2 rounded-md border font-medium ${
            num === page
              ? "bg-red-500 text-white border-red-500"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          {num}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => pageHandler(Math.min(dynamicPage, page + 1))}
        className="px-3 py-1 rounded-md border bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50"
        disabled={page === dynamicPage}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
