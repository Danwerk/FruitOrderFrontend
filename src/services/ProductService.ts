import type { IProduct } from "@/domain/IProduct";
import { BaseService } from "./BaseService";

export class ProductService extends BaseService<IProduct> {

    constructor() {
        super("products");
    }
}