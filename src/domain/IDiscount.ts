export interface IDiscount {
    id?: string;
    discountValue: number;
    from: string;
    to: string;
    description?: string
    productId: string;
}