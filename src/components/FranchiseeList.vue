<template>
  <v-card class="inner-card">
    <h2>Franchisee List</h2>
    <v-list two-line>
      <div v-for="(franchisee, index) in franchiseeList" :key="index">
        <v-divider v-if="index !== 0" :key="index"></v-divider>
        <v-list-item>
          <v-row>
            <v-col cols="11">
              <v-row>
                <v-col col="2">
                  <v-text-field
                    label="x position"
                    v-model="franchiseeList[index].x"
                    @blur="updateFranchiseeInVuex()"
                  ></v-text-field>
                </v-col>
                <v-col col="2">
                  <v-text-field
                    label="y position"
                    v-model="franchiseeList[index].y"
                    @blur="updateFranchiseeInVuex()"
                  ></v-text-field>
                </v-col>
                <v-col col="8">
                  <v-select
                    v-model="franchiseeList[index].timeWindowIndex"
                    :items="timeWindowList"
                    :item-text="getTimeWindowText"
                    :item-value="getTimeWindowId"
                    label="time window"
                  ></v-select>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="1" class="icon-center">
              <v-icon size="30" @click="removeFranchisee(index)">mdi-delete</v-icon>
            </v-col>
          </v-row>
        </v-list-item>
      </div>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: "FranchiseeList",
  props: {},
  data() {
    return {
      franchiseeList: [
        { x: "1", y: "3.3", timeWindowIndex: 0 },
        { x: "4.0", y: "-3.6", timeWindowIndex: 1 },
        { x: "-3.2", y: "4.1", timeWindowIndex: 2 },
      ],
      timeWindowList: this.$store.getters.timeWindows,
    };
  },
  methods: {
    getTimeWindowText(timeWindowObject) {
      return timeWindowObject.startTime + " - " + timeWindowObject.endTime;
    },
    getTimeWindowId(timeWindowObject) {
      return timeWindowObject.id;
    },
    removeFranchisee(index) {
      this.franchiseeList.splice(index, 1);
      this.updateFranchiseeInVuex();
    },
    updateFranchiseeInVuex() {
      this.$store.dispatch("setFranchisees", this.franchiseeList);
    },
  },
  created() {
    this.$root.$on("addFranchisee", (franchisee) => {
      this.franchiseeList.push(franchisee);
      this.updateFranchiseeInVuex();
    });
    this.$store.dispatch("setFranchisees", this.franchiseeList);
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
