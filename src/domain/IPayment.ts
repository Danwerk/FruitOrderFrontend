import type { IOrder } from "./IOrder";

export interface IPayment {
    id?: string;
    name: string;
    cardNo: string;
    expiryDate: string;
    cvvNo: string;
    address: string;
    paymentMode: string;
    orders?: IOrder[]
}
