/**
 * WAREHOUSE DATABASE SYSTEM (PRIME STORE)
 * ระบบคลังสินค้าศูนย์กลาง และ Handshake Token Exchange
 */

// รหัสความปลอดภัย Handshake
const SYSTEM_KEYS = {
  CLIENT_REQ: "REQ_PRIME_STORE_2026",
  SERVER_RES: "RES_PRIME_OK_9999"
};

// หมวดหมู่เริ่มต้น (ใช้เมื่อไม่มีข้อมูลใน LocalStorage)
const DEFAULT_CATEGORIES = [
  "ทั้งหมด",
  "ไอดีเกม",
  "บัตรเติมเงิน",
  "บริการฟาร์ม",
  "สินค้าทั่วไป"
];

// รายการสินค้าเริ่มต้น
const DEFAULT_PRODUCTS = [
  {
    id: 101,
    name: "VIP Pass 30 วัน (ตัวอย่าง)",
    category: "สินค้าทั่วไป",
    type: "internal",
    priceOriginal: 300,
    pricePromo: 250,
    priceMax: 350,
    priceDiscount: 240,
    image: "Logo.png",
    link: "https://line.me",
    details: "สินค้าตัวอย่างระบบคลังสินค้า",
    additionalImages: []
  }
];

// --- 1. ระบบจัดการข้อมูลหมวดหมู่ (Categories) ---
function getWarehouseCategories(token) {
  if (token && token !== SYSTEM_KEYS.CLIENT_REQ) return [];
  const stored = localStorage.getItem('PRIME_WAREHOUSE_CATEGORIES');
  if (!stored) {
    localStorage.setItem('PRIME_WAREHOUSE_CATEGORIES', JSON.stringify(DEFAULT_CATEGORIES));
    return DEFAULT_CATEGORIES;
  }
  return JSON.parse(stored);
}

function saveWarehouseCategories(categoriesArray) {
  localStorage.setItem('PRIME_WAREHOUSE_CATEGORIES', JSON.stringify(categoriesArray));
  notifyDataSync();
}

// --- 2. ระบบจัดการข้อมูลสินค้า (Products) ---
function getWarehouseProducts(token) {
  if (token && token !== SYSTEM_KEYS.CLIENT_REQ) return [];
  const stored = localStorage.getItem('PRIME_WAREHOUSE_PRODUCTS');
  if (!stored) {
    localStorage.setItem('PRIME_WAREHOUSE_PRODUCTS', JSON.stringify(DEFAULT_PRODUCTS));
    return DEFAULT_PRODUCTS;
  }
  return JSON.parse(stored);
}

function saveWarehouseProducts(productsArray) {
  localStorage.setItem('PRIME_WAREHOUSE_PRODUCTS', JSON.stringify(productsArray));
  notifyDataSync();
}

// --- 3. ระบบส่งสัญญาณแจ้งอัปเดตหน้าร้านทันที ---
function notifyDataSync() {
  const event = new CustomEvent('warehouse_data_sync', {
    detail: { responseCode: SYSTEM_KEYS.SERVER_RES, timestamp: Date.now() }
  });
  window.dispatchEvent(event);
}
