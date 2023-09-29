import type { IJWTResponse } from "@/domain/IJWTResponse";
import httpCLient from "../services/http-client";
import { useIdentityStore } from "@/stores/identity";
import type { AxiosError } from "axios";
import type { IServiceResult } from "@/domain/IServiceResult";
import jwt_decode from 'jwt-decode';
export class IdentityService {
    identityStore = useIdentityStore();


    async refreshIdentity(): Promise<IServiceResult<IJWTResponse>> {
        try {
            console.log(this.identityStore.$state.jwt);

            let response = await httpCLient.post("/identity/account/refreshtoken",
                {
                    jwt: this.identityStore.$state.jwt?.jwtToken,
                    refreshToken: this.identityStore.$state.jwt?.refreshToken
                }
            );
            return {
                status: response.status,
                data: response.data as IJWTResponse
            };

        } catch (e) {
            let response = {
                status: (e as AxiosError).response!.status,
                // errorMsg: (e as AxiosError).response!.data.error,
            }

            console.log(response);

            console.log((e as AxiosError).response);

            return response;
        }
    }


    async login(email: string, password: string): Promise<IServiceResult<IJWTResponse>> {
        try {
            let loginInfo = {
                email,
                password
            }
            let response = await httpCLient.post("/identity/account/login", loginInfo);
            
            return {
                status: response.status,
                data: response.data as IJWTResponse
            };

        } catch (e) {
            let response = {
                status: (e as AxiosError).response!.status,
                // errorMsg: (e as AxiosError).response!.data.error,
            }

            console.log(response);

            console.log((e as AxiosError).response);

            return response;
        }

    }


    async register(
        firstName: string, 
        lastName: string, 
        email: string, 
        password: string): Promise<IServiceResult<IJWTResponse>> {
        try {
            let registerInfo = {
                email: email,
                firstName: firstName,
                lastName: lastName,
                password: password
            }
            
            let response = await httpCLient.post("/identity/account/register", registerInfo);
            return {
                status: response.status,
                data: response.data as IJWTResponse
            };

        } catch (e) {
            let response = {
                status: (e as AxiosError).response!.status,
             //   errors: (e as AxiosError).response!.data.errors,
            }

            console.log(response);

            console.log((e as AxiosError).response);

            return response;
        }
    }


    async logout(): Promise<IServiceResult<Object>> {
        
        try {
            let logoutInfo = {
                refreshToken: this.identityStore.$state.jwt?.refreshToken
            }
            let response = await httpCLient.post("/identity/account/logout", logoutInfo,
                {
                    headers: {
                        "Authorization": "bearer " + this.identityStore.$state.jwt?.jwtToken
                    }
                });

            this.identityStore.$state.jwt = null;
            localStorage.removeItem("IJWTResponse");

            return {
                status: response.status
            };

        } catch (e) {
            let response = {
                status: (e as AxiosError).response!.status,
            //    errors: (e as AxiosError).response!.data.errors,
            }

            if (response.status == 401) {
                // TODO refresh identity first
                this.identityStore.$state.jwt = null;
                localStorage.removeItem("IJWTResponse");
            }

            console.log(response);

            console.log((e as AxiosError).response);

            return response;
        }
    }



    




}
