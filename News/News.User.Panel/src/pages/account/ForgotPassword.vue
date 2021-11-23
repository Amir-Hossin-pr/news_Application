<template>
  <div class="account-form-container">
    <div class="account-form-image">
      <img src="@/assets/images/forgot-password.png" alt="" />
    </div>

    <div class="account-form-body">
      <div class="account-form-title">
        <h3>{{ title }}</h3>
        <v-card-subtitle>Forgot password</v-card-subtitle>
      </div>

      <v-form ref="forgotPasswordForm">
        <v-text-field
          v-model="userName"
          outlined
          label="User Name"
          placeholder="User Name"
          clearable
          :rules="[rules.required]"
        ></v-text-field>

        <div v-if="codeSent">
          <v-text-field
            v-model="recoveryCode"
            outlined
            label="Recovery code"
            placeholder="Recovery code"
            clearable
            :rules="[rules.required]"
          ></v-text-field>

          <v-text-field
            outlined
            label="New password"
            placeholder="New password"
            clearable
            v-model="password"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show ? 'text' : 'password'"
            :rules="[rules.required]"
            @click:append="show = !show"
          ></v-text-field>

          <v-text-field
            outlined
            label="Repet the new password"
            placeholder="Repet the new password"
            clearable
            v-model="confirmPassword"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show ? 'text' : 'password'"
            :rules="[rules.required]"
            @click:append="show = !show"
          ></v-text-field>
        </div>

        <v-btn block color="primary" @click="getCode" v-if="!codeSent">
         Receive code
        </v-btn>
        <v-btn block color="primary" @click="changePassword" v-if="codeSent">
          Change new password
        </v-btn>
        <br />

        <v-row>
          <v-col cols="12" sm="6">
            <v-btn block color="info" to="/account/login"> Login </v-btn>
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