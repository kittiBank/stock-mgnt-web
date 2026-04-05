// Mock data for stock movements
export interface StockMovement {
  id: string;
  productId: string;
  storeId: string;
  movementType: "IN" | "OUT";
  quantity: number;
  remark?: string;
  status: "confirm" | "pending" | "cancel";
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
  productName: string;
  storeName: string;
}

export interface FilterOption {
  value: string;
  label: string;
}

export interface Product {
  value: string;
  label: string;
}

// Mock products for dropdown
export const mockProductsList: Product[] = [
  { value: "prod-001", label: "สินค้า A" },
  { value: "prod-002", label: "สินค้า B" },
  { value: "prod-003", label: "สินค้า C" },
  { value: "prod-004", label: "สินค้า D" },
  { value: "prod-005", label: "สินค้า E" },
];

// Mock stock movements
export const mockProducts: StockMovement[] = [
  {
    id: "mov-001",
    productId: "prod-001",
    storeId: "store-001",
    movementType: "IN",
    quantity: 100,
    remark: "ซื้อจากผู้จัดจำหน่าย A",
    status: "confirm",
    createdBy: "admin",
    createdAt: "2024-01-15T10:30:00Z",
    updatedBy: "admin",
    updatedAt: "2024-01-15T10:30:00Z",
    productName: "สินค้า A",
    storeName: "สาขาหลัก",
  },
  {
    id: "mov-002",
    productId: "prod-002",
    storeId: "store-001",
    movementType: "OUT",
    quantity: 50,
    remark: "ขายให้ลูกค้า",
    status: "pending",
    createdBy: "staff",
    createdAt: "2024-01-16T14:20:00Z",
    updatedBy: "staff",
    updatedAt: "2024-01-16T14:20:00Z",
    productName: "สินค้า B",
    storeName: "สาขาหลัก",
  },
  {
    id: "mov-003",
    productId: "prod-001",
    storeId: "store-002",
    movementType: "IN",
    quantity: 30,
    remark: "ซื้อจากผู้จัดจำหน่าย C",
    status: "confirm",
    createdBy: "admin",
    createdAt: "2024-01-17T09:15:00Z",
    updatedBy: "admin",
    updatedAt: "2024-01-17T09:15:00Z",
    productName: "สินค้า A",
    storeName: "สาขาลำดับที่ 2",
  },
  {
    id: "mov-004",
    productId: "prod-003",
    storeId: "store-001",
    movementType: "OUT",
    quantity: 5,
    remark: "ขายให้ลูกค้า",
    status: "cancel",
    createdBy: "admin",
    createdAt: "2024-01-18T11:45:00Z",
    updatedBy: "admin",
    updatedAt: "2024-01-18T11:45:00Z",
    productName: "สินค้า C",
    storeName: "สาขาหลัก",
  },
  {
    id: "mov-005",
    productId: "prod-002",
    storeId: "store-002",
    movementType: "IN",
    quantity: 200,
    remark: "ซื้อจากผู้จัดจำหน่าย B",
    status: "confirm",
    createdBy: "staff",
    createdAt: "2024-01-19T08:00:00Z",
    updatedBy: "staff",
    updatedAt: "2024-01-19T08:00:00Z",
    productName: "สินค้า B",
    storeName: "สาขาลำดับที่ 2",
  },
  {
    id: "mov-006",
    productId: "prod-004",
    storeId: "store-001",
    movementType: "OUT",
    quantity: 75,
    remark: "ขายให้ลูกค้า VIP",
    status: "pending",
    createdBy: "staff",
    createdAt: "2024-01-20T15:30:00Z",
    updatedBy: "staff",
    updatedAt: "2024-01-20T15:30:00Z",
    productName: "สินค้า D",
    storeName: "สาขาหลัก",
  },
  {
    id: "mov-007",
    productId: "prod-005",
    storeId: "store-002",
    movementType: "IN",
    quantity: 10,
    remark: "ซื้อจากผู้จัดจำหน่าย C",
    status: "confirm",
    createdBy: "admin",
    createdAt: "2024-01-21T13:20:00Z",
    updatedBy: "admin",
    updatedAt: "2024-01-21T13:20:00Z",
    productName: "สินค้า E",
    storeName: "สาขาลำดับที่ 2",
  },
  {
    id: "mov-008",
    productId: "prod-001",
    storeId: "store-001",
    movementType: "OUT",
    quantity: 25,
    remark: "ขายส่ง",
    status: "confirm",
    createdBy: "staff",
    createdAt: "2024-01-22T10:00:00Z",
    updatedBy: "staff",
    updatedAt: "2024-01-22T10:00:00Z",
    productName: "สินค้า A",
    storeName: "สาขาหลัก",
  },
  {
    id: "mov-009",
    productId: "prod-003",
    storeId: "store-002",
    movementType: "OUT",
    quantity: 40,
    remark: "ขายให้ลูกค้า",
    status: "pending",
    createdBy: "admin",
    createdAt: "2024-01-23T16:45:00Z",
    updatedBy: "admin",
    updatedAt: "2024-01-23T16:45:00Z",
    productName: "สินค้า C",
    storeName: "สาขาลำดับที่ 2",
  },
  {
    id: "mov-010",
    productId: "prod-002",
    storeId: "store-001",
    movementType: "IN",
    quantity: 150,
    remark: "ซื้อเพิ่มเติมจากผู้จัดจำหน่าย",
    status: "confirm",
    createdBy: "admin",
    createdAt: "2024-01-24T09:30:00Z",
    updatedBy: "admin",
    updatedAt: "2024-01-24T09:30:00Z",
    productName: "สินค้า B",
    storeName: "สาขาหลัก",
  },
];

export const movementTypes: FilterOption[] = [
  { value: "IN", label: "เข้าสินค้า" },
  { value: "OUT", label: "ออกสินค้า" },
];

export const stores: FilterOption[] = [
  { value: "store-001", label: "สาขาหลัก" },
  { value: "store-002", label: "สาขาลำดับที่ 2" },
];

// Helper functions
export const getProductName = (productId: string): string => {
  return mockProductsList.find((p) => p.value === productId)?.label || productId;
};

export const getStoreName = (storeId: string): string => {
  return stores.find((s) => s.value === storeId)?.label || storeId;
};

// Get status badge variant
export const getStatusVariant = (
  status: "confirm" | "pending" | "cancel",
): "default" | "success" | "danger" | "warning" | "info" => {
  switch (status) {
    case "confirm":
      return "success";
    case "pending":
      return "warning";
    case "cancel":
      return "danger";
    default:
      return "default";
  }
};

// Get status label
export const getStatusLabel = (
  status: "confirm" | "pending" | "cancel",
): string => {
  switch (status) {
    case "confirm":
      return "ยืนยันแล้ว";
    case "pending":
      return "รอดำเนินการ";
    case "cancel":
      return "ยกเลิก";
    default:
      return status;
  }
};
