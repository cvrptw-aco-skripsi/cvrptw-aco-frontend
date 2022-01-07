<template>
  <v-card class="inner-card">
    <v-form ref="form" v-model="valid" lazy-validation>
      <h2>Create Franchisee</h2>
      <v-row>
        <v-col col="4">
          <v-text-field v-model="x" type="number" label="x position"></v-text-field>
        </v-col>
        <v-col col="4">
          <v-text-field v-model="y" type="number" label="y position"></v-text-field>
        </v-col>
        <v-col col="4">
          <v-select
            v-model="timeWindowIndex"
            :items="timeWindowList"
            :item-text="getTimeWindowText"
            :item-value="getTimeWindowId"
            label="time window"
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-btn block color="green darken-1 white--text" :disabled="!valid" @click="addFranchisee()">Add</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script>
export default {
  name: "CreateTimeWindow",
  props: {},
  data() {
    return {
      x: null,
      y: null,
      timeWindowIndex: null,
      valid: false,
    };
  },
  computed: {
    timeWindowList() {
      return this.$store.getters.timeWindows;
    },
  },
  methods: {
    addFranchisee() {
      let franchisee = {
        x: this.x,
        y: this.y,
        timeWindowIndex: this.timeWindowIndex,
      };
      this.$root.$emit("addFranchisee", franchisee);
      this.resetInput();
    },
    getTimeWindowText(timeWindowObject) {
      return timeWindowObject.startTime + " - " + timeWindowObject.endTime;
    },
    getTimeWindowId(timeWindowObject) {
      return timeWindowObject.id;
    },
    resetInput() {
      this.x = null;
      this.y = null;
      this.timeWindowIndex = null;
    },
  },
};
</script>

<style scoped lang="scss">
.v-btn {
  text-transform: none;
  margin-bottom: 10px;
}
</style>
