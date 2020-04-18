import { GameConsole } from './gameconsole';
import { ProductType } from './producttype';
import { Company } from './company';

export class Product {
    code?: number;
    name: string;
    description: string;
    year: number;
    gameConsole: GameConsole;
    productType: ProductType;
    company: Company;
    version?: number;
  }