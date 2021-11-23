<template>
    <div class="profile-container">
        <div class="profile-actions">
            <v-tooltip v-for="item in items" :key="item.id" bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn icon
                           color="primary"
                           :to="item.to"
                           v-bind="attrs"
                           v-on="on">
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-btn>
                </template>
                <span>{{ item.title }}</span>
            </v-tooltip>

            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn icon @click="logout" color="red" v-bind="attrs" v-on="on">
                        <v-icon>mdi-logout</v-icon>
                    </v-btn>
                </template>
                <span>Logout</span>
            </v-tooltip>
        </div>

        <div class="profile-body" v-if="profile != null">
            <v-col cols="12" align="center">
                <v-list-item-avatar size="200" color="grey">
                    <v-img :src="profile.image" :lazy-src="profile.image" />
                </v-list-item-avatar>
                <v-col cols="12" sm="6">
                    <v-file-input label="Profile photo"
                                  @change="changeProfileImage"
                                  truncate-length="15"></v-file-input>
                </v-col>
            </v-col>

            <v-col cols="12">
                <v-row>
                    <v-col cols="12" sm="6">
                        <v-text-field outlined
                                      label="Full name"
                                      clearable
                                      v-model="profile.fullName" />
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field outlined
                                      label="User Name"
                                      clearable
                                      v-model="profile.userName" />
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field outlined
                                      label="Mobile No"
                                      v-model="profile.mobileNo"
                                      readonly />
                    </v-col>

                    <v-col cols="12" sm="6">
                        <v-text-field outlined
                                      clearable
                                      label="Email"
                                      v-model="profile.email" />
                    </v-col>


                </v-row>
            </v-col>
            <v-col cols="12">
                <v-row>
                    <v-col cols="12">
                        <v-btn color="primary" block @click="submitChanges">
                            Sumbit changes
                        </v-btn>
                    </v-col>
                </v-row>
            </v-col>
        </div>
    </div>
</template>

<script>
    import AccountApiCall from "@/api/apiList/Account";
    import { messages, enums, navigationItemsIr } from "@/consts";
    import Vue from "vue"

    export default Vue.extend({
        mounted() {
            this.getProfile();
        },
        data: () => ({
            profile: {},
            userType: enums.UserType,
            items: navigationItemsIr,
            AccountApi: new AccountApiCall()
        }),
        methods: {
            getProfile() {
                this.$root.$refs.loading.open();

                this.AccountApi.getProfile()
                    .then((res) => {
                        if (res.status) {
                            this.profile = res.profile;
                        }
                        this.showMessage(res.title);
                    })
                    .catch(() => {
                        this.showMessage(messages.networkError);
                    });
            },
            changeProfileImage(e) {
                if (e != null) {
                    let fileReader = new FileReader();
                    fileReader.readAsDataURL(e);
                    fileReader.onload = () => {
                        let base65 = fileReader.result;
                        this.profile.image = base65;
                    };
                } else this.profile.image = "";
            },
            submitChanges() {
                this.$root.$refs.loading.open();
                this.AccountApi.updateProfile({
                    email: this.profile.email,
                    fullName: this.profile.fullName,
                    image: this.profile.image,
                    mobileNo: this.profile.mobileNo,
                    userName: this.profile.userName
                })
                    .then((res) => {
                        if (res.status) {
                            this.profile = res.result;
                        }
                        this.showMessage(res.title);
                    })
                    .catch(() => {
                        this.showMessage(messages.networkError);
                    });
            },
            logout() {
                this.AccountApi.logout().then(() => {
                    window.location.reload();
                });
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