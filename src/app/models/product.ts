import { GameConsole } from './gameconsole';
import { ProductType } from './producttype';
import { Company } from './company';
import { RatingUrl } from './ratingurl';
import { ProductRating } from './productrating';

export class Product {
    code?: number;
    name: string;
    description: string;
    year: number;
    gameConsole: GameConsole;
    productType: ProductType;
    company: Company;
    product: any;
    productRatings: [ProductRating];
    version?: number;
  }