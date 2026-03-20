"use client";

import { useForm } from "react-hook-form";
import Input from "@/app/components/ui/Input";
import Select from "@/app/components/ui/Select";
import Button from "@/app/components/ui/Button";
import { Store, storeTypes } from "./mockData";

interface StoresFormProps {
  store?: Store;
  onSubmit: (data: Partial<Store>) => void;
  isLoading?: boolean;
}

// Form component for creating and editing stores with shadcn UI components
export default function StoresForm({
  store,
  onSubmit,
  isLoading = false,
}: StoresFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      code: store?.code || "",
      nameTh: store?.nameTh || "",
      nameEn: store?.nameEn || "",
      type: store?.type || "WAREHOUSE",
      address: store?.address || "",
      isActive: store?.isActive ?? true,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Code field */}
      <Input
        label="รหัสคลัง *"
        placeholder="เช่น WH001"
        {...register("code", {
          required: "กรุณากรอกรหัสคลัง",
          minLength: { value: 2, message: "รหัสต้องยาวอย่างน้อย 2 ตัวอักษร" },
        })}
        error={errors.code?.message ? String(errors.code.message) : ""}
        disabled={isLoading || !!store}
      />

      {/* Name Thai field */}
      <Input
        label="ชื่อคลัง (ไทย) *"
        placeholder="เช่น คลังสินค้าหลัก"
        {...register("nameTh", {
          required: "กรุณากรอกชื่อคลัง (ไทย)",
        })}
        error={errors.nameTh?.message ? String(errors.nameTh.message) : ""}
        disabled={isLoading}
      />

      {/* Name English field */}
      <Input
        label="ชื่อคลัง (อังกฤษ) *"
        placeholder="เช่น Main Warehouse"
        {...register("nameEn", {
          required: "กรุณากรอกชื่อคลัง (อังกฤษ)",
        })}
        error={errors.nameEn?.message ? String(errors.nameEn.message) : ""}
        disabled={isLoading}
      />

      {/* Type field - Select component */}
      <Select
        label="ประเภทคลัง *"
        {...register("type", {
          required: "กรุณาเลือกประเภทคลัง",
        })}
        error={errors.type?.message ? String(errors.type.message) : ""}
        disabled={isLoading}
      >
        {storeTypes.map((type) => (
          <option key={type.value} value={type.value}>
            {type.label}
          </option>
        ))}
      </Select>

      {/* Address field */}
      <div>
        <label className="block text-sm font-medium text-blue-950 mb-2">
          ที่อยู่
        </label>
        <textarea
          placeholder="เช่น 123 ถนนสุขุมวิท กรุงเทพฯ"
          {...register("address")}
          rows={3}
          disabled={isLoading}
          className={`
            w-full px-3 py-2 rounded-lg border border-blue-200 bg-white
            text-sm font-medium text-gray-900 placeholder:text-gray-600
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400
            hover:border-blue-300
            disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50
            resize-none transition-all duration-200 shadow-sm hover:shadow-md
          `}
        />
      </div>

      {/* Active status field */}
      <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <input
          type="checkbox"
          id="isActive"
          {...register("isActive")}
          disabled={isLoading}
          className="w-5 h-5 rounded border-blue-300 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
        />
        <label
          htmlFor="isActive"
          className="text-sm font-medium text-blue-950 cursor-pointer"
        >
          เปิดใช้งาน
        </label>
      </div>

      {/* Submit button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? "กำลังบันทึก..." : store ? "อัปเดต" : "สร้างใหม่"}
      </Button>
    </form>
  );
}
