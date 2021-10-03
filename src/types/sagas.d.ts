// menuMgnt.ts, menuSlct.ts, wishList.ts,
export interface MenuData {
  menu_name: string;
  menu_stock: number;
  menu_price: number;
}

// menuSlct.ts, wishList.ts, orderSheet.ts
export interface WishData {
  menu_name: string;
  menu_price: number;
  wish_quantity: number;
}

// orderSheet.ts
export interface OrderData {
  menu_name: string;
  menu_price: number;
  order_quantity: number;
}
