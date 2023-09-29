import type { IUnit } from "@/domain/IUnit";
import { BaseService } from "./BaseService";

export class UnitService extends BaseService<IUnit> {

    constructor() {
        super("units");
    }
}