<template>
    <v-col cols="12" md="4" sm="6">
        <v-card :to="{name:'showNews',query:{id:newsItem.id,title:newsItem.title}}" v-if="newsItem != null"
                 elevation="5"
                height="400">

            <v-img height="250"
                   :src="newsItem.image"
                   :lazy-src="newsItem.image"></v-img>

            <v-card-title>{{newsItem.title}}</v-card-title>

            <v-card-text>
                <v-row>
                    <div class="my-4 text-subtitle-1">
                        <v-icon>
                            mdi-heart
                        </v-icon>
                        50
                    </div>
                    <v-spacer />
                    <div class="my-4 text-subtitle-1">
                        <v-icon>
                            mdi-eye
                        </v-icon>
                        50
                    </div>
                </v-row>

                <div>{{newsItem.shortDescription}}</div>
            </v-card-text>
        </v-card>
    </v-col>
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
        props: {
            newsItem: {
                default: null,
                type: Object
            }
        }
    })
</script>
