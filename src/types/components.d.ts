// AppBar.tsx
export interface AppBarProps {
  name: string;
}

// NavBar.tsx
export interface NavBarProps {
  value: string;
  table_no: string;
  badge_wish?: number;
  badge_order?: number;
}

// MenuButton.tsx
export interface MenuButtonProps {
  onClick: () => void;
  name: string;
  stock: number;
  price: number;
}

// WishButton.tsx
export interface WishButtonProps {
  name: string;
  price: number;
  quantity: number;
  delete: () => void;
  plus: () => void;
  minus: () => void;
}

// OrderMenu.tsx
export interface OrderMenuProps {
  name: string;
  price: number;
  quantity: number;
}
