<template>
    <v-col>
        <v-row>
            <v-col cols="12" sm="9">
                <div>
                    <NewsList :news="news" />
                    <v-card-actions>
                        <v-btn text outlined color="primary">
                            show More
                        </v-btn>
                    </v-card-actions>
                </div>
            </v-col>
            <v-col cols="12" sm="3">
                <ListedNews :news="news" header="Popular News" />
                <br />
                <ListedNews :news="news" header="Most News" />
            </v-col>
        </v-row>
    </v-col>
</template>

<script lang="ts">
    import Vue from 'vue'

    import NewsList from "@/components/news/NewsList.vue"
    import NewsApi from '@/api/apiList/News';
    import ListedNews from "@/components/news/ListedNews.vue"
    import { messages } from '../../consts';

    export default Vue.extend({
        components: {
            NewsList,
            ListedNews
        },
        data: () => ({
            news: [],
            newsApi: new NewsApi()
        }),
        mounted() {
            this.getNews();
        },
        methods: {
            getNews() {
                this.$root.$refs.loading.open();
                this.newsApi.getNews(0, 5)
                    .then((res) => {
                        if (res.status)
                            res.list.forEach((item: never) => this.news.push(item))
                        this.showMessage(res.title)
                    })
                    .catch((e) => {
                        this.showMessage(messages.networkError)
                        console.log(e.message)
                    })
            },
            showMessage(text: string) {
                this.$root.$refs.snackbar.open(text);
                this.$root.$refs.loading.close();
            },
        }
    })
</script>
