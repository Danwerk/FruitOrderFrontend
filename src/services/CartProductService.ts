import type { ICartProduct } from "@/domain/ICartProduct";
import { BaseService } from "./BaseService";
import httpClient from "./http-client";

export class CartProductService extends BaseService<ICartProduct> {

    constructor() {
        super("cartproducts");
    }
}