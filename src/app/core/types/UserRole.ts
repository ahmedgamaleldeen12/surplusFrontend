export type UserRole = 'User' | 'BusinessManager' | 'Admin';
export interface Product {
  image: string;
  brand: string;
  sku: string;
  title: string;
  specs: string;
  price: number;
}