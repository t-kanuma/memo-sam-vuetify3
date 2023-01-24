<template>
  <div>
    <!-- コンテナで適切にパディングする。fluidで横幅伸びる。 -->
    <v-container fluid>
      <!-- dense:行間が狭くなる。 -->
      <v-row dense>
        <!-- レスポンシブ:  デフォルトは1列(12/12)して、viewportがsm以上であれば3列(12/4)にする。-->
        <v-col v-for="(memo, i) in memos" :key="i" cols="12" sm="4">
          <v-card
            :title="memo.title"
            :class="{ 'text-decoration-line-through': memo.done }"
            :text="memo.text"
          >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn icon color="secondary" @click="toggleTodoCheckmark(i)">
                <v-icon v-if="memo.done">mdi-checkbox-outline</v-icon>
                <v-icon v-else>mdi-checkbox-blank-outline</v-icon>
              </v-btn>
              <v-btn icon @click="toggleFavorite(i)">
                <v-icon color="pink" v-show="!memo.favorite"
                  >mdi-heart-outline</v-icon
                >
                <v-icon color="pink" v-show="memo.favorite">mdi-heart</v-icon>
              </v-btn>
              <v-btn color="accent" icon @click="archiveMemo(i)">
                <v-icon>mdi-archive</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <div class="float-button-wrapper">
      <v-btn
        color="accent"
        icon
        @click="createNewMemo()"
        class="mr-5 mb-5"
        size="large"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    initLoaded: false,
    archivingDialogShown: false,
    memos: [],
  }),
  async created() {
    this.showMemos();
  },
  computed: {
    favoriteTotal() {
      const favoriteTotal = this.memos.filter((memo) => {
        return memo.favorite === true;
      }).length;
      return favoriteTotal;
    },
    todoDonePercentage() {
      const todoDoneTotal = this.memos.filter((memo) => {
        return memo.done === true;
      }).length;
      return (todoDoneTotal / this.memos.length) * 100;
    },
  },
  methods: {
    async showMemos() {
      try {
        // console.log(import.meta.env.VITE_API_BASE_URL);
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/memos`,
          {
            cache: "no-cache",
            method: "GET",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        this.memos = await response.json();
        this.$emit("favorite", this.favoriteTotal);
        this.$emit("todoDone", this.todoDonePercentage);
        this.$emit("pageName", "メモ");
      } catch (error) {
        // TODO 401ならログイン画面遷移、それ以外ならエラー画面遷移
        console.log(JSON.stringify(error));
      }
    },
    async archiveMemo(i) {
      console.log(i);
      alert("実装中");
      // try {
      //   const currentMemo = this.memos[i];
      //   const response = await fetch(
      //     `${process.env.VUE_APP_API_BASE_URL}/archives/${currentMemo.id}`,
      //     {
      //       cache: "no-cache",
      //       method: "PUT",
      //       credentials: "include",
      //       headers: {
      //         "X-CSRF-TOKEN": this.$cookies.get("csrf_access_token"),
      //       },
      //     }
      //   );
      //   const status = response.status;
      //   if (status === 201) {
      //     this.memos.splice(i, 1);
      //   } else if (status === 401) {
      //     this.$router.push("/login");
      //   } else {
      //     throw new Error(`archivedMemo resulted in ${status}`);
      //   }
      // } catch (error) {
      //   console.log(error);
      // }
    },
    async toggleFavorite(i) {
      console.log(i);
      alert("実装中");
      // const currentMemo = this.memos[i];
      // currentMemo.favorite = !currentMemo.favorite;
      // try {
      //   const response = await fetch(
      //     `${process.env.VUE_APP_API_BASE_URL}/memos/${currentMemo.id}`,
      //     {
      //       cache: "no-cache",
      //       method: "PUT",
      //       body: JSON.stringify(currentMemo),
      //       credentials: "include",
      //       headers: {
      //         "Content-Type": "application/json",
      //         "X-CSRF-TOKEN": this.$cookies.get("csrf_access_token"),
      //       },
      //     }
      //   );
      //   const status = response.status;
      //   if (status === 200) {
      //     this.$emit("favorite", this.favoriteTotal);
      //   } else if (status === 401) {
      //     this.$router.push("/login");
      //   } else {
      //     throw new Error(`toggleFavorite resulted in ${status}`);
      //   }
      // } catch (error) {
      //   currentMemo.favorite = !currentMemo.favorite;
      //   console.log(error);
      // }
    },
    async toggleTodoCheckmark(i) {
      console.log(i);
      alert("実装中");
      // const currentMemo = this.memos[i];
      // currentMemo.done = !currentMemo.done;
      // try {
      //   const response = await fetch(
      //     `${process.env.VUE_APP_API_BASE_URL}/memos/${currentMemo.id}`,
      //     {
      //       cache: "no-cache",
      //       method: "PUT",
      //       body: JSON.stringify(currentMemo),
      //       credentials: "include",
      //       headers: {
      //         "Content-Type": "application/json",
      //         "X-CSRF-TOKEN": this.$cookies.get("csrf_access_token"),
      //       },
      //     }
      //   );
      //   const status = response.status;
      //   if (status === 200) {
      //     this.$emit("todoDone", this.todoDonePercentage);
      //   } else if (status === 401) {
      //     this.$router.push("/login");
      //   } else {
      //     throw new Error(`toggleTodoCheckmark resulted in ${status}`);
      //   }
      // } catch (error) {
      //   currentMemo.done = !currentMemo.done;
      //   console.log(error);
      // }
    },
    createNewMemo() {
      // TODO TODO
      alert("実装中です。");
    },
  },
};
</script>

<style scoped>
.float-button-wrapper {
  width: 5vw;
  left: 95vw;
  height: 5vh;
  top: 95vh;
  position: fixed;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}
</style>
