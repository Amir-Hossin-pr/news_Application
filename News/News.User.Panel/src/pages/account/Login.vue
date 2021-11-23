<template>
    <div class="account-form-container">
        <div class="account-form-image">
            <img src="@/assets/images/login.png" alt="" />
        </div>

        <div class="account-form-body">
            <div class="account-form-title">
                <h3>{{ title }}</h3>
                <v-card-subtitle>Welcome</v-card-subtitle>
            </div>

            <v-form ref="loginForm">
                <v-text-field v-model="userName"
                              outlined
                              label="User Name"
                              placeholder="User Name"
                              clearable
                              :rules="[rules.required]"></v-text-field>
                <v-text-field outlined
                              label="Password"
                              placeholder="Password"
                              clearable
                              v-model="password"
                              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                              :type="show ? 'text' : 'password'"
                              :rules="[rules.required]"
                              @click:append="show = !show"></v-text-field>


                <v-btn block color="primary" @click="login"> Login </v-btn>
                <br />

                <v-row>
                    <v-col cols="12" sm="6">
                        <v-btn block color="info" to="/account/forgotPassword">
                            Forgot password
                        </v-btn>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-btn block color="info" to="/account/Signup"> Signup </v-btn>
                    </v-col>
                </v-row>
            </v-form>
        </div>
    </div>
</template>

<script>
    import { appTitle, rules, messages } from "@/consts";
    import AccountApiCall from "@/api/apiList/Account";
    import Vue from 'vue'

    export default Vue.extend({
        data: () => ({
            show: false,
            title: appTitle,
            userName: "",
            password: "",
            rules: rules,
            AccountApi: new AccountApiCall()
        }),
        created() {
            this.userName = this.$route.query.userName ?? "";
        },
        methods: {
            login() {
                let isValid = this.$refs.loginForm.validate();
                if (isValid) {
                    this.$root.$refs.loading.open();
                    this.AccountApi.login({
                        userName: this.userName,
                        password: this.password,
                    })
                        .then((res) => {
                            if (res.status) {
                                window.location = "/account/"
                            }
                            this.showMessage(res.title);
                        })
                        .catch(() => {
                            this.showMessage(messages.networkError);
                        });
                } else this.showMessage(messages.formInvalid);
            },
            showMessage(text) {
                this.$root.$refs.snackbar.open(text);
                this.$root.$refs.loading.close();
            },
        },
    });
</script>

<style>
    @import "../../assets/style/account.css";
</style>