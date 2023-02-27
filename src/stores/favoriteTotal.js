import { defineStore } from "pinia";

export const useFavTotalStore = defineStore({
  id: "favTotal",
  state: () => ({
    favTotal: 0,
  }),
  getters: {
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
