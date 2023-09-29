<template>
    <div v-if="errors != null" class="text-danger validation-summary-errors error-block" data-valmsg-summary="true">
        <ul v-for="error of errors">
            <li>{{ error }}</li>
        </ul>
    </div>
    <div style="height: 50px;"></div>
    <section class="vh-100% gradient-custom">
        <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100 text-center">
                <div class="col col-md-10">
                    <div class="card">
                        <div class="card-body p-4">
                            <div class="col-md-2"></div>

                            <div class="row">
                                <div class="col-md-2"></div>
                                <div class="col-md-8">
                                    <h3>Login</h3>
                                    <hr />
<br>

                                    <div>
                                        <div class="form-group">
                                            <label class="control-label" for="email">Email</label>
                                            <input v-model="email" class="form-control" type="email" />
                                        </div>

                                        <div class="form-group">
                                            <label class="control-label" for="password">Password</label>
                                            <input v-model="password" class="form-control" type="password" />
                                        </div>
                                        <br />
                                        <div>
                                            <input @click="loginClicked()" type="submit" value="Login"
                                                class="btn btn-lg btn-primary" />
                                        </div>
                                    </div>
                                    <br />
                                </div>
                            </div>

                        </div>
                    </div>


                </div>

            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { IdentityService } from "@/services/IdentityService";
import { useIdentityStore } from "@/stores/identity";
import { Options, Vue } from "vue-class-component";
import { RouterLink } from "vue-router";

@Options({
    components: {
    },
    props: {},
    emits: [],
})
export default class Login extends Vue {
    identityStore = useIdentityStore();

    errors: [string] | null = null;
    email: string | null = null;
    password: string | null = null;
    errorMsg: string | null = null;


    identityService = new IdentityService();

    async loginClicked(): Promise<void> {
        console.log('loginClicked');

        if (this.email == null || this.password == null) {
            this.errors = ["Please fill all fields."];
        } else {
            var res = await this.identityService.login(this.email, this.password);
            this.identityStore.$state.jwt = res.data!;

            if (res.status === 400) {
                this.errors = ["Invalid email or password"]
            } else if (res.status === 404){
                this.errors = ["User/Password problem"]
            } 
            
            else {
                if (this.identityStore.isAdmin) {
                    this.$router.push("/dashboard")
                }
                else {
                    this.$router.push("/")
                }
            }
        }
        setTimeout(() => {
            this.errors = null;
        }, 4000);
    }

}
</script>
