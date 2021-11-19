<template>
  <div class="profile-container">
    <div class="profile-actions">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            color="primary"
            :to="items[0].to"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>{{ items[0].icon }}</v-icon>
          </v-btn>
        </template>
        <span>{{ items[0].title }}</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon color="primary" v-bind="attrs" v-on="on">
            <v-icon>mdi-wallet</v-icon>
          </v-btn>
        </template>
        <span>کیف پول</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            :to="items[2].to"
            color="primary"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>{{ items[2].icon }}</v-icon>
          </v-btn>
        </template>
        <span>{{ items[2].title }}</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            :to="items[3].to"
            color="primary"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>{{ items[3].icon }}</v-icon>
          </v-btn>
        </template>
        <span>{{ items[3].title }}</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            :to="items[4].to"
            color="primary"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>{{ items[4].icon }}</v-icon>
          </v-btn>
        </template>
        <span>{{ items[4].title }}</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            to="/account/changePassword"
            color="primary"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-lock-open</v-icon>
          </v-btn>
        </template>
        <span>تغییر کلمه عبور</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon @click="logout" color="red" v-bind="attrs" v-on="on">
            <v-icon>mdi-logout</v-icon>
          </v-btn>
        </template>
        <span>خروج</span>
      </v-tooltip>
    </div>

    <div class="profile-body" v-if="profile != null">
      <v-col cols="12" align="center">
        <v-list-item-avatar size="200" color="grey">
          <v-img :src="profile.image" :lazy-src="profile.image" />
        </v-list-item-avatar>
        <v-col cols="12" sm="6">
          <v-file-input
            label="تصویر پروفایل"
            @change="changeProfileImage"
            truncate-length="15"
          ></v-file-input>
        </v-col>
      </v-col>

      <v-col cols="12">
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              outlined
              label="نام و نام خانوادگی"
              clearable
              v-model="profile.fullName"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              outlined
              label="نام کاربری"
              clearable
              v-model="profile.userName"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              outlined
              label="شماره تماس"
              v-model="profile.phoneNumber"
              readonly
            />
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              outlined
              clearable
              label="ایمیل"
              v-model="profile.email"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              outlined
              clearable
              label="کد ملی"
              v-model="profile.nationalCode"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              readonly
              outlined
              label="کد معرفی"
              v-model="profile.reagentCode"
            />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12">
        <v-row>
          <v-col cols="12" sm="6">
            <v-btn color="primary" block @click="submitChanges">
              ثبت تغییرات
            </v-btn>
          </v-col>
          <v-col cols="12" sm="6">
            <v-btn
              color="info"
              block
              to="/account/sellerRequest"
              v-if="profile.userType != userType.Seller"
            >
              ثبت فروشگاه
            </v-btn>
            <v-btn
              color="info"
              block
              v-if="profile.userType == userType.Seller"
              :to="{name:'UserStores'}"
            >
              مدیریت فروشگاه ها
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </div>
  </div>
</template>

<script>
import AccountApi from "@/api/apiList/Account";
import { messages, enums, navigationItemsIr } from "@/consts";

export default {
  mounted() {
    this.getProfile();
  },
  data: () => ({
    profile: null,
    userType: enums.UserType,
    items: navigationItemsIr,
  }),
  methods: {
    getProfile() {
      this.$root.$refs.loading.open();
      AccountApi.getProfile()
        .then((res) => {
          if (res.status) {
            this.profile = res.profile;
          }
          this.showMessage(res.title);
        })
        .catch(() => {
          this.showMessage(messages.networkError);
        });
    },
    changeProfileImage(e) {
      if (e != null) {
        let fileReader = new FileReader();
        fileReader.readAsDataURL(e);
        fileReader.onload = () => {
          let base65 = fileReader.result;
          this.profile.image = base65;
        };
      } else this.profile.image = "";
    },
    submitChanges() {
      this.$root.$refs.loading.open();
      AccountApi.updateProfile(this.profile)
        .then((res) => {
          if (res.status) {
            this.profile = res.profile;
          }
          this.showMessage(res.title);
        })
        .catch(() => {
          this.showMessage(messages.networkError);
        });
    },
    logout() {
      AccountApi.logout().then(() => {
        window.location.reload();
      });
    },
    showMessage(text) {
      this.$root.$refs.snackbar.open(text);
      this.$root.$refs.loading.close();
    },
  },
};
</script>

<style>
@import "../../assets/style/account.css";
</style>