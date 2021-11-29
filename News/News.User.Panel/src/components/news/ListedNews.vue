<template>
    <v-col cols="12">
        <v-card elevation="5">
            <v-subheader v-text="header"></v-subheader>
            <v-list-item :to="{name:'showNews',query:{id:item.id,title:item.title}}" tile v-for="item in news" :key="item.id" tow-line>
                <v-col align="center">
                    <v-list-item-avatar size="80" color="grey">
                        <v-img :src="item.image" :lazy-src="item.image" />
                    </v-list-item-avatar>
                </v-col>
                <v-list-item-content>
                    <v-list-item-title>{{item.title}}</v-list-item-title>
                    <v-list-item-subtitle>
                        {{item.shortDescription}}
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-card>
    </v-col>
</template>

<script lang="ts">
    import Vue from 'vue'


    export default Vue.extend({
        props: {
            news: [],
            header: String
        }
    })
</script>
