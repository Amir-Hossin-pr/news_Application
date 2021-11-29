<template>
    <div>
        <TheCarousel />
        <HomeNews />
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import TheCarousel from "@/components/core/TheCarousel.vue"
    import HomeNews from "@/components/news/HomeNews.vue"

    export default Vue.extend({
        data: () => ({

        }),
        components: {
            TheCarousel,
            HomeNews
        }
    })
</script>
