<template>
    <div>
        <v-app>
            <TheAppBar v-if="hasAppBar"></TheAppBar>
            <v-main>
                <router-view />
            </v-main>
            <AppBottomNavigation :showInMobile="true" />
            <TheSnackbar/>
            <TheLoading/>
        </v-app>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import TheAppBar from '@/components/core/TheAppBar.vue'
    import AppBottomNavigation from "@/components/core/AppBottomNavigation.vue"
    import TheSnackbar from "@/components/core/TheSnackbar.vue"
    import TheLoading from "@/components/core/TheLoading.vue"

    export default Vue.extend({
        name: 'home_layout',
        components: {
            TheAppBar,
            AppBottomNavigation,
            TheSnackbar,
            TheLoading
        },
        data: () => ({
            hasAppBar: true
        })
    })

</script>

<style scoped>
</style>