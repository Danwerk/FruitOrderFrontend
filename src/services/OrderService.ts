import { BaseService } from "./BaseService";
import type { IOrder } from "@/domain/IOrder";

export class OrderService extends BaseService<IOrder> {
    constructor() {
        super("orders");
    }
}
