<template>
    <div style="height: 50px;"></div>
    <section class="vh-100% gradient-custom">
        <div class="container py-5 h-100 ">
            <div class="row d-flex justify-content-center align-items-center h-100 " >
                <div class="col col-md-10">
                    <div class="card ">
                        <div class="card-body p-4 ">
                            <div class="col-md-2"></div>

                            <div class="row">
                                <div class="col-md-2"></div>
                                <div class="col-md-8 ">
                                    <h3 class="text-center">Register</h3>
                                    <hr />

                                    <div v-if="errors != null" class="text-danger validation-summary-errors"
                                        data-valmsg-summary="true">
                                        <ul v-for="error of errors">
                                            <li>{{ error }}</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <div class="form-group">
                                            <label class="control-label" for="firstName">First Name *</label>
                                            <input v-model="firstName" class="form-control" type="text" />
                                        </div>
                                        <div class="form-group">
                                            <label class="control-label" for="lastName">Last Name *</label>
                                            <input v-model="lastName" class="form-control" type="text" />
                                        </div>
                                        
                                        <div class="form-group">
                                            <label class="control-label" for="email">Email *</label>
                                            <input v-model="email" class="form-control" type="email" />
                                        </div>
                                        
                                        <div class="form-group">
                                            <label class="control-label" for="password">Password *</label>
                                            <input v-model="password" class="form-control" type="password" />
                                        </div>
                                        <div class="form-group">
                                            <label class="control-label" for="password">Confirm password *</label>
                                            <input v-model="passwordValidation" class="form-control" type="password" />
                                        </div>
                                        <br />
                                        <div class="form-group">
                                            <input @click="registerClicked()" type="submit" value="Register"
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
import router from "@/router";
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

export default class Register extends Vue {
    textInputOptions = {
        enterSubmit: true,
        tabSubmit: true,
        format: 'dd.MM.yyyy'
    };

    identityStore = useIdentityStore();

    firstName: string | null = null;
    lastName: string | null = null;
    email: string | null = null;
    password: string | null = null;
    passwordValidation: string | null = null;
    errors: [string] | null = null;

    identityService = new IdentityService();

    


    async registerClicked(): Promise<void> {
        this.errors = null;

        if (
            this.firstName == null || 
            this.lastName == null || 
            this.email == null || 
            this.password == null ||
            this.passwordValidation == null) {

            this.errors = ["Please fill all fields"];

        } else {

            if (this.password != this.passwordValidation) {
                this.errors = ["The password and confirmation password do not match."];
            } else {

                var res = await this.identityService.register(this.firstName, this.lastName, this.email, this.password);

                this.identityStore.$state.jwt = res.data!;
                localStorage.setItem("IJWTResponse", JSON.stringify(res.data!));

                if (res.status == 200) router.push('/')
            }
        }

    }

}
</script>


<style>
    .form-group {
    margin-bottom: 0.75rem;
    }
</style>
