<template>
    <v-app>
        <div class="account-container">
            <router-view />
        </div>
        <AppBottomNavigation :showInMobile="true" />
        <TheSnackbar></TheSnackbar>
        <TheLoading></TheLoading>
    </v-app>
</template>

<script>
    import Vue from 'vue'

    import TheLoading from "@/components/core/TheLoading.vue";
    import TheSnackbar from "@/components/core/TheSnackbar.vue";
    import AppBottomNavigation from "@/components/core/AppBottomNavigation.vue"

    export default Vue.extend({
        components: {
            TheLoading,
            TheSnackbar,
            AppBottomNavigation
        },
    })
</script>


<style>
    @import "../assets/style/account.css";
</style>