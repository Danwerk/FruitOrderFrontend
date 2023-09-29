import type { IJWTResponse } from "@/domain/IJWTResponse";
import { defineStore } from "pinia";
import jwt_decode from 'jwt-decode';
export const useIdentityStore = defineStore({
    id: "identity",
    state: () => ({
        /* jwt: localStorage.getItem("IJWTResponse")
        ? JSON.parse(localStorage.getItem("IJWTResponse")!)
        : null, */

        jwt: null as IJWTResponse | null,

    }),
    getters: {
        getRoles(): string | [string] {
            let identityStore = useIdentityStore();
            if (identityStore.jwt == null)
                return "";

            let result = jwt_decode(identityStore.$state.jwt!.jwtToken)

            if (result != undefined)
                return (result as { [name: string]: string | [string] })['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']

            return "";
        },

        isAdmin(): boolean | undefined {
            if (this.jwt === null) {
                return false;
            }
            var res = false;
            var roles = this.getRoles

            if(roles === undefined){
                return false;
            }
        
            if (typeof roles === 'string') {
                if (roles === 'admin') {
                    res = true;
                }

            } else {
                roles.forEach((role: string) => {
                    if (role === 'admin') {
                        res = true;
                    }
                });
            }
            return res;
        },

        isAuthorized(): boolean | undefined {
            if(this.jwt !== null && this.jwt !== undefined) {
                return true
            }
            return false;
        },

    },
    actions: {

    },
});
