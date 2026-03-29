"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "@/app/components/ui/Input";
import Select from "@/app/components/ui/Select";
import Button from "@/app/components/ui/Button";
import {
  Product,
  categories,
  subCategories,
  units,
  suppliers,
} from "./mockData";

interface ItemsFormProps {
  product?: Product;
  onSubmit: (data: Partial<Product>) => void;
  isLoading?: boolean;
}

// Form component for creating and editing products with shadcn UI components
export default function ItemsForm({
  product,
  onSubmit,
  isLoading = false,
}: ItemsFormProps) {
  const [isActive, setIsActive] = useState(product?.isActive ?? true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      code: product?.code || "",
      nameTh: product?.nameTh || "",
      nameEn: product?.nameEn || "",
      categoryId: product?.categoryId || "",
      subCategoryId: product?.subCategoryId || "",
      unitId: product?.unitId || "",
      supplierId: product?.supplierId || "",
      costPrice: product?.costPrice || 0,
      salePrice: product?.salePrice || 0,
      isActive: product?.isActive ?? true,
    },
  });

  const handleSubmitWithToggle = (data: Record<string, unknown>) => {
    onSubmit({ ...data, isActive });
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitWithToggle)} className="space-y-5">
      {/* Code field */}
      <Input
        label="รหัสสินค้า *"
        placeholder="เช่น PROD001"
        {...register("code", {
          required: "กรุณากรอกรหัสสินค้า",
          minLength: { value: 3, message: "รหัสต้องยาวอย่างน้อย 3 ตัวอักษร" },
        })}
        error={errors.code?.message ? String(errors.code.message) : ""}
        disabled={isLoading || !!product}
      />

      {/* Name Thai field */}
      <Input
        label="ชื่อสินค้า (ไทย) *"
        placeholder="เช่น โทรศัพท์สมาร์ทโฟน"
        {...register("nameTh", {
          required: "กรุณากรอกชื่อสินค้า (ไทย)",
        })}
        error={errors.nameTh?.message ? String(errors.nameTh.message) : ""}
        disabled={isLoading}
      />

      {/* Name English field */}
      <Input
        label="ชื่อสินค้า (อังกฤษ) *"
        placeholder="เช่น Smartphone"
        {...register("nameEn", {
          required: "กรุณากรอกชื่อสินค้า (อังกฤษ)",
        })}
        error={errors.nameEn?.message ? String(errors.nameEn.message) : ""}
        disabled={isLoading}
      />

      {/* Category field - Select component */}
      <Select
        label="หมวดหมู่ *"
        {...register("categoryId", {
          required: "กรุณาเลือกหมวดหมู่",
        })}
        error={
          errors.categoryId?.message ? String(errors.categoryId.message) : ""
        }
        disabled={isLoading}
      >
        <option value="">เลือกหมวดหมู่</option>
        {categories.map((cat) => (
          <option key={cat.value} value={cat.value}>
            {cat.label}
          </option>
        ))}
      </Select>

      {/* Sub Category field - Select component */}
      <Select
        label="หมวดหมู่ย่อย *"
        {...register("subCategoryId", {
          required: "กรุณาเลือกหมวดหมู่ย่อย",
        })}
        error={
          errors.subCategoryId?.message
            ? String(errors.subCategoryId.message)
            : ""
        }
        disabled={isLoading}
      >
        <option value="">เลือกหมวดหมู่ย่อย</option>
        {subCategories.map((subCat) => (
          <option key={subCat.value} value={subCat.value}>
            {subCat.label}
          </option>
        ))}
      </Select>

      {/* Unit field - Select component */}
      <Select
        label="หน่วยนับ *"
        {...register("unitId", {
          required: "กรุณาเลือกหน่วยนับ",
        })}
        error={errors.unitId?.message ? String(errors.unitId.message) : ""}
        disabled={isLoading}
      >
        <option value="">เลือกหน่วยนับ</option>
        {units.map((unit) => (
          <option key={unit.value} value={unit.value}>
            {unit.label}
          </option>
        ))}
      </Select>

      {/* Supplier field - Select component */}
      <Select
        label="ผู้จัดส่ง *"
        {...register("supplierId", {
          required: "กรุณาเลือกผู้จัดส่ง",
        })}
        error={
          errors.supplierId?.message ? String(errors.supplierId.message) : ""
        }
        disabled={isLoading}
      >
        <option value="">เลือกผู้จัดส่ง</option>
        {suppliers.map((sup) => (
          <option key={sup.value} value={sup.value}>
            {sup.label}
          </option>
        ))}
      </Select>

      {/* Cost Price field */}
      <Input
        label="ราคาต้นทุน *"
        placeholder="เช่น 1000"
        type="number"
        {...register("costPrice", {
          required: "กรุณากรอกราคาต้นทุน",
          min: { value: 0, message: "ราคาต้องอย่างน้อย 0" },
        })}
        error={
          errors.costPrice?.message ? String(errors.costPrice.message) : ""
        }
        disabled={isLoading}
      />

      {/* Sale Price field */}
      <Input
        label="ราคาขาย *"
        placeholder="เช่น 1500"
        type="number"
        {...register("salePrice", {
          required: "กรุณากรอกราคาขาย",
          min: { value: 0, message: "ราคาต้องอย่างน้อย 0" },
        })}
        error={
          errors.salePrice?.message ? String(errors.salePrice.message) : ""
        }
        disabled={isLoading}
      />

      {/* Status field - Toggle component */}
      <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
        <label className="text-sm font-medium text-blue-950">เปิดใช้งาน</label>
        <button
          type="button"
          disabled={isLoading}
          onClick={() => setIsActive(!isActive)}
          className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
            isActive ? "bg-blue-600" : "bg-gray-300"
          } ${isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        >
          <span
            className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
              isActive ? "translate-x-7" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      {/* Submit Button */}
      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-blue-600 hover:bg-blue-700"
        >
          {isLoading ? "กำลังบันทึก..." : "บันทึก"}
        </Button>
      </div>
    </form>
  );
}
