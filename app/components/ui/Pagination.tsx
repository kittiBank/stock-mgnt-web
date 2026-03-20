import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "./Button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  itemsCount: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

// Pagination component following shadcn UI patterns
export default function Pagination({
  currentPage,
  totalPages,
  itemsCount,
  totalItems,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-6 py-4 border-t border-blue-200 bg-blue-50 gap-4">
      {/* Items info */}
      <div className="text-sm text-blue-600">
        แสดง {itemsCount} รายการจาก {totalItems} รายการทั้งหมด
      </div>

      {/* Pagination controls */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft size={16} />
          <span className="hidden sm:inline">ก่อนหน้า</span>
        </Button>

        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .slice(
              Math.max(0, currentPage - 2),
              Math.min(totalPages, currentPage + 1),
            )
            .map((page) => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`w-8 h-8 rounded-md text-sm font-medium transition-colors ${
                  currentPage === page
                    ? "bg-blue-600 text-white"
                    : "border border-blue-300 text-blue-600 hover:bg-white"
                }`}
              >
                {page}
              </button>
            ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
        >
          <span className="hidden sm:inline">ถัดไป</span>
          <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  );
}
