<template>
    <v-card class="mx-auto text-center"
            :color="cardColor"
            :dark="dark"
            :max-width="cardMaxWith">
        <v-card-text>
            <v-sheet :color="sheetColor">
                <v-sparkline :label-size="lableSize"
                             :auto-draw="autoDraw"
                             :value="value"
                             :labels="labels"
                             :color="sparkLineColor"
                             :height="sparkLineHeight"
                             padding="24"
                             stroke-linecap="round"
                             smooth>
                    <template v-slot:label="item">
                        {{ item.value }}
                    </template>
                </v-sparkline>
            </v-sheet>
        </v-card-text>

        <v-card-text>
            <div class="text-h4 font-weight-thin">{{ text }}</div>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions class="justify-center">
            <slot name="actions"></slot>
        </v-card-actions>
    </v-card>
</template>

<script>
    import Vue from 'vue'

    export default Vue.extend({
        props: {
            cardColor: {
                type: String,
                default: "Green",
            },
            cardMaxWith: {
                type: Number,
                default: 600,
            },
            sparkLineHeight: {
                type: Number,
                default: 100,
            },
            lableSize: {
                type: Number,
                default: 10,
            },
            dark: Boolean,
            sheetColor: String,
            sparkLineColor: String,
            smooth: Boolean,
            text: String,
            value: [],
            labels: [],
            autoDraw: Boolean,
        },
    });
</script>