import type { ICartProduct } from "./ICartProduct";

export interface ICart {
    id?: string;
    totalPrice: number;
    totalPriceIncludingVat?: number;
    appUserId?: string;
    cartProducts?: ICartProduct[]
}