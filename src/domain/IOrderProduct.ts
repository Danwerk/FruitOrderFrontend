export interface IOrderProduct {
    id?: string;
    quantity: number;
    price: number;
    total: number
    discount: number;
    productId?: string;
    orderId: string;
}