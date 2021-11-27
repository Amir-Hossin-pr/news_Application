<template>
    <div class="carousel-body">
        <div class="carousel-other">
            <div class="carousel-other-item">
                <carousel :items="1"
                          :dots="false"
                          :autoplay="true"
                          :loop="true"
                          :nav="false">
                    <div class="carousel-other-container" v-for="i in 15" :key="i">
                        <div class="carousel-item">
                            <img src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                                 alt="" />
                        </div>
                    </div>
                </carousel>
            </div>
            <div class="carousel-other-item">
                <carousel :items="1"
                          :dots="false"
                          :autoplay="true"
                          :loop="true"
                          :nav="false">
                    <div class="carousel-other-container" v-for="i in 15" :key="i">
                        <div class="carousel-item">
                            <img src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                                 alt="" />
                        </div>
                    </div>
                </carousel>
            </div>
        </div>
        <div class="carousel-main">
            <carousel :items="1"
                      :dots="false"
                      :autoplay="true"
                      :loop="true"
                      :nav="false">
                <div class="carousel-container" v-for="i in 15" :key="i">
                    <div class="carousel-item">
                        <img src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                             alt="" />
                    </div>
                </div>
            </carousel>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import carousel from "vue-owl-carousel";

    export default Vue.extend({
        components: {
            carousel,
        },
    });
</script>

<style>
    @import "../../assets/style/craousel.css";
</style>