<template>
  <div>
    <v-list>
      <template v-for="(memo, i) in archivedList" :key="`list-${i}`">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title
              :data-test="`item-title-${i}`"
              class="font-weight-bold"
            >
              {{ memo.title }}
            </v-list-item-title>
            <span :data-test="`item-content-${i}`">{{ memo.text }}</span>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon @click="unarchiveMemo(i)"
              ><v-icon color="secondary">mdi-package-up</v-icon></v-btn
            >
          </v-list-item-action>
          <v-list-item-action>
            <v-dialog v-model="deletionDialogShown" max-width="30%">
              <template v-slot:activator="{ on, attrs }">
                <v-btn :data-test="`delete-${i}`" v-bind="attrs" v-on="on" icon>
                  <v-icon color="secondary">mdi-delete</v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-toolbar color="accent" class="white--text">Warn!</v-toolbar>
                <v-card-text class="pa-4">
                  <span class="glay--text"
                    >このメモは完全に削除されます。<br />よろしいですか？</span
                  >
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    :data-test="`delete-${i}-final`"
                    color="accent"
                    @click="deleteMemo(i)"
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
        </v-list-item>
        <v-divider></v-divider>
      </template>
    </v-list>
  </div>
</template>
<script>
// import auth from "@/modules/auth.js";
export default {
  data() {
    return {
      deletionDialogShown: false,
      archivedList: [],
    };
  },
  created() {
    this.showArchive();
  },
  methods: {
    async showArchive() {
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
        this.archivedList = await response.json();
        this.$emit("pageName", "アーカイブ");
      } catch (error) {
        console.log(JSON.stringify(error));
      }
    },
    async unarchiveMemo(i) {
      console.log(i);

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
    },
    async deleteMemo(i) {
      console.log(i);

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
    },
    cancelDeletion() {
      this.deletionDialogShown = false;
    },
  },
};
</script>
<style scoped></style>
