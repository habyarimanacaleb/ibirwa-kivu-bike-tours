import React from "react";
import { motion } from "framer-motion";

const Pagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      {/* Prev */}
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="px-4 py-2 rounded-md border disabled:opacity-40"
      >
        Prev
      </button>

      {/* Page numbers */}
      {[...Array(totalPages)].map((_, i) => {
        const p = i + 1;
        const active = p === page;

        return (
          <motion.button
            key={p}
            whileTap={{ scale: 0.9 }}
            onClick={() => onPageChange(p)}
            className={`w-10 h-10 rounded-full font-semibold transition
              ${
                active
                  ? "bg-blue-600 text-white"
                  : "bg-white border hover:bg-blue-50"
              }
            `}
          >
            {p}
          </motion.button>
        );
      })}

      {/* Next */}
      <div className="mt-6 justify-center mb-6">
        <button
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          className="px-4 py-2 rounded-md border disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
