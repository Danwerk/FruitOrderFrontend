import { get } from "jquery";
import type { IOrderProduct } from "./IOrderProduct";

export interface IOrder {
    id?: string;
    orderNr: string;
    orderDate: string;
    status: string;
    paymentId: string | null;
    ordererName: string;
    ordererEmail: string;
    ordererAddress: string;
    ordererPhoneNumber: string;
    orderDeliveryTime: string;
    totalPriceWithoutVat: number;
    totalPriceIncludingVat?: number;
    deliveryPrice: number;
    total: number;
    appUserId?: string;
    orderProducts?: IOrderProduct[]

}