import { RouteComponentProps } from 'react-router-dom';

// MenuSlct.tsx, WishList.tsx, OrderSheet.tsx
interface RCProps {
  table: string;
}
export type ContainerProps = RouteComponentProps<RCProps>;

// MenuSlct.tsx
export interface MenuData {
  menu_name: string;
  menu_stock: number;
  menu_price: number;
}

// WishList.tsx
export interface WishData {
  menu_name: string;
  menu_price: number;
  wish_quantity: number;
}
