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
          :value="todoDonePercentage"
          color="white"
        ></v-progress-circular>
      </v-btn>
      <v-btn color="white" icon v-show="pageName === 'メモ'">
        <v-icon class="white--text">mdi-heart</v-icon>
        <span class="white--text">{{ favoriteTotal }} </span>
      </v-btn>
      <v-btn icon color="white">
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
      <!-- TODO ここ1部をPiniaにしたいな -->
      <router-view
        v-on:favorite="setFavorite"
        v-on:todoDone="setDonePercentage"
        v-on:pageName="setPageName"
      />
    </v-main>
  </div>
</template>
<script setup>
import { useTheme } from "vuetify";
import { ref } from "vue";
import { logout as doLogout } from "../modules/auth.js";

// theme section
const theme = useTheme();
const toggleTheme = () => {
  theme.global.name.value =
    theme.global.name.value === "myCustomLightTheme"
      ? "myCustomDarkTheme"
      : "myCustomLightTheme";
};

// navigation section
const menus = ref([
  { icon: "mdi-collage", text: "メモ", to: "/memos" },
  { icon: "mdi-archive", text: "アーカイブ", to: "/archives" },
]);
const navDrawn = ref(false);
const closeMenu = () => {
  navDrawn.value = false;
};

// 画面上部の共通セクション
const favoriteTotal = ref(null);
// emitハンドリング
const setFavorite = (total) => {
  favoriteTotal.value = total;
};

const pageName = ref(null);
// emitハンドリング
const setPageName = (pageName) => {
  pageName.value = pageName;
};

const todoDonePercentage = ref(null);
// emitハンドリング
const setDonePercentage = (percentage) => {
  todoDonePercentage.value = percentage;
};

// TODO ユーザーのID渡さないと。
const logout = async () => {
  await doLogout();
};
</script>
<style scoped></style>
