import httpCLient from "../services/http-client";
import { useIdentityStore } from "@/stores/identity";
import type { AxiosError } from "axios";
import { IdentityService } from "./IdentityService";
import type { IServiceResult } from "../domain/IServiceResult";

export class BaseService<TEntity> {
    identityStore = useIdentityStore();
    constructor(private path: string) {
    }

    async getAll(): Promise<TEntity[]> {
        try {
            let response = await httpCLient.get(`/${this.path}`, {
                headers: {
                    "Authorization": "bearer " + this.identityStore.$state.jwt?.jwtToken
                }
            });

            let res = response.data as TEntity[];
            return res;
        } catch (e) {
            let response = (e as AxiosError).response!;
            if (response.status == 401 && this.identityStore.jwt) {

                let identityService = new IdentityService();
                let refreshResponse = await identityService.refreshIdentity();
                this.identityStore.$state.jwt = refreshResponse.data!;

                if (!this.identityStore.$state.jwt) return [];


                let response = await httpCLient.get(`/${this.path}`, {
                    headers: {
                        "Authorization": "bearer " + this.identityStore.$state.jwt?.jwtToken
                    }
                });
                console.log(response);

                let res = response.data as TEntity[];
                return res;

            }

        }


        return [];
    }

    async get(id: string): Promise<TEntity> {
        let response = await httpCLient.get(`/${this.path}/${id}`,
            {
                headers: {
                    "Authorization": "bearer " + this.identityStore.$state.jwt?.jwtToken
                }
            }
        );
        
        
        let res = response.data as TEntity;
        return await res;
    }


    async add(entity: TEntity): Promise<IServiceResult<TEntity>> {

        let response;
        try {
            response = await httpCLient.post(`/${this.path}`, entity,
                {
                    headers: {
                        "Authorization": "bearer " + this.identityStore.$state.jwt?.jwtToken
                    }
                }
            );
        } catch (e) {
            let res = {
                status: (e as AxiosError).response!.status,
                // errorMsg: (e as AxiosError).response!.data.error,
            }
            console.log(res);
            return res;
        }

        return { status: response.status, data: response.data };
    }

    async put(id: number | string | undefined, newEntity: TEntity): Promise<IServiceResult<TEntity | null>> {
        let response;
        try {
            response = await httpCLient.put(`/${this.path}/${id}`, newEntity,
                {
                    headers: {
                        "Authorization": "bearer " + this.identityStore.$state.jwt?.jwtToken
                    }
                }

            );
        } catch (e) {
            let res = {
                status: (e as AxiosError).response!.status,
            }
            console.log(res);
            return res;
        }

        return { status: response.status };
    }


    async delete(id: string): Promise<IServiceResult<void>> {
        let response;
        try {
            response = await httpCLient.delete(`/${this.path}/${id}`,
                {
                    headers: {
                        "Authorization": "bearer " + this.identityStore.$state.jwt?.jwtToken
                    }
                }
            );
            console.log(response);
        } catch (e) {
            let res = {
                status: (e as AxiosError).response!.status,
               // errorMsg: (e as AxiosError).response!.data.error,
            }
            console.log(res);
            return res;
        }
        return { status: response.status };
    }


}
