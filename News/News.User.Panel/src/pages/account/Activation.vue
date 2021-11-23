<template>
    <div class="account-form-container">
        <div class="account-form-image">
            <img src="@/assets/images/not-authorized.png" alt="" />
        </div>

        <div class="account-form-body">
            <div class="account-form-title">
                <h3>{{ title }}</h3>
                <v-card-subtitle>فعال سازی حساب کاربری</v-card-subtitle>
            </div>

            <v-form ref="activationForm">
                <v-text-field v-model="userName"
                              outlined
                              label="User Name"
                              placeholder="User Name"
                              clearable
                              :rules="[rules.required]"></v-text-field>

                <v-text-field v-model="activeCode"
                              outlined
                              label="کد فعال سازی"
                              placeholder="کد فعال سازی"
                              clearable
                              :rules="[rules.required]"></v-text-field>

                <v-btn block color="primary" @click="activeAccount"> فعال سازی </v-btn>
                <br />

                <v-row>
                    <v-col cols="12" sm="6">
                        <v-btn block color="info" @click="getNewCode">
                            دریافت کد جدید
                        </v-btn>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-btn block color="info" to="/account/login"> Login </v-btn>
                    </v-col>
                </v-row>
            </v-form>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import { appTitle, rules, messages } from "@/consts";
    import AccountApi from "@/api/apiList/Account";

    export default Vue.extend({
        data: () => ({
            userName: "",
            activeCode: "",
            rules: rules,
            title: appTitle,
        }),
        created() {
            this.userName = this.$route.query.userName.toString() ?? "";
        },
        methods: {
            activeAccount() {
                let isValid = this.$refs.activationForm.validate();
                if (isValid) {
                    this.$root.$refs.loading.open();
                    AccountApi.activeAccount({
                        userName: this.userName,
                        activeCode: this.activeCode,
                    })
                        .then((res) => {
                            if (res.status) {
                                this.$router.push(`/account/login?userName=${this.userName}`);
                            }
                            this.showMessage(res.title);
                        })
                        .catch(() => {
                            this.showMessage(messages.networkError);
                        });
                } else this.showMessage(messages.formInvalid);
            },
            getNewCode() {
                this.$root.$refs.loading.open();
                if (this.userName.trim() !== "") {
                    AccountApi.getNewCode(this.userName)
                        .then((res) => {
                            this.showMessage(res.title);
                        })
                        .catch(() => {
                            this.showMessage(messages.networkError);
                        });
                } else this.showMessage(messages.canNotNull("User Name"));
            },
            showMessage(text: string) {
                this.$root.$refs.snackbar.open(text)
                this.$root.$refs.loading.close();
            },
        },
    })
</script>

<style>
    @import "../../assets/style/account.css";
</style>