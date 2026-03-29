"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import Input from "@/app/components/ui/Input";
import Button from "@/app/components/ui/Button";
import Toggle from "@/app/components/ui/Toggle";
import { Unit } from "./mockData";

interface UnitsFormProps {
  unit?: Unit;
  onSubmit: (data: Partial<Unit>) => void;
  isLoading?: boolean;
}

// Form component for creating and editing units with shadcn UI components
export default function UnitsForm({
  unit,
  onSubmit,
  isLoading = false,
}: UnitsFormProps) {
  const [isActive, setIsActive] = useState(unit?.is_active ?? true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      code: unit?.code || "",
      name_th: unit?.name_th || "",
      name_en: unit?.name_en || "",
      is_active: unit?.is_active ?? true,
    },
  });

  // Handle form submit with is_active state
  const handleFormSubmit = (data: Partial<Unit>) => {
    onSubmit({
      ...data,
      is_active: isActive,
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
      {/* Code field */}
      <Input
        label="รหัสหน่วย *"
        placeholder="เช่น PCS"
        {...register("code", {
          required: "กรุณากรอกรหัสหน่วย",
          minLength: { value: 2, message: "รหัสต้องยาวอย่างน้อย 2 ตัวอักษร" },
        })}
        error={errors.code?.message ? String(errors.code.message) : ""}
        disabled={isLoading || !!unit}
      />

      {/* Name Thai field */}
      <Input
        label="ชื่อหน่วย (ไทย) *"
        placeholder="เช่น ชิ้น"
        {...register("name_th", {
          required: "กรุณากรอกชื่อหน่วย (ไทย)",
        })}
        error={errors.name_th?.message ? String(errors.name_th.message) : ""}
        disabled={isLoading}
      />

      {/* Name English field */}
      <Input
        label="ชื่อหน่วย (อังกฤษ) *"
        placeholder="เช่น Piece"
        {...register("name_en", {
          required: "กรุณากรอกชื่อหน่วย (อังกฤษ)",
        })}
        error={errors.name_en?.message ? String(errors.name_en.message) : ""}
        disabled={isLoading}
      />

      {/* Active status field with Toggle */}
      <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
        <Toggle
          checked={isActive}
          onChange={setIsActive}
          disabled={isLoading}
          label="เปิดใช้งาน"
        />
      </div>

      {/* Submit button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? "กำลังบันทึก..." : unit ? "อัปเดต" : "สร้างใหม่"}
      </Button>
    </form>
  );
}
