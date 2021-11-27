<template>
    <div>
        <v-app>
            <TheAppBar v-if="hasAppBar"></TheAppBar>
            <v-main>
                <router-view />
            </v-main>
            <AppBottomNavigation :showInMobile="true" />
        </v-app>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import TheAppBar from '@/components/core/TheAppBar.vue'
    import AppBottomNavigation from "@/components/core/AppBottomNavigation.vue"

    export default Vue.extend({
        name: 'home_layout',
        components: {
            TheAppBar,
            AppBottomNavigation
        },
        data: () => ({
            hasAppBar: true
        })
    })

</script>

<style scoped>
</style>