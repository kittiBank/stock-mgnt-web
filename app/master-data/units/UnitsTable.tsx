import { Trash2, Edit2 } from "lucide-react";
import Badge from "@/app/components/Badge";
import { Unit } from "./mockData";

interface UnitsTableProps {
  units: Unit[];
  onEdit: (unit: Unit) => void;
  onDelete: (unit: Unit) => void;
}

// Table component displaying units list with edit and delete actions
export default function UnitsTable({
  units,
  onEdit,
  onDelete,
}: UnitsTableProps) {
  return (
    <div className="bg-white rounded-lg border border-blue-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* Table header */}
          <thead>
            <tr className="bg-blue-50 border-b border-blue-200">
              <th className="px-6 py-4 text-left text-sm font-semibold text-blue-950 truncate">
                รหัสหน่วย
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-blue-950 truncate">
                ชื่อหน่วย (ไทย)
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-blue-950 truncate">
                ชื่อหน่วย (อังกฤษ)
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-blue-950 truncate">
                สถานะ
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-blue-950 truncate">
                วันที่สร้าง
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-blue-950">
                จัดการ
              </th>
            </tr>
          </thead>

          {/* Table body */}
          <tbody>
            {units.length > 0 ? (
              units.map((unit) => (
                <tr
                  key={unit.id}
                  className="border-b border-blue-100 hover:bg-blue-50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm font-medium text-blue-950 truncate">
                    {unit.code}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 truncate">
                    {unit.name_th}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 truncate">
                    {unit.name_en}
                  </td>
                  <td className="px-6 py-4 text-sm truncate">
                    <Badge variant={unit.is_active ? "success" : "danger"}>
                      {unit.is_active ? "เปิดใช้งาน" : "ปิดใช้งาน"}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 truncate">
                    {new Date(unit.created_at).toLocaleDateString("th-TH")}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => onEdit(unit)}
                        className="text-blue-600 hover:text-blue-800 transition-colors p-2"
                        title="แก้ไข"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => onDelete(unit)}
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
                  <p className="text-gray-500">ไม่พบรายการที่ตรงกับการค้นหา</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
