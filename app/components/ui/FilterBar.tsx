"use client";

import { Search, X } from "lucide-react";
import Button from "./Button";
import Input from "./Input";
import Select from "./Select";

export interface FilterOption {
  value: string;
  label: string;
}

interface FilterBarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  filterValue: string;
  onFilterChange: (value: string) => void;
  filterOptions?: FilterOption[];
  filterLabel?: string;
  secondaryFilterValue?: string;
  onSecondaryFilterChange?: (value: string) => void;
  secondaryFilterOptions?: FilterOption[];
  secondaryFilterLabel?: string;
  onSearch?: () => void;
  onClear: () => void;
  title?: string;
}

// Reusable FilterBar component for search and filtering
export default function FilterBar({
  searchValue,
  onSearchChange,
  filterValue,
  onFilterChange,
  filterOptions = [],
  filterLabel = "ตัวกรอง",
  secondaryFilterValue = "",
  onSecondaryFilterChange,
  secondaryFilterOptions = [],
  secondaryFilterLabel = "ตัวกรอง 2",
  onSearch,
  onClear,
  title = "ค้นหา",
}: FilterBarProps) {
  return (
    <div className="bg-white rounded-lg border border-blue-200 p-6 mb-6">
      {/* Title */}
      {title && (
        <h2 className="text-lg font-semibold text-blue-950 mb-4">{title}</h2>
      )}

      {/* Search field */}
      <div className="mb-4">
        <Input
          type="text"
          placeholder="ค้นหาจากรหัส หรือชื่อ"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          icon={<Search size={18} />}
        />
      </div>

      {/* Filters row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Primary filter */}
        {filterOptions.length > 0 && (
          <Select
            value={filterValue}
            onChange={(e) => onFilterChange(e.target.value)}
            label={filterLabel}
          >
            <option value="">ทั้งหมด</option>
            {filterOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        )}

        {/* Secondary filter */}
        {secondaryFilterOptions.length > 0 && onSecondaryFilterChange && (
          <Select
            value={secondaryFilterValue}
            onChange={(e) => onSecondaryFilterChange(e.target.value)}
            label={secondaryFilterLabel}
          >
            <option value="">ทั้งหมด</option>
            {secondaryFilterOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex justify-center gap-3">
        <Button variant="primary" size="md" onClick={onSearch}>
          <Search size={18} />
          <span>ค้นหา</span>
        </Button>
        <Button variant="outline" size="md" onClick={onClear}>
          <X size={18} />
          <span>ล้างค่า</span>
        </Button>
      </div>
    </div>
  );
}
