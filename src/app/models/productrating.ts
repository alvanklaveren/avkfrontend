import { RatingUrl } from './ratingurl';
import { Product } from './product';

export class ProductRating {
    code?: number;
    rating: number;
    ratingUrl: RatingUrl;
    product: Product;
    version?: number;
  }