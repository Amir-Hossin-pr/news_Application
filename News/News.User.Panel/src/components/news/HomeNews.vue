<template>
    <v-col>
        <v-row>
            <v-col cols="12">
                <div>
                    <NewsList :news="news" />
                    <v-card-actions v-if="pageCount > 1">
                        <v-col align="center">
                            <div class="text-center">
                                <v-pagination v-model="page"
                                              :length="pageCount"
                                              :total-visible="5"
                                              @input="changePage"
                                              circle></v-pagination>
                            </div>
                        </v-col>
                    </v-card-actions>
                </div>
            </v-col>
            <!--<v-col cols="12" sm="3">
                <ListedNews :news="news" header="Popular News" />
                <br />
                <ListedNews :news="news" header="Most News" />
            </v-col>-->
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
            page: 1,
            pageCount: 0,
            newsApi: new NewsApi()
        }),
        mounted() {
            this.getNews(0);
        },
        methods: {
            getNews(page: number) {
                this.$root.$refs.loading.open();
                this.newsApi.getNews(page, 5)
                    .then((res) => {
                        if (res.status) {
                            this.news = []
                            res.list.forEach((item: never) => this.news.push(item))
                            this.pageCount = parseInt(res.pages) + 1
                        }
                        this.showMessage(res.title)
                    })
                    .catch((e) => {
                        this.showMessage(messages.networkError)
                        console.log(e.message)
                    })
            },
            changePage(page: number) {
                this.getNews(page - 1)
            },
            showMessage(text: string) {
                this.$root.$refs.snackbar.open(text);
                this.$root.$refs.loading.close();
            },
        }
    })
</script>
