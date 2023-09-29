export interface ICartProduct {
    id?: string;
    quantity: number;
    price: number;
    total: number
    discount: number;
    productId?: string;
    cartId: string;
}