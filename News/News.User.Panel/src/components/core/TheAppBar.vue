<template>
  <div>
    <v-app-bar color="deep-purple" dark>
      <v-app-bar-nav-icon @click="drawer"></v-app-bar-nav-icon>
      <v-btn @click="back" icon v-if="backward">
        <v-icon>mdi-backburger</v-icon>
      </v-btn>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon :to="{name:'ShopCart'}">
      <v-icon>mdi-shopping-outline</v-icon>
      </v-btn>
    </v-app-bar>

    <TheNavigation />
  </div>
</template>

<script>
import TheNavigation from "./TheNavigation";
export default {
  components: { TheNavigation },
  data: () => ({
    title: "",
    backward: false,
  }),
  created() {   
    this.setData();
  },
  watch:{
    $route(){
      this.setData();
    }
  },
  methods: {
    drawer() {
      this.$root.$refs.navigationDrawer.open();
    },
    setData() {
      let meta = this.$route.meta(this.$route);
      this.title = meta.title;
      this.backward = meta.hasBackButton;
    },
    back() {
      this.$router.back();
    },
  },
};
</script>