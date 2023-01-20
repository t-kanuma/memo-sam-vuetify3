<template>
  <div>
    <!--  ヘッダー -->
    <v-app-bar color="primary" app>
      <v-app-bar-nav-icon
        color="white"
        @click.stop="navDrawn = !navDrawn"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="white--text">{{ pageName }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="success" icon v-show="pageName === 'メモ'">
        <v-progress-circular
          :value="this.todoDonePercentage"
          color="white"
        ></v-progress-circular>
      </v-btn>
      <v-btn color="white" icon v-show="pageName === 'メモ'">
        <v-icon class="white--text">mdi-heart</v-icon>
        <span class="white--text">{{ favoriteTotal }} </span>
      </v-btn>
      <v-menu transition="slide-y-transition" bottom offset-y min-width="12rem">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon color="white" v-bind="attrs" v-on="on">
            <v-icon class="white--text">mdi-account</v-icon>
          </v-btn>
        </template>
        <v-card>
          <div class="d-flex justify-start align-center py-2 px-2">
            <v-avatar color="secondary"
              ><span class="white--text">{{ userInitial }} </span></v-avatar
            >
            <span class="ml-3">{{ userName }}</span>
          </div>
        </v-card>
      </v-menu>
      <v-btn icon color="white" @click="logout()">
        <v-icon class="white--text">mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- サイドバー -->
    <v-navigation-drawer v-model="navDrawn" app temporary>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6"
            >シンプルメモアプリ</v-list-item-title
          >
          <v-list-item-subtitle> ただのサンプルアプリです</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>

      <v-list nav dense>
        <v-list-item
          v-for="(menu, i) in menus"
          :key="i"
          link
          @click="closeMenu()"
          :to="menu.to"
        >
          <v-list-item-icon>
            <v-icon color="primary">{{ menu.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ menu.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <v-list>
          <v-list-item>
            <v-switch
              v-model="$vuetify.theme.dark"
              inset
              label="ダークモード"
            ></v-switch>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>

    <!-- メインエリア -->
    <v-main>
      <router-view
        v-on:favorite="setFavorite"
        v-on:todoDone="setDonePercentage"
        v-on:pageName="setPageName"
      />
    </v-main>
  </div>
</template>
<script>
import { Auth } from "aws-amplify";
export default {
  data() {
    return {
      userName: null,
      pageName: null,
      navDrawn: false,
      currentPageTitle: null,
      favoriteTotal: null,
      todoDonePercentage: null,
      menus: [
        { icon: "mdi-collage", text: "メモ", to: "/" },
        {
          icon: "mdi-archive",
          text: "アーカイブ",
          to: "/archived",
        },
      ],
    };
  },
  created() {},
  computed: {
    userInitial() {
      return null;
    },
  },
  methods: {
    closeMenu() {
      this.navDrawn = false;
    },
    setFavorite(total) {
      this.favoriteTotal = total;
    },
    setDonePercentage(percentage) {
      this.todoDonePercentage = percentage;
    },
    setPageName(pageName) {
      this.pageName = pageName;
    },
    async logout() {
      const NODE_ENV = process.env.NODE_ENV;
      if (NODE_ENV === "local") {
        try {
          const response = await fetch(
            `${process.env.VUE_APP_API_BASE_URL}/auth/logout`,
            {
              cache: "no-cache",
              method: "POST",
              credentials: "include",
              headers: {
                "X-CSRF-TOKEN": this.$cookies.get("csrf_access_token"),
              },
            }
          );

          const status = response.status;
          if (status === 200) {
            this.$router.push("/login");
          } else {
            throw new Error(`logout resulted in ${status}`);
          }
        } catch (error) {
          console.log(error);
        }
      } else if (NODE_ENV === "amplify") {
        try {
          await Auth.signOut();
          this.$router.push("/login");
        } catch (error) {
          console.log("error signing out: ", error);
        }
      } else {
        // noop
      }
    },
  },
};
</script>
<style scoped></style>
