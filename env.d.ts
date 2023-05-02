/// <reference types="vite/client" />

// declare module "vuetify";
// declare module "vuetify/components";
// declare module "vuetify/directives";
// declare module "vuetify/iconsets/mdi";
// declare module "vuetify/labs/components";
// declare module "vuetify/locale";
// declare module "vuetify/styles/generic";
// declare module "vuetify/util/colors";

interface ImportMetaEnv {
  // see https://vitejs.dev/guide/env-and-mode.html#env-files
  // add .env variables.
  readonly VITE_API_BASE_URL: string;
  readonly VITE_COGNITO_USER_POOL_ID: string;
  readonly VITE_COGNITO_CLIENT_ID: string;
}

// eslint-disable-next-line no-unused-vars
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
