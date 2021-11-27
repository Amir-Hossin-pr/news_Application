<template>
    <div>
        <TheCarousel/>

    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import TheCarousel from "@/components/core/TheCarousel.vue"

    export default Vue.extend({
        data: () => ({

        }),
        components: {
            TheCarousel
        }
    })
</script>
