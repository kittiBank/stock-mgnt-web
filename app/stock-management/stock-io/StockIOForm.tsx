"use client";

import { useEffect, useRef, useReducer } from "react";
import { X } from "lucide-react";
import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";
import Select from "@/app/components/ui/Select";
import {
  mockProductsList,
  stores,
  movementTypes,
  StockMovement,
} from "./mockData";

interface StockIOFormProps {
  movement?: StockMovement;
  onSubmit: (data: Partial<StockMovement>) => void;
  onClose: () => void;
  isOpen: boolean;
}

// Initial form state
const initialFormState = {
  productId: "",
  storeId: "",
  movementType: "IN" as const,
  quantity: 0,
  remark: "",
};

// Form state reducer
type FormAction =
  | { type: "RESET"; payload?: StockMovement }
  | { type: "SET_FIELD"; field: string; value: unknown }
  | { type: "SET_ERRORS"; errors: Record<string, string> }
  | { type: "CLEAR_ERRORS" };

const formReducer = (
  state: Partial<StockMovement>,
  action: FormAction,
): Partial<StockMovement> => {
  switch (action.type) {
    case "RESET":
      return action.payload || initialFormState;
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    default:
      return state;
  }
};

const errorsReducer = (
  state: Record<string, string>,
  action: FormAction,
): Record<string, string> => {
  switch (action.type) {
    case "SET_ERRORS":
      return action.errors;
    case "CLEAR_ERRORS":
      return {};
    case "RESET":
      return {};
    default:
      return state;
  }
};

// Form component for creating and editing stock movements
export default function StockIOForm({
  movement,
  onSubmit,
  onClose,
  isOpen,
}: StockIOFormProps) {
  const [formData, dispatchForm] = useReducer(formReducer, initialFormState);
  const [errors, dispatchErrors] = useReducer(errorsReducer, {});
  const prevMovementIdRef = useRef<string | undefined>(undefined);

  // Reset form when movement changes
  useEffect(() => {
    if (movement?.id !== prevMovementIdRef.current) {
      prevMovementIdRef.current = movement?.id;
      dispatchForm({ type: "RESET", payload: movement });
      dispatchErrors({ type: "CLEAR_ERRORS" });
    }
  }, [movement]);

  // Handle form field changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;

    if (name === "quantity") {
      dispatchForm({
        type: "SET_FIELD",
        field: name,
        value: parseInt(value, 10) || 0,
      });
    } else {
      dispatchForm({ type: "SET_FIELD", field: name, value });
    }

    // Clear error on field change
    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      dispatchErrors({ type: "SET_ERRORS", errors: newErrors });
    }
  };

  // Validate form data
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.productId?.trim()) {
      newErrors.productId = "กรุณาเลือกสินค้า";
    }
    if (!formData.storeId?.trim()) {
      newErrors.storeId = "กรุณาเลือกสาขา";
    }
    if (!formData.movementType) {
      newErrors.movementType = "กรุณาเลือกประเภท";
    }
    if (!formData.quantity || formData.quantity <= 0) {
      newErrors.quantity = "กรุณากรอกจำนวนที่มากกว่า 0";
    }

    dispatchErrors({ type: "SET_ERRORS", errors: newErrors });
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-blue-200 sticky top-0 bg-white">
          <h2 className="text-lg font-semibold text-blue-950">
            {movement ? "แก้ไขการเคลื่อนไหวสินค้า" : "เพิ่มการเคลื่อนไหวสินค้า"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Product Select */}
          <div>
            <label className="block text-sm font-medium text-blue-950 mb-1">
              สินค้า <span className="text-red-500">*</span>
            </label>
            <Select
              value={formData.productId || ""}
              onChange={handleChange}
              name="productId"
              className={errors.productId ? "border-red-500" : ""}
            >
              <option value="">-- เลือกสินค้า --</option>
              {mockProductsList.map((product) => (
                <option key={product.value} value={product.value}>
                  {product.label}
                </option>
              ))}
            </Select>
            {errors.productId && (
              <p className="text-red-500 text-xs mt-1">{errors.productId}</p>
            )}
          </div>

          {/* Store Select */}
          <div>
            <label className="block text-sm font-medium text-blue-950 mb-1">
              สาขา <span className="text-red-500">*</span>
            </label>
            <Select
              value={formData.storeId || ""}
              onChange={handleChange}
              name="storeId"
              className={errors.storeId ? "border-red-500" : ""}
            >
              <option value="">-- เลือกสาขา --</option>
              {stores.map((store) => (
                <option key={store.value} value={store.value}>
                  {store.label}
                </option>
              ))}
            </Select>
            {errors.storeId && (
              <p className="text-red-500 text-xs mt-1">{errors.storeId}</p>
            )}
          </div>

          {/* Movement Type Select */}
          <div>
            <label className="block text-sm font-medium text-blue-950 mb-1">
              ประเภทการเคลื่อนไหว <span className="text-red-500">*</span>
            </label>
            <Select
              value={formData.movementType || "IN"}
              onChange={handleChange}
              name="movementType"
              className={errors.movementType ? "border-red-500" : ""}
            >
              {movementTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </Select>
            {errors.movementType && (
              <p className="text-red-500 text-xs mt-1">{errors.movementType}</p>
            )}
          </div>

          {/* Quantity Input */}
          <div>
            <label className="block text-sm font-medium text-blue-950 mb-1">
              จำนวน <span className="text-red-500">*</span>
            </label>
            <Input
              type="number"
              name="quantity"
              value={formData.quantity || ""}
              onChange={handleChange}
              placeholder="0"
              min="1"
              className={errors.quantity ? "border-red-500" : ""}
            />
            {errors.quantity && (
              <p className="text-red-500 text-xs mt-1">{errors.quantity}</p>
            )}
          </div>

          {/* Remark Textarea */}
          <div>
            <label className="block text-sm font-medium text-blue-950 mb-1">
              หมายเหตุ
            </label>
            <textarea
              name="remark"
              value={formData.remark || ""}
              onChange={handleChange}
              placeholder="กรุณากรอกหมายเหตุ (ไม่บังคับ)"
              rows={3}
              className="w-full px-3 py-2 border border-blue-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4 border-t border-blue-200">
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={onClose}
              className="flex-1"
            >
              ยกเลิก
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              className="flex-1"
            >
              {movement ? "บันทึกการเปลี่ยนแปลง" : "เพิ่มรายการ"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
