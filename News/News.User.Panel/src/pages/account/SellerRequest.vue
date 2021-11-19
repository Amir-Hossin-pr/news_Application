<template>
  <div class="seller-request-container">
    <div class="seller-request-form">
      <v-form ref="sellerRequestForm">
        <v-row>
          <v-col align="center" cols="12" v-if="store.storeProfileImage != ''">
            <v-list-item-avatar size="200" color="grey">
              <v-img
                :src="store.storeProfileImage"
                :lazy-src="store.storeProfileImage"
                width="250px"
                height="250px"
              ></v-img>
            </v-list-item-avatar>
          </v-col>
          <v-col cols="12">
            <v-file-input
              label="تصویر پروفایل فروشگاه"
              @change="setProfile"
            ></v-file-input>
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              v-model="store.storeName"
              :rules="[rules.required]"
              clearable
              outlined
              label="نام فروشگاه"
              placeholder="نام فروشگاه"
            />
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              v-model="store.storePhone"
              :rules="[rules.required]"
              clearable
              outlined
              label="تلفن فروشگاه"
              placeholder="تلفن فروشگاه"
            />
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              v-model="store.storeEmail"
              clearable
              outlined
              label="ایمیل فروشگاه"
              placeholder="ایمیل فروشگاه"
            />
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              v-model="store.storeTitle"
              :rules="[rules.required]"
              clearable
              outlined
              label="عنوان فروشگاه"
              placeholder="عنوان فروشگاه"
            />
          </v-col>

          <v-col cols="12">
            <v-autocomplete
              :items="guilds"
              :disabled="isUpdating"
              v-model="store.guilds"
              outlined
              auto-select-first
              chips
              clearable
              deletable-chips
              multiple
              label="اصناف فروشگاه"
              placeholder="اصناف فروشگاه"
              item-text="name"
              item-value="id"
            >
              <template v-slot:selection="data">
                <v-chip
                  v-bind="data.attrs"
                  :input-value="data.selected"
                  close
                  @click="data.select"
                  @click:close="remove(data.item)"
                >
                  <v-avatar left>
                    <v-img :src="data.item.iconAddress"></v-img>
                  </v-avatar>
                  {{ data.item.name }}
                </v-chip>
              </template>
              <template v-slot:item="data">
                <template v-if="typeof data.item !== 'object'">
                  <v-list-item-content v-text="data.item" />
                </template>
                <template v-else>
                  <v-list-item-avatar>
                    <img :src="data.item.iconAddress" />
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title
                      v-html="data.item.name"
                    ></v-list-item-title>
                    <v-list-item-subtitle
                      v-html="data.item.title"
                    ></v-list-item-subtitle>
                  </v-list-item-content>
                </template>
              </template>
            </v-autocomplete>
          </v-col>

          <v-col cols="12">
            <v-textarea
              outlined
              label="توضیخات فروشگاه"
              placeholder="توضیحات فروشگاه"
            ></v-textarea>
          </v-col>

          <v-col cols="12">
            <v-textarea
              :rules="[rules.required]"
              outlined
              label="آدرس فروشگاه"
              placeholder="آدرس فروشگاه"
            ></v-textarea>
          </v-col>

          <v-col cols="12" sm="6">
            <v-btn color="primary" elevation="5" block @click="sendRequest">
              ثبت درخواست
            </v-btn>
          </v-col>
          <v-col cols="12" sm="6">
            <v-btn to="/account" color="error" elevation="5" block>
              لغو درخواست
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </div>
  </div>
</template>


<script>
import storeApi from "@/api/apiList/Store";
import guildApi from "@/api/apiList/Guilds";
import { messages, rules } from "@/consts";

export default {
  data: () => ({
    store: {
      storeProfileImage: "",
    },
    guilds: [],
    autoUpdate: true,
    isUpdating: false,
    rules: rules,
  }),
  watch: {
    isUpdating(val) {
      if (val) {
        setTimeout(() => (this.isUpdating = false), 3000);
      }
    },
  },
  created() {
    this.getGuilds();
  },
  methods: {
    sendRequest() {
      let isValid = this.$refs.sellerRequestForm.validate();
      if (isValid) {
        storeApi
          .sellerRequest(this.store)
          .then((res) => {
            this.$refs.sellerRequestForm.reset();
            this.showMessage(res.title);
          })
          .catch(() => {
            this.showMessage(messages.networkError);
          });
      } else this.showMessage(messages.formInvalid);
    },
    setProfile(e) {
      if (e != null) {
        let reader = new FileReader();
        reader.readAsDataURL(e);
        reader.onload = () => {
          this.store.storeProfileImage = reader.result;
        };
      }
      this.store.storeProfileImage = "";
    },
    getGuilds() {
      guildApi
        .getGuilds(0, 0)
        .then((res) => {
          if (res.status) {
            res.guilds.forEach((guild) => this.guilds.push(guild));
          }
        })
        .catch(() => {
          this.showMessage(messages.networkError);
        });
    },
    remove(item) {
      const index = this.store.guilds.indexOf(item.id);
      if (index >= 0) this.store.guilds.splice(index, 1);
    },
    showMessage(message) {
      this.$root.$refs.snackbar.open(message);
    },
  },
};
</script>

<style>
@import "../../assets/style/account.css";
</style>