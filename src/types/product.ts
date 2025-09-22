export interface Product {
  id: string;
  name: string;
  price: number;
  original_price?: number;
  category: string;
  description?: string;
  image_url?: string;
  is_popular: boolean;
  in_stock: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductInsert {
  name: string;
  price: number;
  original_price?: number;
  category: string;
  description?: string;
  image_url?: string;
  is_popular?: boolean;
  in_stock?: boolean;
}

export interface ProductUpdate {
  name?: string;
  price?: number;
  original_price?: number;
  category?: string;
  description?: string;
  image_url?: string;
  is_popular?: boolean;
  in_stock?: boolean;
}