<template>
  <div class="account-form-container">
    <div class="account-form-image">
      <img src="@/assets/images/forgot-password.png" alt="" />
    </div>

    <div class="account-form-body">
      <div class="account-form-title">
        <h3>{{ title }}</h3>
        <v-card-subtitle>فراموشی کلمه عبور جدید</v-card-subtitle>
      </div>

      <v-form ref="forgotPasswordForm">
        <v-text-field
          v-model="userName"
          outlined
          label="نام کاربری"
          placeholder="نام کاربری"
          clearable
          :rules="[rules.required]"
        ></v-text-field>

        <div v-if="codeSent">
          <v-text-field
            v-model="recoveryCode"
            outlined
            label="کد بازیابی"
            placeholder="کد بازیابی"
            clearable
            :rules="[rules.required]"
          ></v-text-field>

          <v-text-field
            outlined
            label="کلمه عبور جدید"
            placeholder="کلمه عبور جدید"
            clearable
            v-model="password"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show ? 'text' : 'password'"
            :rules="[rules.required]"
            @click:append="show = !show"
          ></v-text-field>

          <v-text-field
            outlined
            label=" تکرار کلمه عبور جدید"
            placeholder="تکرار کلمه عبور جدید"
            clearable
            v-model="confirmPassword"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show ? 'text' : 'password'"
            :rules="[rules.required]"
            @click:append="show = !show"
          ></v-text-field>
        </div>

        <v-btn block color="primary" @click="getCode" v-if="!codeSent">
          دریافت کد
        </v-btn>
        <v-btn block color="primary" @click="changePassword" v-if="codeSent">
          تغییر کلمه عبور جدید
        </v-btn>
        <br />

        <v-row>
          <v-col cols="12" sm="6">
            <v-btn block color="info" to="/account/login"> ورود </v-btn>
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
    confirmPassword: "",
    recoveryCode: "",
    rules: rules,
    codeSent: false,
  }),
  created() {
    this.userName = this.$route.query.userName ?? "";
  },
  methods: {
    getCode() {
      let isValid = this.$refs.forgotPasswordForm.validate();
      if (isValid) {
        this.$root.$refs.loading.open();
        AccountApi.forgetPasswordCode({
          userName: this.userName,
        })
          .then((res) => {
            this.codeSent = res.status;
            this.showMessage(res.title);
          })
          .catch(() => {
            this.showMessage(messages.networkError);
          });
      } else this.showMessage(messages.formInvalid);
    },
    changePassword() {
      let isValid = this.$refs.forgotPasswordForm.validate();
      if (isValid) {
         this.$root.$refs.loading.open();
        AccountApi.forgetPasswordComplete({
          userName: this.userName,
          code: this.recoveryCode,
          newPassword: this.password,
          confirmPassword: this.confirmPassword,
        })
          .then((res) => {
            if (res.status) {
              this.$router.push({
                name: "Login",
                query: { userName: this.userName },
              });
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