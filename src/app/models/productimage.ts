import { Product } from './product';

export class ProductImage {
    code?: number;
    image: Blob;
    sortorder: number;
    product: Product;
    version?: number;
  }