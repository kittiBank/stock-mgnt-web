"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { Trash2, Edit2 } from "lucide-react";
import Breadcrumb from "@/app/components/Breadcrumb";
import Dialog from "@/app/components/Dialog";
import Badge from "@/app/components/Badge";
import Button from "@/app/components/ui/Button";
import FilterBar, { FilterOption } from "@/app/components/ui/FilterBar";
import CreateButton from "@/app/components/ui/CreateButton";
import Pagination from "@/app/components/ui/Pagination";
import StoresForm from "./StoresForm";
import { mockStores, Store, storeTypes } from "./mockData";
import { generateUUID } from "@/app/lib/utils";
const ITEMS_PER_PAGE = 10;

// Main stores management page component
export default function StoresPage() {
  // State management
  const [stores, setStores] = useState<Store[]>(mockStores);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterActive, setFilterActive] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState<Store | undefined>(
    undefined,
  );
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [storeToDelete, setStoreToDelete] = useState<Store | null>(null);
  const [, startTransition] = useTransition();

  // Filter and search logic
  const filteredStores = useMemo(() => {
    return stores.filter((store) => {
      const matchesSearch =
        store.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.nameTh.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.nameEn.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType = !filterType || store.type === filterType;

      const matchesActive =
        filterActive === ""
          ? true
          : filterActive === "true"
            ? store.isActive
            : !store.isActive;

      return matchesSearch && matchesType && matchesActive;
    });
  }, [stores, searchTerm, filterType, filterActive]);

  // Pagination logic
  const totalPages = Math.ceil(filteredStores.length / ITEMS_PER_PAGE);
  const paginatedStores = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredStores.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredStores, currentPage]);

  // Reset to first page when filters change
  useEffect(() => {
    startTransition(() => {
      setCurrentPage(1);
    });
  }, [searchTerm, filterType, filterActive, startTransition]);

  // Handle form submission (create or update)
  const handleFormSubmit = (data: Partial<Store>) => {
    if (selectedStore) {
      // Update existing store
      setStores(
        stores.map((s) =>
          s.id === selectedStore.id
            ? {
                ...s,
                ...data,
                updatedAt: new Date().toISOString(),
                updatedBy: "current-user",
              }
            : s,
        ),
      );
    } else {
      // Create new store
      const newStore: Store = {
        id: generateUUID(),
        code: data.code || "",
        nameTh: data.nameTh || "",
        nameEn: data.nameEn || "",
        type: data.type || "WAREHOUSE",
        address: data.address || "",
        isActive: data.isActive ?? true,
        createdBy: "current-user",
        createdAt: new Date().toISOString(),
        updatedBy: "current-user",
        updatedAt: new Date().toISOString(),
      };
      setStores([...stores, newStore]);
    }
    handleCloseForm();
  };

  // Handle delete action
  const handleDelete = (store: Store) => {
    setStoreToDelete(store);
    setIsDeleteConfirmOpen(true);
  };

  // Confirm delete action
  const handleConfirmDelete = () => {
    if (storeToDelete) {
      setStores(stores.filter((s) => s.id !== storeToDelete.id));
      setIsDeleteConfirmOpen(false);
      setStoreToDelete(null);
    }
  };

  // Handle edit action
  const handleEdit = (store: Store) => {
    setSelectedStore(store);
    setIsFormOpen(true);
  };

  // Handle create action
  const handleCreate = () => {
    setSelectedStore(undefined);
    setIsFormOpen(true);
  };

  // Close form dialog
  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedStore(undefined);
  };

  // Handle clear filters
  const handleClearFilters = () => {
    setSearchTerm("");
    setFilterType("");
    setFilterActive("");
  };

  // Get store type label
  const getTypeLabel = (type: string) => {
    return storeTypes.find((t) => t.value === type)?.label || type;
  };

  return (
    <div className="p-6">
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { label: "Master Data", href: "/master-data" },
          { label: "Stores / Warehouse" },
        ]}
      />

      {/* Page Header */}
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-blue-950 mb-2">
          Stores / Warehouse
        </h1>
        <p className="text-blue-600">จัดการข้อมูลคลังสินค้าและสถานที่จัดเก็บ</p>
      </div>

      {/* Create Button */}
      <CreateButton onClick={handleCreate} />

      {/* Filter Section */}
      <FilterBar
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        filterValue={filterType}
        onFilterChange={setFilterType}
        filterOptions={storeTypes as FilterOption[]}
        filterLabel="ประเภทคลัง"
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
      <div className="bg-white rounded-lg border border-blue-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Table header */}
            <thead>
              <tr className="bg-blue-50 border-b border-blue-200">
                <th className="px-6 py-4 text-left text-sm font-semibold text-blue-950">
                  รหัสคลัง
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-blue-950">
                  ชื่อคลัง (ไทย)
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-blue-950">
                  ชื่อคลัง (อังกฤษ)
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-blue-950">
                  ประเภท
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-blue-950">
                  สถานะ
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-blue-950">
                  จัดการ
                </th>
              </tr>
            </thead>

            {/* Table body */}
            <tbody>
              {paginatedStores.length > 0 ? (
                paginatedStores.map((store) => (
                  <tr
                    key={store.id}
                    className="border-b border-blue-100 hover:bg-blue-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-blue-950">
                      {store.code}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {store.nameTh}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {store.nameEn}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <Badge variant="info">{getTypeLabel(store.type)}</Badge>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <Badge variant={store.isActive ? "success" : "danger"}>
                        {store.isActive ? "เปิดใช้งาน" : "ปิดใช้งาน"}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleEdit(store)}
                          className="text-blue-600 hover:text-blue-800 transition-colors p-2"
                          title="แก้ไข"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(store)}
                          className="text-red-600 hover:text-red-800 transition-colors p-2"
                          title="ลบ"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <p className="text-gray-500">
                      ไม่พบรายการที่ตรงกับการค้นหา
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsCount={paginatedStores.length}
            totalItems={filteredStores.length}
            onPageChange={setCurrentPage}
          />
        )}
      </div>

      {/* Create/Edit Dialog */}
      <Dialog
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        title={selectedStore ? "แก้ไขคลังสินค้า" : "สร้างคลังสินค้าใหม่"}
        description={
          selectedStore
            ? "อัปเดตข้อมูลการจัดเก็บสินค้า"
            : "กรอกข้อมูลเพื่อสร้างคลังสินค้าใหม่"
        }
        size="lg"
      >
        <StoresForm store={selectedStore} onSubmit={handleFormSubmit} />
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        isOpen={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
        title="ยืนยันการลบ"
        description="การดำเนินการนี้ไม่สามารถย้อนกลับได้"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-700">
            คุณแน่ใจหรือว่าต้องการลบ{" "}
            <span className="font-semibold text-blue-950">
              {storeToDelete?.nameTh}
            </span>{" "}
            ?
          </p>
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              size="md"
              onClick={() => setIsDeleteConfirmOpen(false)}
              className="flex-1"
            >
              ยกเลิก
            </Button>
            <Button
              variant="destructive"
              size="md"
              onClick={handleConfirmDelete}
              className="flex-1"
            >
              ลบ
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
