// File: Pagination.jsx
import React from "react";

export default function Pagination({ page, setPage, pageCount, filteredLength, PAGE_SIZE }) {
  console.log({ page, pageCount, filteredLength }); 
  return (
    <div className="p-3 flex flex-wrap justify-between items-center text-xs bg-base-300/70 w-full border-t border-base-300 rounded-b-xl">
      <div className="mb-2 sm:mb-0 text-base-content/80">
        Hiển thị {(page - 1) * PAGE_SIZE + 1} – {Math.min(page * PAGE_SIZE, filteredLength)} / {filteredLength}
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-3 py-1 border border-base-300 rounded-md hover:bg-base-300/40 disabled:opacity-50 disabled:hover:bg-transparent"
        >
          Prev
        </button>
        <div className="px-3 py-1 border border-base-300 rounded-md bg-base-100 shadow-inner">{page}</div>
        <button
          onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
          disabled={page === pageCount}
          className="px-3 py-1 border border-base-300 rounded-md hover:bg-base-300/40 disabled:opacity-50 disabled:hover:bg-transparent"
        >
          Next
        </button>
      </div>
    </div>
  );
}
