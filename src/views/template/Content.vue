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
      <v-btn icon color="white" v-bind="props">
        <v-icon class="white--text">mdi-account</v-icon>
      </v-btn>
      <v-btn icon color="white" @click="logout()">
        <v-icon class="white--text">mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- サイドバー -->
    <v-navigation-drawer v-model="navDrawn" app temporary>
      <v-list-item class="my-3">
        <v-list-item-title class="text-h6"
          >シンプルメモアプリ</v-list-item-title
        >
        <v-list-item-subtitle> ただのサンプルアプリです</v-list-item-subtitle>
      </v-list-item>
      <v-divider></v-divider>

      <v-list nav dense>
        <v-list-item
          v-for="(menu, i) in menus"
          :key="i"
          link
          @click="closeMenu()"
          :to="menu.to"
          :prepend-icon="menu.icon"
          color="primary"
        >
          <v-list-item-title>{{ menu.text }}</v-list-item-title>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <v-list>
          <v-list-item>
            <v-switch
              @click="toggleTheme"
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
import { useTheme } from "vuetify";
export default {
  setup() {
    const theme = useTheme();

    return {
      theme,
      toggleTheme: () => {
        theme.global.name.value =
          theme.global.name.value === "myCustomLightTheme"
            ? "myCustomDarkTheme"
            : "myCustomLightTheme";
      },
    };
  },
  data: () => ({
    userName: null,
    pageName: null,
    navDrawn: false,
    currentPageTitle: null,
    favoriteTotal: null,
    todoDonePercentage: null,
    menus: [
      { icon: "mdi-collage", text: "メモ", to: "/memos" },
      {
        icon: "mdi-archive",
        text: "アーカイブ",
        to: "/archives",
      },
    ],
  }),
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
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/auth/logout`,
          {
            method: "POST",
            cache: "no-cache",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
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
        console.log(JSON.stringify(error));
      }
    },
  },
};
</script>
<style scoped></style>
