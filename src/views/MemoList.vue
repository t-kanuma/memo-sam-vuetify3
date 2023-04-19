<template>
  <template v-if="renderReady">
    <!-- コンテナで適切にパディングする。fluidで横幅伸びる。 -->
    <v-container fluid>
      <!-- dense:行間が狭くなる。 -->
      <v-row dense>
        <!-- レスポンシブ:  デフォルトは1列(12/12)して、viewportがsm以上であれば3列(12/4)にする。-->
        <v-col v-for="(memo, i) in memos" :key="i" cols="12" sm="4">
          <v-card>
            <v-card-title
              :class="{ 'text-decoration-line-through': memo.done }"
              >{{ memo.title }}</v-card-title
            >
            <v-card-text :class="{ 'text-decoration-line-through': memo.done }">
              {{ memo.text }}
            </v-card-text>
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
      <v-snackbar
        :timeout="2000"
        v-model="noticeAfterArchive"
        centered
        variant="tonal"
        location="center"
        close-on-content-click
        color="primary"
      >
        アーカイブしました。
      </v-snackbar>
    </v-container>

    <!-- new memo dialog-->
    <v-dialog
      v-model="newMemo.dialog"
      fullscreen
      scrim="false"
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ props }">
        <div class="float-button-wrapper">
          <v-btn
            v-bind="props"
            size="large"
            icon
            color="accent"
            class="mr-3 mb-3"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </div>
      </template>
      <v-card>
        <v-toolbar color="primary" clipped-right>
          <v-btn icon @click="newMemo.dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-app-bar-title class="white--text">新規メモ登録</v-app-bar-title>
        </v-toolbar>

        <v-container>
          <v-row>
            <v-card class="mx-auto my-10" style="width: 50vw">
              <v-card-subtitle class="mt-3"
                >タイトルと本文を記入してください。</v-card-subtitle
              >
              <v-spacer></v-spacer>
              <v-form ref="newMemoForm" class="px-4 py-2">
                <v-text-field
                  prepend-icon="mdi-pencil"
                  color="accent"
                  v-model="newMemo.title"
                  label="タイトル"
                  :rules="newMemo.titleRule"
                  variant="outlined"
                ></v-text-field>
                <v-textarea
                  clearable
                  label="本文"
                  prepend-icon="mdi-pencil"
                  variant="outlined"
                  v-model="newMemo.text"
                  :rules="newMemo.textRule"
                  class="mt-4"
                  color="accent"
                ></v-textarea>
              </v-form>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  :loading="newMemo.loader"
                  class="white--text"
                  color="accent"
                  variant="outlined"
                  @click="saveNewMemo()"
                >
                  保存
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </template>
  <template v-else>
    <!-- <div class="prog-circ-on-init">
      <v-progress-circular
        size="200"
        width="5"
        color="secondary"
        indeterminate
      ></v-progress-circular>
    </div> -->
    <v-progress-linear
      indeterminate
      color="accent-lighten-2"
    ></v-progress-linear>
  </template>
</template>
<script setup>
import { getMemos, updateMemo, postMemo } from "@/modules/memo";
import { onMounted, ref, computed, reactive } from "vue";
import { useFavTotalStore } from "@/stores/favoriteTotal";

const renderReady = ref(false);
const memos = ref([]);
const emit = defineEmits(["todoDone", "pageName"]);
// memo:storeの取得
const favTotalStore = useFavTotalStore();

const showMemos = async () => {
  memos.value = await getMemos();
  favTotalStore.set(memos);
  emit("todoDone", [todoDonePercentage.value]);
  emit("pageName", ["メモ"]);
};

const toggleFavorite = async (i) => {
  const currentMemo = memos.value[i];
  currentMemo.favorite = !currentMemo.favorite;

  await updateMemo(currentMemo);
  // pinia使っているのでemitで更新する必要はない。
  favTotalStore.set(memos);
};

const todoDonePercentage = computed(() => {
  const todoDoneTotal = memos.value.filter((memo) => {
    return memo.done === true;
  }).length;
  return (todoDoneTotal / memos.value.length) * 100;
});

const toggleTodoCheckmark = async (i) => {
  const currentMemo = memos.value[i];
  currentMemo.done = !currentMemo.done;
  await updateMemo(currentMemo);
  emit("todoDone", [todoDonePercentage.value]);
};

const noticeAfterArchive = ref(false);
const archiveMemo = async (i) => {
  const memoToArchive = memos.value[i];
  memoToArchive.archived = true;
  await updateMemo(memoToArchive);
  await showMemos();
  noticeAfterArchive.value = true;
};

const newMemoForm = ref(null);
const newMemo = reactive({
  dialog: false,
  loader: false,
  title: null,
  text: null,
  titleRule: [
    (v) => !!v || "タイトルは必須です。",
    (v) => v.length <= 20 || "タイトルは20文字以内で入力してください。",
  ],
  textRule: [(v) => !!v || "本文は必須です。"],
});
const saveNewMemo = async () => {
  if ((await newMemoForm.value.validate()).valid) {
    newMemo.loader = true;
    renderReady.value = false;
    await postMemo({
      title: newMemo.title,
      text: newMemo.text,
    });
    await showMemos();
    newMemo.loader = false;
    newMemo.dialog = false;
    renderReady.value = true;
  }
};

onMounted(async () => {
  await showMemos();
  renderReady.value = true;
});
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

.prog-circ-on-init {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
