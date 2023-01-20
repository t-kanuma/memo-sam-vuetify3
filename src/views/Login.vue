<template>
  <div class="d-flex justify-center align-center login-container">
    <v-card rounded="lg">
      <v-img
        src="/login-img.jpg"
        width="30rem"
        class="white--text align-end"
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
            color="accent lighten-1"
            :counter="8"
            :rules="nameRules"
          ></v-text-field>
          <v-text-field
            v-model="password"
            :type="passwordHidden ? 'password' : 'text'"
            label="パスワード"
            prepend-icon="mdi-lock"
            :append-icon="passwordHidden ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append="passwordHidden = !passwordHidden"
            color="accent lighten-1"
            :counter="8"
            :rules="nameRules"
          ></v-text-field> </v-card-text
        ><v-card-actions
          ><v-spacer></v-spacer
          ><v-btn color="accent" @click="login">ログイン</v-btn>
        </v-card-actions></v-form
      ></v-card
    >
  </div>
</template>
<script>
import { Auth } from "aws-amplify";

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
    // TODO 画面作る。
    // async signUp() {
    //   try {
    //     const { user } = await Auth.signUp({
    //       username: "xxx",
    //       password: "yyy",
    //       attributes: {
    //         email: "xxx@gmail.com",
    //         "custom:userId": "1",
    //       },
    //     });
    //     console.log(user);
    //   } catch (error) {
    //     // TODO 画面反映
    //     console.log("error signing up:", error);
    //   }
    // },
    async login() {
      if (this.$refs.form.validate()) {
        const NODE_ENV = process.env.NODE_ENV;
        if (NODE_ENV === "local") {
          try {
            const response = await fetch(
              `${process.env.VUE_APP_API_BASE_URL}/auth/login`,
              {
                cache: "no-cache",
                method: "POST",
                credentials: "include",
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
            console.log(error);
          }
        } else if (NODE_ENV === "amplify") {
          try {
            await Auth.signIn(this.loginName, this.password);
            this.$router.push("/");
          } catch (error) {
            // TODO エラー画面遷移
            console.log("error signing in: ", error);
          }
        } else {
          // noop
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
  background: linear-gradient(to right, var(--v-primary-base), #80acad);
}
</style>
