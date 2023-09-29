import type { IDiscount } from "./IDiscount";
import type { IPrice } from "./IPrice";

export interface IProduct {
    id?: string;
    image: string;
    name: string;
    description: string;
    quantity: number;
    unitId: string;
    productTypeId: string;
    activeDiscount?: number;
    activePrice?: number;
    priceBeforeDiscounting?: number;
    /* prices: IPrice[];
    discounts: IDiscount[]; */
}