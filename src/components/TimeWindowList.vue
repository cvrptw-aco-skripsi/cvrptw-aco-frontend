<template>
  <v-card class="inner-card">
    <h2>Time Window List</h2>
    <v-list two-line>
      <div v-for="(timeWindow, index) in timeWindowList" :key="index">
        <v-divider v-if="index !== 0" :key="index"></v-divider>
        <v-list-item>
          <v-row>
            <v-col cols="10">
              <v-row>
                <v-col col="6">
                  <v-text-field
                    label="start time"
                    v-model="timeWindowList[index].startTime"
                    @blur="updateTimeWindowInVuex()"
                  ></v-text-field>
                </v-col>
                <v-col col="6">
                  <v-text-field
                    label="end time"
                    v-model="timeWindowList[index].endTime"
                    @blur="updateTimeWindowInVuex()"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="2" class="icon-center">
              <v-icon size="30" @click="removeTimeWindow(index)">mdi-delete</v-icon>
            </v-col>
          </v-row>
        </v-list-item>
      </div>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: "TimeWindowList",
  props: {},
  computed: {
    timeWindowList() {
      return this.$store.getters.timeWindows;
    },
  },
  methods: {
    removeTimeWindow(index) {
      this.timeWindowList.splice(index, 1);
      this.updateTimeWindowInVuex();
    },
    updateTimeWindowInVuex() {
      this.$store.dispatch("setTimeWindows", this.timeWindowList);
    },
  },
  created() {
    this.$root.$on("addTimeWindow", (timeWindow) => {
      this.timeWindowList.push(timeWindow);
      this.updateTimeWindowInVuex();
    });
    this.$store.dispatch("setTimeWindows", this.timeWindowList);
  },
};
</script>

<style scoped lang="scss">
.icon-center {
  margin-top: auto;
  margin-bottom: auto;
  padding: 0;
  text-align: center;
}
</style>
