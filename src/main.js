import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css";

const myCustomLightTheme = {
  dark: false,
  colors: {
    // ブライトトーン
    primary: "#00ADA9",
    // ライトトーン
    secondary: "#F9C270",
    // ソフトトーン
    accent: "#5D5099",
  },
};

const myCustomDarkTheme = {
  dark: false,
  colors: {
    // ダークトーン
    primary: "#0075A9",
    // ディープトーン
    secondary: "#D28300",
    // ダルトーン
    accent: "#903E84",
  },
};

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "myCustomLightTheme",
    themes: {
      myCustomLightTheme,
      myCustomDarkTheme,
    },
  },
});

createApp(App).use(router).use(vuetify).mount("#app");
