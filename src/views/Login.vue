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
            label="ユーザー名"
            prepend-icon="mdi-account-circle"
            color="accent-lighten-1"
            :counter="8"
            :rules="nameRules"
            class="mb-3"
          ></v-text-field>
          <v-text-field
            v-model="password"
            autocomplete
            :type="passwordHidden ? 'password' : 'text'"
            label="パスワード"
            prepend-icon="mdi-lock"
            :append-icon="passwordHidden ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append="passwordHidden = !passwordHidden"
            color="accent-lighten-1"
            :counter="8"
            :rules="nameRules"
          ></v-text-field> </v-card-text
        ><v-card-actions
          ><v-spacer></v-spacer
          ><v-btn variant="flat" color="accent" @click="login">ログイン</v-btn>
        </v-card-actions></v-form
      ></v-card
    >
  </div>
</template>
<script>
export default {
  data() {
    return {
      loginName: null,
      password: null,
      passwordHidden: true,
      nameRules: [
        (v) => !!v || "必須です。",
        (v) => (v || "").length <= 8 || "8文字以下にしてください",
        (v) => {
          var reg = new RegExp(/^[a-zA-Z1-9]+$/);
          return reg.test(v) || "英字または数字のみにしてください。";
        },
      ],
    };
  },
  methods: {
    async login() {
      if (this.$refs.form.validate()) {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
            {
              cache: "no-cache",
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                user_name: this.loginName,
                password: this.password,
              }),
            }
          );

          const status = response.status;
          if (status === 200) {
            this.$router.push("/");
          } else {
            throw new Error(`login resulted in ${status}`);
          }
        } catch (error) {
          console.log(JSON.stringify(error));
        }
      }
    },
  },
};
</script>
<style scoped>
.login-container {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to left, rgb(var(--v-theme-on-primary)), #4bbfc3);
}
</style>
