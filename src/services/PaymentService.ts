import { BaseService } from "./BaseService";
import type { IPayment } from "@/domain/IPayment";

export class PaymentService extends BaseService<IPayment> {
    constructor() {
        super("payments");
    }
}
