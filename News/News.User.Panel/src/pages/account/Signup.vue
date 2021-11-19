<template>
  <div class="account-form-container">
    <div class="account-form-image">
      <img src="@/assets/images/register.png" alt="" />
    </div>

    <div class="account-form-body">
      <div class="account-form-title">
        <h3>{{ title }}</h3>
        <v-card-subtitle>ساخت حساب کاربری</v-card-subtitle>
      </div>

      <v-form ref="signupForm">
        <v-text-field
          v-model="userName"
          outlined
          label="نام کاربری"
          placeholder="نام کاربری"
          clearable
          :rules="[rules.required]"
        ></v-text-field>
        <v-text-field
          v-model="phoneNumber"
          outlined
          label="شماره موبایل"
          placeholder="شماره موبایل"
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

        <!-- <v-text-field
          outlined
          label="کد معرف"
          placeholder="کد معرف"
          clearable
          v-model="reagentCode"
        ></v-text-field> -->

        <v-btn block color="primary" @click="signup"> ثبت نام </v-btn>
        <br />

        <v-row>
          <v-col cols="12" sm="6">
            <v-btn block color="info" to="/account/login"> ورود </v-btn>
          </v-col>
          <v-col cols="12" sm="6">
            <v-btn block color="info" to="/account/activation">
              فعال سازی حساب
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </div>
  </div>
</template>

<script>
import AccountApi from "@/api/apiList/Account";
import { appTitle, rules, messages } from "@/consts";

export default {
  middleware:'auth.client',
  layout: "account",
  head: {
    title: "ثبت نام",
  },
  data: () => ({
    rules: rules,
    title: appTitle,
    show: false,
    userName: "",
    password: "",
    phoneNumber: "",
  }),
  methods: {
    signup() {
      let isValid = this.$refs.signupForm.validate();
      if (isValid) {
        this.$root.$refs.loading.open();
        AccountApi.signup({
          userName: this.userName,
          password: this.password,
          confirmPassword: this.password,
          phoneNumber: this.phoneNumber,
          fullName: this.userName,
        })
          .then((res) => {
            if (res.status) {
              this.$router.push(
                `/account/activation?userName=${this.userName}`
              );
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

<style>
@import "../../assets/style/account.css";
</style>