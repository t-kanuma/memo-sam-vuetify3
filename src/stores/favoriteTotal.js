import { defineStore } from "pinia";

// memo:useFavoriteTotalStoreはCallableな関数
// = defineStoreの戻り値
export const useFavTotalStore = defineStore({
  id: "favTotal",
  state: () => ({
    favTotal: 0,
  }),
  getters: {
    // sample code...
    timesTen: (state) => state.favTotal * 10,
  },
  actions: {
    set(memos) {
      this.favTotal = memos.value.filter((memo) => {
        return memo.favorite === true;
      }).length;
    },
  },
});
