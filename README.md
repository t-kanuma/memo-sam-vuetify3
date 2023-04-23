# memo-sam-vuetify3

## 認証認可のポイント
* [amazon-cognito-identity-js](https://www.npmjs.com/package/amazon-cognito-identity-js)を使っている。

### アプリ機能
* サインイン
  * エクスペリエンス
    * ユーザ名/パスワードで認証する。
    * パスワードは最低8桁
* サインアウト

### 非アプリ機能
以下は、Cognitoから直接設定する。  
時間があればアプリに実装する。  
注意点として、以下はUIからできないが、直接User Pool APIを叩くことで可能。
* サインアップ
* パスワード再設定（アカウント復旧）
* アカウント削除

------------------

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
