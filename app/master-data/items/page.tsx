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
import ItemsForm from "./ItemsForm";
import { mockProducts, Product, categories, units } from "./mockData";
import { generateUUID } from "@/app/lib/utils";

const ITEMS_PER_PAGE = 10;

// Main items management page component
export default function ItemsPage() {
  // State management
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterActive, setFilterActive] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(
    undefined,
  );
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [, startTransition] = useTransition();

  // Filter and search logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.nameTh.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.nameEn.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        !filterCategory || product.categoryId === filterCategory;

      const matchesActive =
        filterActive === ""
          ? true
          : filterActive === "true"
            ? product.isActive
            : !product.isActive;

      return matchesSearch && matchesCategory && matchesActive;
    });
  }, [products, searchTerm, filterCategory, filterActive]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  // Reset to first page when filters change
  useEffect(() => {
    startTransition(() => {
      setCurrentPage(1);
    });
  }, [searchTerm, filterCategory, filterActive, startTransition]);

  // Handle form submission (create or update)
  const handleFormSubmit = (data: Partial<Product>) => {
    if (selectedProduct) {
      // Update existing product
      setProducts(
        products.map((p) =>
          p.id === selectedProduct.id
            ? {
                ...p,
                ...data,
                updatedAt: new Date().toISOString(),
                updatedBy: "current-user",
              }
            : p,
        ),
      );
    } else {
      // Create new product
      const newProduct: Product = {
        id: generateUUID(),
        code: data.code || "",
        nameTh: data.nameTh || "",
        nameEn: data.nameEn || "",
        categoryId: data.categoryId || "",
        subCategoryId: data.subCategoryId || "",
        unitId: data.unitId || "",
        supplierId: data.supplierId || "",
        costPrice: data.costPrice || 0,
        salePrice: data.salePrice || 0,
        isActive: data.isActive ?? true,
        createdBy: "current-user",
        createdAt: new Date().toISOString(),
        updatedBy: "current-user",
        updatedAt: new Date().toISOString(),
      };
      setProducts([...products, newProduct]);
    }
    handleCloseForm();
  };

  // Handle delete action
  const handleDelete = (product: Product) => {
    setProductToDelete(product);
    setIsDeleteConfirmOpen(true);
  };

  // Confirm delete action
  const handleConfirmDelete = () => {
    if (productToDelete) {
      setProducts(products.filter((p) => p.id !== productToDelete.id));
      setIsDeleteConfirmOpen(false);
      setProductToDelete(null);
    }
  };

  // Handle edit action
  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsFormOpen(true);
  };

  // Handle create action
  const handleCreate = () => {
    setSelectedProduct(undefined);
    setIsFormOpen(true);
  };

  // Close form dialog
  const handleCloseForm = () => {
    setIsFormOpen(false);
    setSelectedProduct(undefined);
  };

  // Handle clear filters
  const handleClearFilters = () => {
    setSearchTerm("");
    setFilterCategory("");
    setFilterActive("");
  };

  // Get category label
  const getCategoryLabel = (categoryId: string) => {
    return categories.find((c) => c.value === categoryId)?.label || categoryId;
  };

  // Get unit label
  const getUnitLabel = (unitId: string) => {
    return units.find((u) => u.value === unitId)?.label || unitId;
  };

  return (
    <div className="p-6">
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { label: "Master Data", href: "/master-data" },
          { label: "Item Master" },
        ]}
      />

      {/* Page Header */}
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-blue-950 mb-2">Item Master</h1>
        <p className="text-blue-600">จัดการข้อมูลสินค้าและผลิตภัณฑ์ในระบบ</p>
      </div>

      {/* Create Button */}
      <CreateButton onClick={handleCreate} />

      {/* Filter Section */}
      <FilterBar
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        filterValue={filterCategory}
        onFilterChange={setFilterCategory}
        filterOptions={categories as FilterOption[]}
        filterLabel="หมวดหมู่"
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
        <div className="w-full overflow-hidden">
          <table className="w-full border-collapse">
            {/* Table header */}
            <thead>
              <tr className="bg-blue-50 border-b border-blue-200">
                <th className="px-3 py-3 text-left text-xs font-semibold text-blue-950 whitespace-nowrap">
                  รหัสสินค้า
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-blue-950 whitespace-nowrap min-w-fit">
                  ชื่อสินค้า (ไทย)
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-blue-950 whitespace-nowrap">
                  หมวดหมู่
                </th>
                <th className="px-3 py-3 text-left text-xs font-semibold text-blue-950 whitespace-nowrap">
                  หน่วยนับ
                </th>
                <th className="px-3 py-3 text-right text-xs font-semibold text-blue-950 whitespace-nowrap">
                  ราคาต้นทุน
                </th>
                <th className="px-3 py-3 text-right text-xs font-semibold text-blue-950 whitespace-nowrap">
                  ราคาขาย
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
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-blue-100 hover:bg-blue-50 transition-colors"
                  >
                    <td className="px-3 py-3 text-xs font-medium text-blue-950 whitespace-nowrap">
                      {product.code}
                    </td>
                    <td className="px-3 py-3 text-xs text-gray-700 whitespace-nowrap min-w-fit">
                      {product.nameTh}
                    </td>
                    <td className="px-3 py-3 text-xs whitespace-nowrap">
                      <Badge variant="info">
                        {getCategoryLabel(product.categoryId)}
                      </Badge>
                    </td>
                    <td className="px-3 py-3 text-xs text-gray-700 whitespace-nowrap">
                      {getUnitLabel(product.unitId)}
                    </td>
                    <td className="px-3 py-3 text-xs text-right text-gray-700 whitespace-nowrap">
                      {product.costPrice.toLocaleString("th-TH", {
                        style: "currency",
                        currency: "THB",
                      })}
                    </td>
                    <td className="px-3 py-3 text-xs text-right text-gray-700 whitespace-nowrap">
                      {product.salePrice.toLocaleString("th-TH", {
                        style: "currency",
                        currency: "THB",
                      })}
                    </td>
                    <td className="px-3 py-3 text-xs whitespace-nowrap">
                      <Badge variant={product.isActive ? "success" : "danger"}>
                        {product.isActive ? "เปิดใช้" : "ปิด"}
                      </Badge>
                    </td>
                    <td className="px-3 py-3 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => handleEdit(product)}
                          className="text-blue-600 hover:text-blue-800 transition-colors p-1"
                          title="แก้ไข"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(product)}
                          className="text-red-600 hover:text-red-800 transition-colors p-1"
                          title="ลบ"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-3 py-12 text-center">
                    <p className="text-gray-500 text-sm">
                      ไม่พบรายการที่ตรงกับการค้นหา
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredProducts.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsCount={paginatedProducts.length}
            totalItems={filteredProducts.length}
            onPageChange={setCurrentPage}
          />
        )}
      </div>

      {/* Create/Edit Dialog */}
      <Dialog
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        title={selectedProduct ? "แก้ไขสินค้า" : "สร้างสินค้าใหม่"}
        description={
          selectedProduct
            ? "อัปเดตข้อมูลสินค้า"
            : "กรอกข้อมูลเพื่อสร้างสินค้าใหม่"
        }
        size="lg"
      >
        <ItemsForm product={selectedProduct} onSubmit={handleFormSubmit} />
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        isOpen={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
        title="ยืนยันการลบ"
        description={`คุณแน่ใจว่าต้องการลบสินค้า "${productToDelete?.nameTh}" หรือไม่?`}
        size="sm"
      >
        <div className="flex gap-3 pt-4">
          <Button
            onClick={() => setIsDeleteConfirmOpen(false)}
            className="flex-1 bg-gray-400 hover:bg-gray-500"
          >
            ยกเลิก
          </Button>
          <Button
            onClick={handleConfirmDelete}
            className="flex-1 bg-red-600 hover:bg-red-700"
          >
            ลบ
          </Button>
        </div>
      </Dialog>
    </div>
  );
}
