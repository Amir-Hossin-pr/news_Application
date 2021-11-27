<template>
    <v-navigation-drawer v-model="drawer" fixed temporary>
        <v-list nav dense>
            <v-list-item-group v-model="group"
                               active-class="deep-purple--text text--accent-4">
                <v-list-item to="/account" v-if="user.isAuthenticated">
                    <v-col align="center">
                        <v-list-item-avatar size="100" color="grey">
                            <v-img :src="user.profile.image" :lazy-src="user.profile.image" />
                        </v-list-item-avatar>
                    </v-col>
                </v-list-item>

                <v-list-item v-for="item in items" :key="item.id" :to="item.to">
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
            </v-list-item-group>
        </v-list>

        <template v-slot:append v-if="user.isAuthenticated">
            <div class="pa-2">
                <v-btn block color="error" @click="logOut"> Logout </v-btn>
            </div>
        </template>
    </v-navigation-drawer>
</template>


<script>
    import Vue from 'vue'
    import { navigationItemsIr } from "@/consts";
    import AccountServices from "@/services/AccountServices";
    import AccountApiCall from "@/api/apiList/Account";

    export default Vue.extend({
        data: () => ({
            drawer: false,
            group: null,
            items: navigationItemsIr,
            user: {
                isAuthenticated: false,
                profile: {},
            },
            AccountApi: new AccountApiCall()
        }),
        created() {
            this.$root.$refs.navigationDrawer = this;
            this.getUser();
        },
        methods: {
            open() {
                this.drawer = true;
            },
            getUser() {
                let currentUserAuthenticated = AccountServices.isAuthenticated();
                if (currentUserAuthenticated) {
                    this.AccountApi.getProfile()
                        .then((res) => {
                            if (res.status) {
                                this.user.isAuthenticated = true;
                                this.user.profile = res.profile;
                            }
                        });
                }
            },
            logOut() {
                this.AccountApi.logout().then(() => {
                    window.location.reload();
                });
            },
        },
    })
</script>