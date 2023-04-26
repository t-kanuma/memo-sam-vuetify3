<template>
  <div class="d-flex justify-center align-center login-container">
    <v-card rounded="lg">
      <v-img
        src="/login-img.jpg"
        width="30rem"
        class="text-white align-end"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      >
        <v-card-title>サンプルシンプルメモアプリ</v-card-title>
      </v-img>

      <v-form ref="form">
        <v-card-text>
          <v-text-field
            v-model="loginName"
            variant="underlined"
            label="ユーザー名"
            prepend-icon="mdi-account-circle"
            color="accent"
            :counter="8"
            :rules="userNameRules"
            class="mb-3"
          ></v-text-field>
          <v-text-field
            v-model="password"
            variant="underlined"
            autocomplete
            :type="passwordHidden ? 'password' : 'text'"
            label="パスワード"
            prepend-icon="mdi-lock"
            :append-icon="passwordHidden ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append="passwordHidden = !passwordHidden"
            color="accent"
            :counter="8"
            :rules="passwordRules"
          ></v-text-field>
          <div class="mt-2 text-error d-flex justify-center align-center">
            {{ loginFailedMessage ?? "" }}
          </div> </v-card-text
        ><v-card-actions
          ><v-spacer></v-spacer
          ><v-btn variant="flat" color="accent" @click="login">ログイン</v-btn>
        </v-card-actions></v-form
      ></v-card
    >
  </div>
</template>
<script setup>
import { ref } from "vue";
import { authenticate, completeNewPasswordChallenge } from "../modules/auth";
import { useRouter } from "vue-router";
const router = useRouter();

const loginName = ref(null);

const password = ref(null);
const passwordHidden = ref(true);

const form = ref(null);
const loginFailedMessage = ref(null);

const userNameRules = [
  (v) => !!v || "必須です。",
  (v) => {
    const reg = new RegExp(/^[a-zA-Z1-9]+$/);
    return reg.test(v) || "英字または数字のみにしてください。";
  },
];

const passwordRules = [
  (v) => !!v || "必須です。",
  (v) => (v || "").length >= 8 || "7文字以上にしてください",
  // (v) => {
  //   const reg = new RegExp(/^[a-zA-Z1-9]+$/);
  //   return reg.test(v) || "英字または数字のみにしてください。";
  // },
];

const login = async () => {
  if ((await form.value.validate()).valid) {
    try {
      const session = await authenticate(loginName.value, password.value);
      console.debug(session);

      if ("idToken" in session) {
        router.push("/");
      } else {
        // とりあえず初回パスワードをそのまま使ってしまう。
        // TODO 本来はサインアップ画面を用意して、ユーザーにパスワード設定してもらうので
        // NewPasswordChallenge自体が不要になる。
        const passwordChallengeResult = await completeNewPasswordChallenge(
          loginName.value,
          password.value
        );
        console.debug(passwordChallengeResult);
        router.push("/");
      }
    } catch (e) {
      console.debug(e);
      loginFailedMessage.value = "ログインまたはパスワードに誤りがあります。";
    }
  }
};
</script>
<style scoped>
.login-container {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to left, rgb(var(--v-theme-on-primary)), #4bbfc3);
}
</style>
