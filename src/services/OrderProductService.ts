import { BaseService } from "./BaseService";
import httpClient from "./http-client";
import type { IOrderProduct } from "@/domain/IOrderProduct";

export class OrderProductService extends BaseService<IOrderProduct> {
    constructor() {
        super("orderproducts");
    }
}