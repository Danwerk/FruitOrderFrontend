import type { ICart } from "@/domain/ICart";
import { BaseService } from "./BaseService";
import httpClient from "./http-client";

import { useIdentityStore } from "@/stores/identity";
import type { AxiosError } from "axios";
import { IdentityService } from "./IdentityService";
import type { IServiceResult } from "../domain/IServiceResult";

export class CartService extends BaseService<ICart> {

    constructor() {
        super("carts");
    }



    async deleteCartProducts(cartId: string): Promise<IServiceResult<void>> {
        let response;
        try {
            response = await httpClient.delete(`/carts/${cartId}/cartproducts`, {
                headers: {
                    "Authorization": "Bearer " + this.identityStore.$state.jwt?.jwtToken
                }
            });
        } catch (e) {
            let res = {
                status: (e as AxiosError).response!.status,
                /* errorMsg: (e as AxiosError).response!.data.error, */
            };
            return res;
        }
        return { status: response.status };
    }
}