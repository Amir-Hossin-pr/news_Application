<template>
    <div>
        <v-col cols="12">
            <v-card elevation="3" outelined>
                <v-img :src="news.image"
                       :lazy-src="news.image"
                       class="white--text align-end"
                       gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                       max-height="500px">
                    <v-card-title v-text="news.title"></v-card-title>
                </v-img>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn icon @click="liked = !liked">
                        <v-icon>{{liked?'mdi-heart':'mdi-heart-outline'}}</v-icon>
                    </v-btn>

                    <v-btn icon @click="bookmarked = !bookmarked">
                        <v-icon>{{bookmarked?'mdi-bookmark':'mdi-bookmark-outline'}}</v-icon>
                    </v-btn>

                    <v-btn icon>
                        <v-icon>mdi-comment-outline</v-icon>
                    </v-btn>
                </v-card-actions>
            </v-card>
            <br />
            <v-card elevation="3" outelined>
                <v-card-subtitle>Short Description</v-card-subtitle>
                <v-card-title>{{news.shortDescription}}</v-card-title>
            </v-card>
            <br />
            <v-card elevation="3" outelined>
                <v-card-subtitle>News Text</v-card-subtitle>
                <v-card-text>
                    {{news.text}}
                </v-card-text>
            </v-card>
        </v-col>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import NewsApi from '@/api/apiList/News';
    import { messages } from '@/consts';

    export default Vue.extend({
        name: 'showNews',
        data: () => ({
            news: {},
            liked: false,
            bookmarked: false,
            newsApi: new NewsApi()
        }),
        mounted() {
            this.getNews();
        },
        methods: {
            getNews() {
                this.newsApi.getNewsItem(this.$route.query.id)
                    .then((res) => {
                        if (res.status)
                            this.news = res.result;
                        this.showMessage(res.title)
                    }).catch(() => {
                        this.showMessage(messages.networkError)
                    })
            },
            showMessage(text: string) {
                this.$root.$refs.snackbar.open(text);
                this.$root.$refs.loading.close();
            },
        }
    })
</script>
