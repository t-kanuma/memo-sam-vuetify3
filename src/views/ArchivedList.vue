<template>
  <div>
    <v-list>
      <v-list-item v-for="(memo, i) in archivedList" :key="`list-${i}`">
        <v-list-item-title class="font-weight-bold">
          {{ memo.title }}
        </v-list-item-title>
        <span>{{ memo.text }}</span>
        <template v-slot:append>
          <v-list-item-action>
            <v-btn variant="flat" icon @click="unarchiveMemo(i)"
              ><v-icon color="secondary">mdi-package-up</v-icon></v-btn
            >
          </v-list-item-action>

          <v-list-item-action>
            <v-dialog v-model="deletionDialogShown" max-width="30%">
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props" icon variant="flat">
                  <v-icon color="secondary">mdi-delete</v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-toolbar color="accent" class="px-4 text-white"
                  >Warn!</v-toolbar
                >
                <v-card-text class="pa-4">
                  <span class="text-glay"
                    >このメモは完全に削除されます。<br />よろしいですか？</span
                  >
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="accent" variant="flat" @click="deleteMemo(i)">
                    OK
                  </v-btn>
                  <v-btn color="accent" text @click="cancelDeletion()">
                    キャンセル
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-list-item-action>
        </template>
        <v-divider></v-divider>
      </v-list-item>
    </v-list>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";

onMounted(showArchive());

const archivedList = ref([]);
const showArchive = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/archives`,
      {
        method: "GET",
        cache: "no-cache",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    archivedList.value = await response.json();
    this.$emit("pageName", "アーカイブ");
  } catch (error) {
    console.log(JSON.stringify(error));
  }
};

// const unarchivedMemo = async (i) => {
//   console.log(i);
//   alert("実装中");
// try {
//   const currentArchive = this.archivedList[i];
//   const response = await fetch(
//     `${import.meta.env.API_BASE_URL}/memos/${currentArchive.id}`,
//     {
//       cache: "no-cache",
//       method: "POST",
//     }
//   );
//   const status = response.status;
//   if (status === 200) {
//     this.archivedList.splice(i, 1);
//   } else if (status === 401) {
//     this.$router.push("/login");
//   } else {
//     throw new Error(`unarchivedMemo resulted in ${status}`);
//   }
// } catch (error) {
//   console.log(JSON.stringify(error));
// }
// }

// deletion section
const deletionDialogShown = ref(false);
const cancelDeletion = () => {
  deletionDialogShown.value = false;
};
const deleteMemo = (i) => {
  console.log(i);
  alert("実装中");
  // try {
  //   const currentArchive = this.archivedList[i];
  //   const response = await fetch(
  //     `${process.env.VUE_APP_API_BASE_URL}/archives/${currentArchive.id}`,
  //     {
  //       cache: "no-cache",
  //       method: "DELETE",
  //       mode: "cors",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );
  //   const status = response.status;
  //   if (status === 200) {
  //     this.archivedList.splice(i, 1);
  //   } else if (status === 400) {
  //     auth.removeAccessToken();
  //     this.$router.push("/login");
  //   } else {
  //     throw new Error(`deleteMemo resulted in ${status}`);
  //   }
  // } catch (error) {
  //   console.log(error);
  // } finally {
  //   this.deletionDialogShown = false;
  // }
};
</script>
<style scoped></style>
