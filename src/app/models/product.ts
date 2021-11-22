import { GameConsole } from './gameconsole';
import { ProductType } from './producttype';
import { Company } from './company';
import { ProductRating } from './productrating';

export class Product {
    code?: number;
    name: string;
    description: string;
    year: number;
    productStatus: number;
    price: number;
    gameConsole: GameConsole;
    productType: ProductType;
    company: Company;
    product: any;
    productRatings: [ProductRating];
    imageHTML: string;
    version?: number;
  }