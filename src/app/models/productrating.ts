import { RatingUrl } from './ratingurl';
import { Product } from './product';

export class ProductRating {
    code?: number;
    rating: number;
    ratingurl: RatingUrl;
    product: Product;
    version?: number;
  }