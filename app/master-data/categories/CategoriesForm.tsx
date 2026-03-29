"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "@/app/components/ui/Input";
import Button from "@/app/components/ui/Button";
import Toggle from "@/app/components/ui/Toggle";
import { Category } from "./mockData";

interface CategoriesFormProps {
  category?: Category;
  onSubmit: (data: Partial<Category>) => void;
  isLoading?: boolean;
}

// Form component for creating and editing categories with shadcn UI components
export default function CategoriesForm({
  category,
  onSubmit,
  isLoading = false,
}: CategoriesFormProps) {
  const [isActive, setIsActive] = useState(category?.isActive ?? true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      code: category?.code || "",
      nameTh: category?.nameTh || "",
      nameEn: category?.nameEn || "",
    },
  });

  // Handle form submission with toggle state
  const handleFormSubmit = (data: Record<string, unknown>) => {
    onSubmit({ ...data, isActive });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
      {/* Code field */}
      <Input
        label="รหัสหมวดหมู่ *"
        placeholder="เช่น CAT001"
        {...register("code", {
          required: "กรุณากรอกรหัสหมวดหมู่",
          minLength: { value: 2, message: "รหัสต้องยาวอย่างน้อย 2 ตัวอักษร" },
        })}
        error={errors.code?.message ? String(errors.code.message) : ""}
        disabled={isLoading || !!category}
      />

      {/* Name Thai field */}
      <Input
        label="ชื่อหมวดหมู่ (ไทย) *"
        placeholder="เช่น อิเล็กทรอนิกส์"
        {...register("nameTh", {
          required: "กรุณากรอกชื่อหมวดหมู่ (ไทย)",
        })}
        error={errors.nameTh?.message ? String(errors.nameTh.message) : ""}
        disabled={isLoading}
      />

      {/* Name English field */}
      <Input
        label="ชื่อหมวดหมู่ (อังกฤษ) *"
        placeholder="เช่น Electronics"
        {...register("nameEn", {
          required: "กรุณากรอกชื่อหมวดหมู่ (อังกฤษ)",
        })}
        error={errors.nameEn?.message ? String(errors.nameEn.message) : ""}
        disabled={isLoading}
      />

      {/* Status toggle */}
      <div className="pt-2">
        <Toggle
          checked={isActive}
          onChange={setIsActive}
          disabled={isLoading}
          label="เปิดใช้งาน"
        />
      </div>

      {/* Submit and Cancel buttons */}
      <div className="flex gap-3 pt-4 border-t border-blue-200">
        <Button type="submit" disabled={isLoading} className="flex-1">
          {isLoading ? "กำลังบันทึก..." : "บันทึก"}
        </Button>
      </div>
    </form>
  );
}
