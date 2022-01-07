<template>
  <v-card class="inner-card">
    <v-form ref="form">
      <h2>Create Time Window</h2>
      <v-row>
        <v-col col="4">
          <v-dialog ref="dialog1" v-model="startTimeModal" :return-value.sync="startTime" persistent width="290px">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="startTime"
                label="start time"
                prepend-icon="mdi-clock-time-four-outline"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker v-if="startTimeModal" v-model="startTime" format="24hr" full-width>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="startTimeModal = false"> Cancel </v-btn>
              <v-btn text color="primary" @click="$refs.dialog1.save(startTime)"> OK </v-btn>
            </v-time-picker>
          </v-dialog>
        </v-col>
        <v-col col="4">
          <v-dialog ref="dialog2" v-model="endTimeModal" :return-value.sync="endTime" persistent width="290px">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="endTime"
                label="end time"
                prepend-icon="mdi-clock-time-four-outline"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker v-if="endTimeModal" v-model="endTime" :min="startTime" format="24hr" full-width>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="endTimeModal = false"> Cancel </v-btn>
              <v-btn text color="primary" @click="$refs.dialog2.save(endTime)"> OK </v-btn>
            </v-time-picker>
          </v-dialog>
        </v-col>
        <v-col col="4" class="vertical-center">
          <v-btn block color="green darken-1 white--text" @click="addTimeWindow()">Add</v-btn>
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
      startTime: null,
      endTime: null,
      startTimeModal: false,
      endTimeModal: false,
    };
  },
  methods: {
    addTimeWindow() {
      let timeWindow = {
        startTime: this.startTime,
        endTime: this.endTime,
      };
      this.$root.$emit("addTimeWindow", timeWindow);
    },
    getHour(time) {
      return time == null ? 0 : parseInt(time.toString().split(":")[0]);
    },
    getMinute(time) {
      return time == null ? 0 : parseInt(time.toString().split(":")[1]);
    },
  },
  created() {
    this.startTime = "08:00";
    this.endTime = "11:00";
  },
};
</script>

<style scoped lang="scss">
.v-btn {
  text-transform: none;
  margin-bottom: 10px;
}
</style>
