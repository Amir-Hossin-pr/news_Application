<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="text-h5">
          {{ title }}
        </v-card-title>
        <v-card-text>{{ text }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="action(false)">
            {{ disagreeText }}
          </v-btn>
          <v-btn color="green darken-1" text @click="action(true)">
            {{ agreeText }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
  }),
  props: {
    title: String,
    text: String,
    agreeText: String,
    disagreeText: String,
  },
  created() {
    this.$root.$refs.confirmDialog = this;
  },
  methods: {
    open() {
      this.dialog = true;
    },
    close() {
      this.dialog = false;
    },
    action(agree) {
      this.close();
      this.$emit("action", {
        agree: agree,
      });
    },
  },
};
</script>