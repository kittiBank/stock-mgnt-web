"use client";

import { useForm } from "react-hook-form";
import { Store, storeTypes } from "./mockData";

interface StoresFormProps {
  store?: Store;
  onSubmit: (data: Partial<Store>) => void;
  isLoading?: boolean;
}

// Form component for creating and editing stores
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Code field */}
      <div>
        <label className="block text-sm font-medium text-blue-950 mb-1">
          รหัสคลัง *
        </label>
        <input
          type="text"
          placeholder="เช่น WH001"
          {...register("code", {
            required: "กรุณากรอกรหัสคลัง",
            minLength: { value: 2, message: "รหัสต้องยาวอย่างน้อย 2 ตัวอักษร" },
          })}
          className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50"
          disabled={isLoading || !!store}
        />
        {errors.code && (
          <p className="text-red-500 text-sm mt-1">
            {String(errors.code.message)}
          </p>
        )}
      </div>

      {/* Name Thai field */}
      <div>
        <label className="block text-sm font-medium text-blue-950 mb-1">
          ชื่อคลัง (ไทย) *
        </label>
        <input
          type="text"
          placeholder="เช่น คลังสินค้าหลัก"
          {...register("nameTh", {
            required: "กรุณากรอกชื่อคลัง (ไทย)",
          })}
          className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50"
          disabled={isLoading}
        />
        {errors.nameTh && (
          <p className="text-red-500 text-sm mt-1">
            {String(errors.nameTh.message)}
          </p>
        )}
      </div>

      {/* Name English field */}
      <div>
        <label className="block text-sm font-medium text-blue-950 mb-1">
          ชื่อคลัง (อังกฤษ) *
        </label>
        <input
          type="text"
          placeholder="เช่น Main Warehouse"
          {...register("nameEn", {
            required: "กรุณากรอกชื่อคลัง (อังกฤษ)",
          })}
          className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50"
          disabled={isLoading}
        />
        {errors.nameEn && (
          <p className="text-red-500 text-sm mt-1">
            {String(errors.nameEn.message)}
          </p>
        )}
      </div>

      {/* Type field */}
      <div>
        <label className="block text-sm font-medium text-blue-950 mb-1">
          ประเภทคลัง *
        </label>
        <select
          {...register("type", {
            required: "กรุณาเลือกประเภทคลัง",
          })}
          className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50"
          disabled={isLoading}
        >
          {storeTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
        {errors.type && (
          <p className="text-red-500 text-sm mt-1">
            {String(errors.type.message)}
          </p>
        )}
      </div>

      {/* Address field */}
      <div>
        <label className="block text-sm font-medium text-blue-950 mb-1">
          ที่อยู่
        </label>
        <textarea
          placeholder="เช่น 123 ถนนสุขุมวิท กรุงเทพฯ"
          {...register("address")}
          rows={3}
          className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50 resize-none"
          disabled={isLoading}
        />
      </div>

      {/* Active status field */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="isActive"
          {...register("isActive")}
          className="w-4 h-4 text-blue-600 border-blue-300 rounded focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        />
        <label htmlFor="isActive" className="text-sm font-medium text-blue-950">
          เปิดใช้งาน
        </label>
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition-colors"
      >
        {isLoading ? "กำลังบันทึก..." : store ? "อัปเดต" : "สร้างใหม่"}
      </button>
    </form>
  );
}
