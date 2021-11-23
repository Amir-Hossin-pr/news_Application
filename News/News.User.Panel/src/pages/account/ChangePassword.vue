<template>
  <div class="account-form-container">
    <div class="account-form-image">
      <img src="@/assets/images/reset-password.png" alt="" />
    </div>

    <div class="account-form-body">
      <div class="account-form-title">
        <h3>{{ title }}</h3>
        <v-card-subtitle>Change password</v-card-subtitle>
      </div>

      <v-form ref="changePasswordForm">
        <v-text-field
          outlined
          label="Current Password"
          placeholder="Current Password"
          clearable
          v-model="changePassword.currentPassword"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show ? 'text' : 'password'"
          :rules="[rules.required]"
          @click:append="show = !show"
        ></v-text-field>

        <v-text-field
          outlined
          label="Password جدید"
          placeholder="Password جدید"
          clearable
          v-model="changePassword.newPassword"
          :append-icon="showNew ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showNew ? 'text' : 'password'"
          :rules="[rules.required]"
          @click:append="showNew = !showNew"
        ></v-text-field>

        <v-text-field
          outlined
          label="Repet the new password"
          placeholder="Repet the new password"
          clearable
          v-model="changePassword.confirmPassword"
          :append-icon="showNew ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showNew ? 'text' : 'password'"
          :rules="[rules.required]"
          @click:append="showNew = !showNew"
        ></v-text-field>

        <v-btn block color="primary" @click="submit"> تغییر Password </v-btn>
      </v-form>
    </div>
  </div>
</template>

<script>
import AccountApi from "@/api/apiList/Account";
import { appTitle, rules, messages } from "@/consts";

export default {
  data: () => ({
    changePassword: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    show: false,
    showNew: false,
    rules: rules,
    title: appTitle,
  }),
  methods: {
    submit() {
      let isValid = this.$refs.changePasswordForm.validate();
      if (isValid) {
        this.$root.$refs.loading.open();
        AccountApi.changePassword(this.changePassword)
          .then((res) => {
            if (res.status) {
              this.$router.push({
                name: "Profile",
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

<style>
@import "../../assets/style/account.css";
</style>