<template>
    <div>
        <div align="center">
            <v-col cols="12" sm="8" align="center">
                <v-text-field lable="Search"
                              placeholder="Search"
                              clearable
                              outlined
                              rounded
                              v-model="search"
                              append-icon="mdi-magnify"
                              @click:append="submit" />
            </v-col>
        </div>
        <div class="search_items">
            <NewsList :news="news" />
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import NewsApi from '@/api/apiList/News'
    import { messages } from '@/consts';
    import NewsList from "@/components/news/NewsList.vue"

    export default Vue.extend({
        name: 'search',
        data: () => ({
            search: "",
            news: [],
            newsApi: new NewsApi()
        }),
        components: {
            NewsList
        },
        methods: {
            submit() {
                if (this.search.trim() != "") {
                    this.$root.$refs.loading.open();
                    this.newsApi.search(this.search.trim(), 0, 15)
                        .then((res) => {
                            if (res.status) {
                                this.news = []
                                res.list.forEach((item: never) => this.news.push(item))
                            }
                            this.showMessage(res.title);
                        }).catch(() => {
                            this.showMessage(messages.networkError)
                        })
                } else
                    this.showMessage("Search value can not be null")
            },
            showMessage(text: string) {
                this.$root.$refs.snackbar.open(text);
                this.$root.$refs.loading.close();
            },
        }
    })

</script>

