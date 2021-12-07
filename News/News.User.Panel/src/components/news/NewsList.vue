<template>
    <div class="news-container">
        <v-row justify="center">
            <NewsItem v-for="item in news" :key="item.id" :newsItem="item" />
        </v-row>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'

    import NewsItem from "./NewsItem.vue"

    export default Vue.extend({
        components: {
            NewsItem
        },
        props: {
            news: Array
        },

    })

</script>

<style>
    @import "../../assets/style/news.css";
</style>