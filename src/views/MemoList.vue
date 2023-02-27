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
        @click="openNewMemoDialog()"
        class="mr-5 mb-5"
        size="large"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </div>
  </div>
</template>
<script setup>
import { getMemos, updateMemo } from "@/modules/memo";
import { onMounted, ref, computed } from "vue";
import { useFavTotalStore } from "@/stores/favTotal";

const memos = ref([]);

const todoDonePercentage = computed(() => {
  const todoDoneTotal = memos.value.filter((memo) => {
    return memo.done === true;
  }).length;
  return (todoDoneTotal / memos.value.length) * 100;
});

const emit = defineEmits(["todoDone", "pageName"]);
onMounted(showMemos());

const favTotalStore = useFavTotalStore();
const showMemos = async () => {
  memos.value = await getMemos();
  favTotalStore.set(memos);
  emit("todoDone", todoDonePercentage);
  emit("pageName", "メモ");
};

const toggleTodoCheckmark = async (i) => {
  const currentMemo = memos.value[i];
  currentMemo.done = !currentMemo.done;
  try {
    await updateMemo(currentMemo);
    emit("todoDone", todoDonePercentage);
  } catch {
    currentMemo.done = !currentMemo.done;
  }
};

const toggleFavorite = async (i) => {
  const currentMemo = memos.value[i];
  currentMemo.favorite = !currentMemo.favorite;
  try {
    await updateMemo(currentMemo);
    favTotalStore.set(memos);
  } catch {
    currentMemo.favorite = !currentMemo.favTotalStore;
  }
};

const archiveMemo = async (i) => {
  console.log(i);
  alert("実装中です。");
  // const memoToArchive = memos.value[i];
  // await postArchive(memoToArchive);
  // memos.value.splice(i, 1);
};

const openNewMemoDialog = async () => {
  alert("実装中です。");
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
