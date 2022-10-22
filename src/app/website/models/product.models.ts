import { Category } from './category.models';

export interface Product {
  id: 'string';
  slug: 'string';
  name: 'string';
  description: 'string';
  active: 'string';
  likes_count: 'string';
  likes_up_count: 'string';
  likes_down_count: 'string';
  published_at: 'string';
  master?: Master;
  category?: Category;
  image?: ProductImage;
}

export interface Master {
  id: 'string';
  sku: 'string';
  price: 'string';
  promotional_price: 'string';
  stock: 'string';
  weight: 'string';
  height: 'string';
  width: 'string';
  depth: 'string';
  is_master: 'string';
  position: 'string';
}

export interface ProductImage {
  id: number;
  url: 'string';
}
