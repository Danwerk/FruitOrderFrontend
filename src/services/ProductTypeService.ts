import type { IProductType } from "@/domain/IProductType";
import { BaseService } from "./BaseService";

export class ProductTypeService extends BaseService<IProductType> {

    constructor() {
        super("productTypes");
    }
}