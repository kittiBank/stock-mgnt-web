"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { Edit2 } from "lucide-react";
import Breadcrumb from "@/app/components/Breadcrumb";
import Badge from "@/app/components/Badge";
import FilterBar, { FilterOption } from "@/app/components/ui/FilterBar";
import CreateButton from "@/app/components/ui/CreateButton";
import Pagination from "@/app/components/ui/Pagination";
import StockIOForm from "./StockIOForm";
import {
  mockProducts,
  movementTypes,
  stores,
  StockMovement,
  getProductName,
  getStoreName,
  getStatusVariant,
  getStatusLabel,
} from "./mockData";
import { generateUUID } from "@/app/lib/utils";

const ITEMS_PER_PAGE = 10;

// Get movement type badge color
const getMovementTypeVariant = (type: string) => {
  switch (type) {
    case "IN":
      return "success";
    case "OUT":
      return "danger";
    default:
      return "default";
  }
};

// Get movement type label
const getMovementTypeLabel = (type: string) => {
  return movementTypes.find((t) => t.value === type)?.label || type;
};

// Stock In/Out page component
export default function StockIOPage() {
  // State management
  const [movements, setMovements] = useState<StockMovement[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterStore, setFilterStore] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedMovement, setSelectedMovement] = useState<
    StockMovement | undefined
  >(undefined);
  const [, startTransition] = useTransition();

  // Filter and search logic
  const filteredMovements = useMemo(() => {
    return movements.filter((movement) => {
      const matchesSearch =
        movement.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movement.storeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movement.remark?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType = !filterType || movement.movementType === filterType;

      const matchesStore = !filterStore || movement.storeId === filterStore;

      return matchesSearch && matchesType && matchesStore;
    });
  }, [movements, searchTerm, filterType, filterStore]);

  // Pagination logic
  const totalPages = Math.ceil(filteredMovements.length / ITEMS_PER_PAGE);
  const paginatedMovements = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredMovements.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredMovements, currentPage]);

  // Reset to first page when filters change
  useEffect(() => {
    startTransition(() => {
      setCurrentPage(1);
    });
  }, [searchTerm, filterType, filterStore, startTransition]);

  // Handle form submission (create or update)
  const handleFormSubmit = (data: Partial<StockMovement>) => {
    if (selectedMovement) {
      // Update existing movement
      setMovements(
        movements.map((m) =>
          m.id === selectedMovement.id
            ? {
                ...m,
                ...data,
                updatedAt: new Date().toISOString(),
                updatedBy: "current-user",
                productName: getProductName(data.productId || m.productId),
                storeName: getStoreName(data.storeId || m.storeId),
              }
            : m,
        ),
      );
    } else {
      // Create new movement with default status pending
      const newMovement: StockMovement = {
        id: `mov-${generateUUID()}`,
        productId: data.productId || "",
        storeId: data.storeId || "",
        movementType: (data.movementType as "IN" | "OUT") || "IN",
        quantity: data.quantity || 0,
        remark: data.remark,
        status: "pending", // New items default to pending
        createdBy: "current-user",
        createdAt: new Date().toISOString(),
        updatedBy: "current-user",
        updatedAt: new Date().toISOString(),
        productName: getProductName(data.productId || ""),
        storeName: getStoreName(data.storeId || ""),
      };
      setMovements([newMovement, ...movements]);
    }
    handleCloseForm();
  };

  // Handle edit action
  const handleEdit = (movement: StockMovement) => {
    setSelectedMovement(movement);
    setIsFormOpen(true);
  };

  // Handle create action
  const handleCreate = () => {
    setSelectedMovement(undefined);
    setIsFormOpen(true);
  };

  // Close form dialog
  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedMovement(undefined);
  };

  // Handle clear filters
  const handleClearFilters = () => {
    setSearchTerm("");
    setFilterType("");
    setFilterStore("");
  };

  return (
    <div className="p-6">
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { label: "Stock Management", href: "/stock-management" },
          { label: "Stock In / Out" },
        ]}
      />

      {/* Page Header */}
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-blue-950 mb-2">
          Stock In / Out
        </h1>
        <p className="text-blue-600">
          จัดการการเข้าออกสินค้า สร้าง แก้ไข ลบ รายการเคลื่อนไหว
        </p>
      </div>

      {/* Create Button */}
      <CreateButton onClick={handleCreate} />

      {/* Filter Section */}
      <FilterBar
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        filterValue={filterType}
        onFilterChange={setFilterType}
        filterOptions={movementTypes as FilterOption[]}
        filterLabel="ประเภทการเคลื่อนไหว"
        secondaryFilterValue={filterStore}
        onSecondaryFilterChange={setFilterStore}
        secondaryFilterOptions={stores as FilterOption[]}
        secondaryFilterLabel="สาขา"
        onClear={handleClearFilters}
        title="ค้นหาและกรอง"
      />

      {/* Table Section */}
      <div className="bg-white rounded-lg border border-blue-200 overflow-hidden">
        <div className="w-full overflow-hidden">
          <table className="w-full border-collapse">
            {/* Table header */}
            <thead>
              <tr className="bg-blue-50 border-b border-blue-200">
                <th className="px-3 py-3 text-left text-xs font-semibold text-blue-950 whitespace-nowrap">
                  วันที่
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-blue-950 whitespace-nowrap">
                  สินค้า
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-blue-950 whitespace-nowrap">
                  สาขา
                </th>
                <th className="px-3 py-3 text-center text-xs font-semibold text-blue-950 whitespace-nowrap">
                  ประเภท
                </th>
                <th className="px-3 py-3 text-right text-xs font-semibold text-blue-950 whitespace-nowrap">
                  จำนวน
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-blue-950 whitespace-nowrap">
                  หมายเหตุ
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-blue-950 whitespace-nowrap">
                  ผู้บันทึก
                </th>
                <th className="px-3 py-3 text-center text-xs font-semibold text-blue-950 whitespace-nowrap">
                  สถานะ
                </th>
                <th className="px-3 py-3 text-center text-xs font-semibold text-blue-950 whitespace-nowrap">
                  จัดการ
                </th>
              </tr>
            </thead>

            {/* Table body */}
            <tbody>
              {paginatedMovements.length > 0 ? (
                paginatedMovements.map((movement) => (
                  <tr
                    key={movement.id}
                    className="border-b border-blue-100 hover:bg-blue-50 transition-colors"
                  >
                    <td className="px-3 py-3 text-xs text-gray-700 whitespace-nowrap">
                      {new Date(movement.createdAt).toLocaleDateString("th-TH")}
                    </td>
                    <td className="px-3 py-3 text-xs font-medium text-blue-950 whitespace-nowrap">
                      {movement.productName}
                    </td>
                    <td className="px-3 py-3 text-xs text-gray-700 whitespace-nowrap">
                      {movement.storeName}
                    </td>
                    <td className="px-3 py-3 text-center whitespace-nowrap">
                      <Badge
                        variant={getMovementTypeVariant(movement.movementType)}
                      >
                        {getMovementTypeLabel(movement.movementType)}
                      </Badge>
                    </td>
                    <td className="px-3 py-3 text-xs text-right font-semibold text-gray-900 whitespace-nowrap">
                      {movement.quantity > 0 && "+"}
                      {movement.quantity}
                    </td>
                    <td className="px-3 py-3 text-xs text-gray-600 whitespace-nowrap max-w-xs truncate">
                      {movement.remark || "-"}
                    </td>
                    <td className="px-3 py-3 text-xs text-gray-700 whitespace-nowrap">
                      {movement.createdBy}
                    </td>
                    <td className="px-3 py-3 text-center whitespace-nowrap">
                      <Badge variant={getStatusVariant(movement.status)}>
                        {getStatusLabel(movement.status)}
                      </Badge>
                    </td>
                    <td className="px-3 py-3 text-center whitespace-nowrap">
                      <button
                        onClick={() => handleEdit(movement)}
                        className="text-blue-600 hover:text-blue-800 transition-colors p-1"
                        title="แก้ไข"
                      >
                        <Edit2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="px-3 py-12 text-center">
                    <p className="text-gray-500 text-sm">
                      ไม่พบรายการที่ตรงกับการค้นหา
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsCount={paginatedMovements.length}
          totalItems={filteredMovements.length}
          onPageChange={setCurrentPage}
        />
      )}

      {/* Stock IO Form Dialog */}
      <StockIOForm
        movement={selectedMovement}
        onSubmit={handleFormSubmit}
        onClose={handleCloseForm}
        isOpen={isFormOpen}
      />
    </div>
  );
}
