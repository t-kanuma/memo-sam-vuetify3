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
                  <v-btn
                    color="accent"
                    variant="flat"
                    @click="removeArchive(i)"
                  >
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
import { getArchives, deleteArchive } from "@/modules/archive";

const emit = defineEmits(["pageName"]);
const archives = ref([]);

onMounted(showArchive());

const showArchive = async () => {
  archives.value = await getArchives();
  emit("pageName", "アーカイブ");
};

// delete section
const deletionDialogShown = ref(false);

const cancelDeletion = () => {
  deletionDialogShown.value = false;
};

const removeArchive = async (i) => {
  const archiveToRemove = archives.value[i];
  await deleteArchive(archiveToRemove.id);
  archives.value.splice(i, 1);
  deletionDialogShown.value = false;
};

// const unarchive = async () => {
//   todo
//   await postMemo();
// };
</script>
<style scoped></style>
