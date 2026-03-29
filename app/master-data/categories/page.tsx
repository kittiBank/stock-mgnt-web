"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { Trash2, Edit2 } from "lucide-react";
import Breadcrumb from "@/app/components/Breadcrumb";
import Dialog from "@/app/components/Dialog";
import Badge from "@/app/components/Badge";
import Button from "@/app/components/ui/Button";
import FilterBar from "@/app/components/ui/FilterBar";
import CreateButton from "@/app/components/ui/CreateButton";
import Pagination from "@/app/components/ui/Pagination";
import CategoriesForm from "./CategoriesForm";
import { mockCategories, Category } from "./mockData";
import { generateUUID } from "@/app/lib/utils";

const ITEMS_PER_PAGE = 10;

// Main categories management page component
export default function CategoriesPage() {
  // State management
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCode, setFilterCode] = useState("");
  const [filterActive, setFilterActive] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >(undefined);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null,
  );
  const [, startTransition] = useTransition();

  // Filter and search logic
  const filteredCategories = useMemo(() => {
    return categories.filter((category) => {
      const matchesSearch =
        category.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.nameTh.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.nameEn.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCode =
        !filterCode ||
        category.code.toLowerCase().startsWith(filterCode.toLowerCase());

      const matchesActive =
        filterActive === ""
          ? true
          : filterActive === "true"
            ? category.isActive
            : !category.isActive;

      return matchesSearch && matchesCode && matchesActive;
    });
  }, [categories, searchTerm, filterCode, filterActive]);

  // Pagination logic
  const totalPages = Math.ceil(filteredCategories.length / ITEMS_PER_PAGE);
  const paginatedCategories = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredCategories.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredCategories, currentPage]);

  // Reset to first page when filters change
  useEffect(() => {
    startTransition(() => {
      setCurrentPage(1);
    });
  }, [searchTerm, filterCode, filterActive, startTransition]);

  // Handle form submission (create or update)
  const handleFormSubmit = (data: Partial<Category>) => {
    if (selectedCategory) {
      // Update existing category
      setCategories(
        categories.map((c) =>
          c.id === selectedCategory.id
            ? {
                ...c,
                ...data,
                updatedAt: new Date().toISOString(),
                updatedBy: "current-user",
              }
            : c,
        ),
      );
    } else {
      // Create new category
      const newCategory: Category = {
        id: generateUUID(),
        code: data.code || "",
        nameTh: data.nameTh || "",
        nameEn: data.nameEn || "",
        isActive: data.isActive ?? true,
        createdBy: "current-user",
        createdAt: new Date().toISOString(),
        updatedBy: "current-user",
        updatedAt: new Date().toISOString(),
      };
      setCategories([...categories, newCategory]);
    }
    handleCloseForm();
  };

  // Handle delete action
  const handleDelete = (category: Category) => {
    setCategoryToDelete(category);
    setIsDeleteConfirmOpen(true);
  };

  // Confirm delete action
  const handleConfirmDelete = () => {
    if (categoryToDelete) {
      setCategories(categories.filter((c) => c.id !== categoryToDelete.id));
      setIsDeleteConfirmOpen(false);
      setCategoryToDelete(null);
    }
  };

  // Handle edit action
  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setIsFormOpen(true);
  };

  // Handle create action
  const handleCreate = () => {
    setSelectedCategory(undefined);
    setIsFormOpen(true);
  };

  // Close form dialog
  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedCategory(undefined);
  };

  // Handle clear filters
  const handleClearFilters = () => {
    setSearchTerm("");
    setFilterCode("");
    setFilterActive("");
  };

  // Get unique category codes for filter dropdown
  const categoryCodeOptions = [
    { value: "", label: "ทั้งหมด" },
    ...Array.from(new Set(categories.map((c) => c.code)))
      .sort()
      .map((code) => ({ value: code, label: code })),
  ];

  return (
    <div className="p-6">
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { label: "Master Data", href: "/master-data" },
          { label: "Categories" },
        ]}
      />

      {/* Page Header */}
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-blue-950 mb-2">Categories</h1>
        <p className="text-blue-600">จัดการข้อมูลหมวดหมู่สินค้า</p>
      </div>

      {/* Create Button */}
      <CreateButton onClick={handleCreate} />

      {/* Filter Section */}
      <FilterBar
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        filterValue={filterCode}
        onFilterChange={setFilterCode}
        filterOptions={categoryCodeOptions}
        filterLabel="รหัสหมวดหมู่"
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
                <th className="px-4 py-4 text-left text-sm font-semibold text-blue-950 w-20">
                  รหัส
                </th>
                <th className="px-4 py-4 text-left text-sm font-semibold text-blue-950 w-40">
                  ชื่อ (ไทย)
                </th>
                <th className="px-4 py-4 text-left text-sm font-semibold text-blue-950 w-40">
                  ชื่อ (อังกฤษ)
                </th>
                <th className="px-4 py-4 text-left text-sm font-semibold text-blue-950 w-24">
                  สถานะ
                </th>
                <th className="px-4 py-4 text-center text-sm font-semibold text-blue-950 w-20">
                  จัดการ
                </th>
              </tr>
            </thead>

            {/* Table body */}
            <tbody>
              {paginatedCategories.length > 0 ? (
                paginatedCategories.map((category) => (
                  <tr
                    key={category.id}
                    className="border-b border-blue-100 hover:bg-blue-50 transition-colors"
                  >
                    <td className="px-4 py-3 text-sm font-medium text-blue-950 truncate">
                      {category.code}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 truncate">
                      {category.nameTh}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 truncate">
                      {category.nameEn}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <Badge variant={category.isActive ? "success" : "danger"}>
                        {category.isActive ? "เปิดใช้งาน" : "ปิดใช้งาน"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleEdit(category)}
                          className="text-blue-600 hover:text-blue-800 transition-colors p-2"
                          title="แก้ไข"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(category)}
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
                  <td colSpan={5} className="px-4 py-12 text-center">
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
            itemsCount={paginatedCategories.length}
            totalItems={filteredCategories.length}
            onPageChange={setCurrentPage}
          />
        )}
      </div>

      {/* Create/Edit Dialog */}
      <Dialog
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        title={selectedCategory ? "แก้ไขหมวดหมู่" : "สร้างหมวดหมู่ใหม่"}
        description={
          selectedCategory
            ? "อัปเดตข้อมูลหมวดหมู่"
            : "กรอกข้อมูลเพื่อสร้างหมวดหมู่ใหม่"
        }
        size="lg"
      >
        <CategoriesForm
          category={selectedCategory}
          onSubmit={handleFormSubmit}
        />
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        isOpen={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
        title="ยืนยันการลบ"
        description="คุณแน่ใจหรือที่จะลบหมวดหมู่นี้?"
        size="sm"
      >
        <div className="flex gap-3">
          <Button
            onClick={handleConfirmDelete}
            className="flex-1 bg-red-600 hover:bg-red-700"
          >
            ลบ
          </Button>
          <Button
            onClick={() => setIsDeleteConfirmOpen(false)}
            className="flex-1 bg-gray-400 hover:bg-gray-500"
          >
            ยกเลิก
          </Button>
        </div>
      </Dialog>
    </div>
  );
}
