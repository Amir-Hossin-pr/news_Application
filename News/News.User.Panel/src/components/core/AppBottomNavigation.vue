<template>
    <div class="overflow-hidden" v-if="show">
        <v-bottom-navigation :value="value"
                             color="primary"
                             grow
                             shift>
            <v-btn v-for="item in items" :key="item.id" :to="item.to">
                <span>{{item.title}}</span>

                <v-icon>{{item.icon}}</v-icon>
            </v-btn>


        </v-bottom-navigation>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import { bottomItems } from "@/consts/"

    export default Vue.extend({
        data: () => ({
            items: bottomItems,
            value: 0,
            show: false
        }),
        props: {
            showInMobile: Boolean
        },
        created() {
            this.setShow();
        },
        methods: {
            setShow() {
                if (!this.showInMobile)
                    this.show = true;
                else {
                    this.show = window.screen.width < 780;
                }
            }
        }
    })

</script>
