<template>
  <div class="account-form-container">
    <div class="account-form-image">
      <img src="@/assets/images/login.png" alt="" />
    </div>

    <div class="account-form-body">
      <div class="account-form-title">
        <h3>{{ title }}</h3>
        <v-card-subtitle>خوش آمدید</v-card-subtitle>
      </div>

      <v-form ref="loginForm">
        <v-text-field
          v-model="userName"
          outlined
          label="نام کاربری"
          placeholder="نام کاربری"
          clearable
          :rules="[rules.required]"
        ></v-text-field>
        <v-text-field
          outlined
          label="کلمه عبور"
          placeholder="کلمه عبور"
          clearable
          v-model="password"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show ? 'text' : 'password'"
          :rules="[rules.required]"
          @click:append="show = !show"
        ></v-text-field>

        <v-checkbox v-model="remember" label="من را به خاطر بسپار"></v-checkbox>

        <v-btn block color="primary" @click="login"> ورود </v-btn>
        <br />

        <v-row>
          <v-col cols="12" sm="6">
            <v-btn block color="info" to="/account/forgotPassword">
              فراموشی کلمه عبور
            </v-btn>
          </v-col>
          <v-col cols="12" sm="6">
            <v-btn block color="info" to="/account/Signup"> ثبت نام </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </div>
  </div>
</template>

<script>
import { appTitle, rules, messages } from "@/consts";
import AccountApi from "@/api/apiList/Account";

export default {
  data: () => ({
    show: false,
    title: appTitle,
    remember: false,
    userName: "",
    password: "",
    rules: rules,
  }),
  created() {
    this.userName = this.$route.query.userName ?? "";
  },
  methods: {
    login() {
      let isValid = this.$refs.loginForm.validate();
      if (isValid) {
        this.$root.$refs.loading.open();
        AccountApi.login({
          userName: this.userName,
          password: this.password,
          rememberMe: this.remember,
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
};
</script>

<style >
@import "../../assets/style/account.css";
</style>