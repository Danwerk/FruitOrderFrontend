import type { IDiscount } from "@/domain/IDiscount";
import { BaseService } from "./BaseService";

export class DiscountService extends BaseService<IDiscount> {

    constructor() {
        super("discounts");
    }
}