"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import Breadcrumb from "@/app/components/Breadcrumb";
import Dialog from "@/app/components/Dialog";
import CreateButton from "@/app/components/ui/CreateButton";
import FilterBar from "@/app/components/ui/FilterBar";
import Pagination from "@/app/components/ui/Pagination";
import UnitsForm from "./UnitsForm";
import UnitsTable from "./UnitsTable";
import { mockUnits, Unit } from "./mockData";
import { generateUUID } from "@/app/lib/utils";

const ITEMS_PER_PAGE = 10;

// Main units management page component
export default function UnitsPage() {
  // State management
  const [units, setUnits] = useState<Unit[]>(mockUnits);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterUnit, setFilterUnit] = useState("");
  const [filterActive, setFilterActive] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<Unit | undefined>(undefined);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [unitToDelete, setUnitToDelete] = useState<Unit | null>(null);
  const [, startTransition] = useTransition();

  // Filter and search logic
  const filteredUnits = useMemo(() => {
    return units.filter((unit) => {
      const matchesSearch =
        unit.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        unit.name_th.toLowerCase().includes(searchTerm.toLowerCase()) ||
        unit.name_en.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesUnit = !filterUnit || unit.code === filterUnit;

      const matchesActive =
        filterActive === ""
          ? true
          : filterActive === "true"
            ? unit.is_active
            : !unit.is_active;

      return matchesSearch && matchesUnit && matchesActive;
    });
  }, [units, searchTerm, filterUnit, filterActive]);

  // Pagination logic
  const totalPages = Math.ceil(filteredUnits.length / ITEMS_PER_PAGE);
  const paginatedUnits = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredUnits.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredUnits, currentPage]);

  // Reset to first page when filters change
  useEffect(() => {
    startTransition(() => {
      setCurrentPage(1);
    });
  }, [searchTerm, filterUnit, filterActive, startTransition]);

  // Handle form submission (create or update)
  const handleFormSubmit = (data: Partial<Unit>) => {
    if (selectedUnit) {
      // Update existing unit
      setUnits(
        units.map((u) =>
          u.id === selectedUnit.id
            ? {
                ...u,
                ...data,
                updated_at: new Date().toISOString(),
                updated_by: "current-user",
              }
            : u,
        ),
      );
    } else {
      // Create new unit
      const newUnit: Unit = {
        id: generateUUID(),
        code: data.code || "",
        name_th: data.name_th || "",
        name_en: data.name_en || "",
        is_active: data.is_active ?? true,
        created_by: "current-user",
        created_at: new Date().toISOString(),
        updated_by: "current-user",
        updated_at: new Date().toISOString(),
      };
      setUnits([...units, newUnit]);
    }
    handleCloseForm();
  };

  // Handle delete action
  const handleDelete = (unit: Unit) => {
    setUnitToDelete(unit);
    setIsDeleteConfirmOpen(true);
  };

  // Confirm delete action
  const handleConfirmDelete = () => {
    if (unitToDelete) {
      setUnits(units.filter((u) => u.id !== unitToDelete.id));
      setIsDeleteConfirmOpen(false);
      setUnitToDelete(null);
    }
  };

  // Handle edit action
  const handleEdit = (unit: Unit) => {
    setSelectedUnit(unit);
    setIsFormOpen(true);
  };

  // Close form dialog
  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedUnit(undefined);
  };

  // Handle clear filters
  const handleClearFilters = () => {
    setSearchTerm("");
    setFilterUnit("");
    setFilterActive("");
  };

  // Handle toggle modal
  const handleToggleModal = () => {
    setIsFormOpen(!isFormOpen);
    if (isFormOpen) {
      setSelectedUnit(undefined);
    }
  };

  return (
    <div className="p-6">
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { label: "Master Data", href: "/master-data" },
          { label: "Units" },
        ]}
      />

      {/* Page Header */}
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-blue-950 mb-2">Units</h1>
        <p className="text-blue-600">จัดการข้อมูลหน่วยนับของสินค้า</p>
      </div>

      {/* Create Button */}
      <CreateButton onClick={handleToggleModal} />

      {/* Filter Section */}
      <FilterBar
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        filterValue={filterUnit}
        onFilterChange={setFilterUnit}
        filterOptions={units.map((u) => ({ value: u.code, label: u.code }))}
        filterLabel="รหัสหน่วย"
        secondaryFilterValue={filterActive}
        onSecondaryFilterChange={setFilterActive}
        secondaryFilterOptions={[
          { value: "true", label: "เปิดใช้งาน" },
          { value: "false", label: "ปิดใช้งาน" },
        ]}
        secondaryFilterLabel="สถานะ"
        onClear={handleClearFilters}
        title="ค้นหา"
      />

      {/* Table Section */}
      <UnitsTable
        units={paginatedUnits}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsCount={paginatedUnits.length}
          totalItems={filteredUnits.length}
          onPageChange={setCurrentPage}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        isOpen={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
        title="ยืนยันการลบ"
        description="คุณแน่ใจหรือไม่ว่าต้องการลบหน่วยนี้"
        size="sm"
      >
        <div className="flex gap-3">
          <button
            onClick={handleConfirmDelete}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            ลบ
          </button>
          <button
            onClick={() => setIsDeleteConfirmOpen(false)}
            className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            ยกเลิก
          </button>
        </div>
      </Dialog>

      {/* Create/Edit Modal with Toggle */}
      <Dialog
        isOpen={isFormOpen}
        onClose={handleToggleModal}
        title={selectedUnit ? "แก้ไขหน่วย" : "สร้างหน่วยใหม่"}
        description={
          selectedUnit ? "อัปเดตข้อมูลหน่วย" : "กรอกข้อมูลเพื่อสร้างหน่วยใหม่"
        }
        size="lg"
      >
        <UnitsForm unit={selectedUnit} onSubmit={handleFormSubmit} />
      </Dialog>
    </div>
  );
}
