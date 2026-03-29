// Mock data for products with predefined categories, subcategories, units, and suppliers
export interface Product {
  id: string;
  code: string;
  nameTh: string;
  nameEn: string;
  categoryId: string;
  subCategoryId: string;
  unitId: string;
  supplierId: string;
  costPrice: number;
  salePrice: number;
  isActive: boolean;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
}

export interface Category {
  value: string;
  label: string;
}

export interface SubCategory {
  value: string;
  label: string;
}

export interface Unit {
  value: string;
  label: string;
}

export interface Supplier {
  value: string;
  label: string;
}

export const categories: Category[] = [
  { value: "cat-001", label: "อิเล็กทรอนิกส์" },
  { value: "cat-002", label: "เฟอร์นิเจอร์" },
  { value: "cat-003", label: "เสื้อผ้า" },
  { value: "cat-004", label: "อาหาร" },
];

export const subCategories: SubCategory[] = [
  { value: "sub-001", label: "โทรศัพท์" },
  { value: "sub-002", label: "แท็บเล็ต" },
  { value: "sub-003", label: "โซฟา" },
  { value: "sub-004", label: "เก้าอี้" },
  { value: "sub-005", label: "เสื้อผ้าชาย" },
  { value: "sub-006", label: "เสื้อผ้าหญิง" },
  { value: "sub-007", label: "นมสดใหม่" },
  { value: "sub-008", label: "น้ำหลวง" },
];

export const units: Unit[] = [
  { value: "unit-001", label: "ชิ้น (PCS)" },
  { value: "unit-002", label: "กล่อง (BOX)" },
  { value: "unit-003", label: "พัสดุ (BUNDLE)" },
  { value: "unit-004", label: "ลิตร (L)" },
];

export const suppliers: Supplier[] = [
  { value: "sup-001", label: "บริษัท ซัพพลาย จำกัด" },
  { value: "sup-002", label: "โรงงาน อุตสาหกรรม" },
  { value: "sup-003", label: "ผู้ส่งออก ทั่วโลก" },
  { value: "sup-004", label: "ลูกค้าโดยตรง" },
];

export const mockProducts: Product[] = [
  {
    id: "prod-001",
    code: "PROD001",
    nameTh: "โทรศัพท์สมาร์ท X1 Pro",
    nameEn: "Smartphone X1 Pro",
    categoryId: "cat-001",
    subCategoryId: "sub-001",
    unitId: "unit-001",
    supplierId: "sup-001",
    costPrice: 8500,
    salePrice: 12990,
    isActive: true,
    createdBy: "admin",
    createdAt: "2024-01-15T10:00:00Z",
    updatedBy: "admin",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "prod-002",
    code: "PROD002",
    nameTh: "แท็บเล็ต 10 นิ้ว",
    nameEn: "Tablet 10 inch",
    categoryId: "cat-001",
    subCategoryId: "sub-002",
    unitId: "unit-001",
    supplierId: "sup-002",
    costPrice: 6800,
    salePrice: 9990,
    isActive: true,
    createdBy: "admin",
    createdAt: "2024-01-15T10:00:00Z",
    updatedBy: "admin",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "prod-003",
    code: "PROD003",
    nameTh: "โซฟา 3 ที่นั่ง",
    nameEn: "Sofa 3 Seater",
    categoryId: "cat-002",
    subCategoryId: "sub-003",
    unitId: "unit-002",
    supplierId: "sup-003",
    costPrice: 15000,
    salePrice: 24990,
    isActive: true,
    createdBy: "admin",
    createdAt: "2024-01-15T10:00:00Z",
    updatedBy: "admin",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "prod-004",
    code: "PROD004",
    nameTh: "เก้าอี้ทำงานสีดำ",
    nameEn: "Black Office Chair",
    categoryId: "cat-002",
    subCategoryId: "sub-004",
    unitId: "unit-001",
    supplierId: "sup-001",
    costPrice: 2500,
    salePrice: 3990,
    isActive: false,
    createdBy: "admin",
    createdAt: "2024-01-15T10:00:00Z",
    updatedBy: "admin",
    updatedAt: "2024-02-01T10:00:00Z",
  },
  {
    id: "prod-005",
    code: "PROD005",
    nameTh: "เสื้อผ้าชายสีเทา",
    nameEn: "Gray Men's T-shirt",
    categoryId: "cat-003",
    subCategoryId: "sub-005",
    unitId: "unit-003",
    supplierId: "sup-004",
    costPrice: 150,
    salePrice: 299,
    isActive: true,
    createdBy: "admin",
    createdAt: "2024-01-15T10:00:00Z",
    updatedBy: "admin",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "prod-006",
    code: "PROD006",
    nameTh: "เสื้อผ้าหญิงชมพู",
    nameEn: "Pink Women's Dress",
    categoryId: "cat-003",
    subCategoryId: "sub-006",
    unitId: "unit-003",
    supplierId: "sup-002",
    costPrice: 280,
    salePrice: 599,
    isActive: true,
    createdBy: "admin",
    createdAt: "2024-01-15T10:00:00Z",
    updatedBy: "admin",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "prod-007",
    code: "PROD007",
    nameTh: "นมสดใหม่ 1 ลิตร",
    nameEn: "Fresh Milk 1L",
    categoryId: "cat-004",
    subCategoryId: "sub-007",
    unitId: "unit-004",
    supplierId: "sup-001",
    costPrice: 45,
    salePrice: 75,
    isActive: true,
    createdBy: "admin",
    createdAt: "2024-01-15T10:00:00Z",
    updatedBy: "admin",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "prod-008",
    code: "PROD008",
    nameTh: "น้ำแร่ 500 มล. (ซื้อมาก)",
    nameEn: "Mineral Water 500ml Pack",
    categoryId: "cat-004",
    subCategoryId: "sub-008",
    unitId: "unit-003",
    supplierId: "sup-003",
    costPrice: 8,
    salePrice: 15,
    isActive: true,
    createdBy: "admin",
    createdAt: "2024-01-15T10:00:00Z",
    updatedBy: "admin",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "prod-009",
    code: "PROD009",
    nameTh: "หูฟัง Wireless Pro",
    nameEn: "Wireless Pro Headphones",
    categoryId: "cat-001",
    subCategoryId: "sub-001",
    unitId: "unit-001",
    supplierId: "sup-001",
    costPrice: 1500,
    salePrice: 2990,
    isActive: true,
    createdBy: "admin",
    createdAt: "2024-01-15T10:00:00Z",
    updatedBy: "admin",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "prod-010",
    code: "PROD010",
    nameTh: "กระเป๋าโน้ตบุ๊ก 15 นิ้ว",
    nameEn: "Laptop Bag 15 inch",
    categoryId: "cat-002",
    subCategoryId: "sub-003",
    unitId: "unit-001",
    supplierId: "sup-002",
    costPrice: 450,
    salePrice: 899,
    isActive: true,
    createdBy: "admin",
    createdAt: "2024-01-15T10:00:00Z",
    updatedBy: "admin",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "prod-011",
    code: "PROD011",
    nameTh: "กล่อง USB-C Hub",
    nameEn: "USB-C Hub Box",
    categoryId: "cat-001",
    subCategoryId: "sub-002",
    unitId: "unit-002",
    supplierId: "sup-003",
    costPrice: 350,
    salePrice: 599,
    isActive: true,
    createdBy: "admin",
    createdAt: "2024-01-15T10:00:00Z",
    updatedBy: "admin",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "prod-012",
    code: "PROD012",
    nameTh: "ท้าวทองสีเหลือง",
    nameEn: "Yellow Metal Stand",
    categoryId: "cat-002",
    subCategoryId: "sub-004",
    unitId: "unit-001",
    supplierId: "sup-004",
    costPrice: 800,
    salePrice: 1490,
    isActive: false,
    createdBy: "admin",
    createdAt: "2024-01-15T10:00:00Z",
    updatedBy: "admin",
    updatedAt: "2024-02-01T10:00:00Z",
  },
];
