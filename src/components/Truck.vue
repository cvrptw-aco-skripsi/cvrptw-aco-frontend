<template>
  <v-card class="truck-card">
    <v-row>
      <v-col cols="6">
        <div>
          <v-row>
            <v-col cols="8" class="vertical-center padding-bottom-0">
              <p>Truck capacity (homogeneous)</p>
            </v-col>
            <v-col cols="4" class="padding-bottom-0">
              <v-text-field v-model="truckCapacity" type="number"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="8" class="vertical-center padding-top-0">
              <p>Number of trucks</p>
            </v-col>
            <v-col cols="4" class="padding-top-0">
              <v-text-field v-model="numberOfTrucks" type="number"></v-text-field>
            </v-col>
          </v-row>
        </div>
      </v-col>
      <v-col cols="6">
        <v-row>
          <v-col style="text-align: right">
            <router-link :to="{ name: 'About' }">
              <v-avatar size="56">
                <img alt="user" src="../../public/img/tommy.jpg" />
              </v-avatar>
            </router-link>
          </v-col>
        </v-row>
        <v-row>
          <v-col style="text-align: right">
            <v-btn color="warning darken-1 white--text" @click="getSamples()">
              <v-icon left> mdi-shuffle-variant </v-icon> Get samples
            </v-btn>
          </v-col>
          <v-col style="text-align: right">
            <v-btn color="green darken-1 white--text" :disabled="!isValid()" @click="calculateUsingACO()">
              Calculate using ACO
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  name: "Truck",
  props: {},
  data() {
    return {
      samples: [
        {
          timeWindowList: [
            { startTime: "08.00", endTime: "12.00" },
            { startTime: "12.00", endTime: "16.00" },
            { startTime: "16.00", endTime: "20.00" },
          ],
          franchiseeList: [
            { x: -4.56, y: 3.07, demand: 3.2, timeWindowIndex: 0 },
            { x: -5.83, y: 1.69, demand: 4.1, timeWindowIndex: 0 },
            { x: -6.01, y: -1.15, demand: 3.1, timeWindowIndex: 1 },
            { x: -4.69, y: -3.02, demand: 2.7, timeWindowIndex: 0 },
            { x: -2.89, y: -3.9, demand: 1.2, timeWindowIndex: 2 },
            { x: -0.83, y: -4.09, demand: 0.6, timeWindowIndex: 2 },
            { x: 2.16, y: -3.99, demand: 9.1, timeWindowIndex: 0 },
            { x: 4.19, y: -2.85, demand: 3.3, timeWindowIndex: 1 },
            { x: 5.22, y: -1.04, demand: 2.7, timeWindowIndex: 1 },
            { x: 5.24, y: 1.17, demand: 4.3, timeWindowIndex: 0 },
            { x: 3.98, y: 3.17, demand: 2.8, timeWindowIndex: 2 },
            { x: 2.06, y: 4.44, demand: 2.7, timeWindowIndex: 0 },
            { x: 0.13, y: 4.48, demand: 1.5, timeWindowIndex: 2 },
            { x: -1.87, y: 4.37, demand: 0.8, timeWindowIndex: 0 },
            { x: -3.19, y: 3.8, demand: 1.1, timeWindowIndex: 1 },
          ],
          truckCapacity: 10,
          numberOfTrucks: 8,
        },
        {
          timeWindowList: [
            { startTime: "08.00", endTime: "12.00" },
            { startTime: "12.00", endTime: "16.00" },
            { startTime: "16.00", endTime: "20.00" },
          ],
          franchiseeList: [
            { x: -4.56, y: 3.07, demand: 3.2, timeWindowIndex: 0 },
            { x: -6.01, y: -1.15, demand: 3.1, timeWindowIndex: 1 },
            { x: -4.69, y: -3.02, demand: 2.7, timeWindowIndex: 0 },
            { x: -0.83, y: -4.09, demand: 0.6, timeWindowIndex: 2 },
            { x: 5.22, y: -1.04, demand: 2.7, timeWindowIndex: 1 },
            { x: 0.13, y: 4.48, demand: 1.5, timeWindowIndex: 2 },
            { x: -3.19, y: 3.8, demand: 1.1, timeWindowIndex: 1 },
          ],
          truckCapacity: 10,
          numberOfTrucks: 8,
        },
        {
          timeWindowList: [
            { startTime: "08.30", endTime: "12.00" },
            { startTime: "12.00", endTime: "15.30" },
          ],
          franchiseeList: [
            { x: -1.04, y: 1.07, demand: 1, timeWindowIndex: 0 },
            { x: -1.06, y: 2.22, demand: 2, timeWindowIndex: 0 },
            { x: -2.89, y: 3.04, demand: 1.1, timeWindowIndex: 1 },
            { x: -3.48, y: 2.21, demand: 2.1, timeWindowIndex: 0 },
            { x: -2.47, y: 1.83, demand: 3, timeWindowIndex: 0 },
            { x: -4.59, y: 1.24, demand: 3, timeWindowIndex: 1 },
            { x: -5.12, y: 2.56, demand: 1, timeWindowIndex: 0 },
            { x: -3.93, y: 3.99, demand: 1, timeWindowIndex: 0 },
            { x: -2.33, y: 4.22, demand: 2, timeWindowIndex: 1 },
            { x: -6.06, y: 4.34, demand: 2, timeWindowIndex: 0 },
            { x: -5.97, y: 1.75, demand: 3, timeWindowIndex: 0 },
            { x: -5.77, y: -0.26, demand: 3, timeWindowIndex: 1 },
            { x: -6.17, y: -1.23, demand: 1.2, timeWindowIndex: 0 },
            { x: -5.92, y: -1.23, demand: 1.1, timeWindowIndex: 0 },
            { x: -4.1, y: -4.15, demand: 1.9, timeWindowIndex: 1 },
            { x: -4.82, y: -2.34, demand: 1, timeWindowIndex: 0 },
            { x: -4.82, y: -1.4, demand: 2, timeWindowIndex: 0 },
            { x: -1.35, y: -1.46, demand: 2, timeWindowIndex: 1 },
            { x: -2.55, y: -2.83, demand: 2, timeWindowIndex: 0 },
            { x: -1.1, y: -3.77, demand: 2, timeWindowIndex: 0 },
            { x: 0.92, y: -3.8, demand: 2, timeWindowIndex: 1 },
            { x: 4.86, y: -3.32, demand: 3, timeWindowIndex: 0 },
            { x: 3.06, y: -3.24, demand: 3, timeWindowIndex: 0 },
            { x: 2.59, y: -3.77, demand: 3, timeWindowIndex: 1 },
            { x: 1.13, y: -1.43, demand: 2.5, timeWindowIndex: 0 },
            { x: 2.72, y: -1.5, demand: 2.5, timeWindowIndex: 0 },
            { x: 1.4, y: -2.5, demand: 2.5, timeWindowIndex: 1 },
            { x: 5.92, y: -1.5, demand: 2.5, timeWindowIndex: 0 },
            { x: 3.09, y: 1.24, demand: 2.5, timeWindowIndex: 0 },
            { x: 1.01, y: 1.87, demand: 2.5, timeWindowIndex: 1 },
            { x: 1.24, y: 4.31, demand: 2.5, timeWindowIndex: 0 },
            { x: 4.88, y: 3.84, demand: 2.5, timeWindowIndex: 0 },
            { x: 2.14, y: 3.67, demand: 2.1, timeWindowIndex: 1 },
            { x: 1.01, y: 3.37, demand: 2.1, timeWindowIndex: 0 },
            { x: 5.36, y: 2.47, demand: 2.1, timeWindowIndex: 0 },
            { x: 3.23, y: 2.51, demand: 2.1, timeWindowIndex: 1 },
            { x: 6.18, y: 0.55, demand: 2.1, timeWindowIndex: 0 },
            { x: 4.62, y: 0.55, demand: 2.1, timeWindowIndex: 0 },
            { x: 4.79, y: -0.83, demand: 2.1, timeWindowIndex: 1 },
            { x: 0.91, y: 0.38, demand: 2.5, timeWindowIndex: 0 },
            { x: -2.62, y: 0.23, demand: 2.5, timeWindowIndex: 0 },
          ],
          truckCapacity: 10,
          numberOfTrucks: 10,
        },
        {
          timeWindowList: [
            { startTime: "07.00", endTime: "08.00" },
            { startTime: "08.00", endTime: "09.00" },
            { startTime: "09.00", endTime: "10.00" },
          ],
          franchiseeList: [
            { x: -6.18, y: 4.34, demand: 1, timeWindowIndex: 0 },
            { x: -2.28, y: 4.31, demand: 3.3, timeWindowIndex: 1 },
            { x: 1.3, y: 4.35, demand: 3.3, timeWindowIndex: 0 },
            { x: 5.93, y: 4.45, demand: 3.3, timeWindowIndex: 1 },
            { x: 6.0, y: 1.5, demand: 3.3, timeWindowIndex: 2 },
            { x: 1.33, y: 1.72, demand: 3.3, timeWindowIndex: 2 },
            { x: -2.3, y: 1.46, demand: 3.3, timeWindowIndex: 0 },
            { x: -6.44, y: 1.65, demand: 3.3, timeWindowIndex: 0 },
            { x: -6.19, y: -1.93, demand: 4.7, timeWindowIndex: 2 },
            { x: -2.2, y: -1.68, demand: 4.7, timeWindowIndex: 1 },
            { x: 1.4, y: -1.53, demand: 4.7, timeWindowIndex: 0 },
            { x: 6.29, y: -1.69, demand: 4.7, timeWindowIndex: 1 },
            { x: 6.37, y: -4.05, demand: 4.7, timeWindowIndex: 0 },
            { x: 1.6, y: -4.05, demand: 4.7, timeWindowIndex: 2 },
            { x: -2.43, y: -3.88, demand: 4.7, timeWindowIndex: 0 },
            { x: -6.14, y: -3.99, demand: 4.7, timeWindowIndex: 1 },
          ],
          truckCapacity: 13,
          numberOfTrucks: 8,
        },
        {
          timeWindowList: [{ startTime: "07.00", endTime: "08.00" }],
          franchiseeList: [
            { x: -2.12, y: 3.84, demand: 3.2, timeWindowIndex: 0 },
            { x: -2.97, y: 3.74, demand: 3.2, timeWindowIndex: 0 },
            { x: -4.06, y: 2.41, demand: 3.2, timeWindowIndex: 0 },
            { x: -5.04, y: 4.05, demand: 3.2, timeWindowIndex: 0 },
            { x: -5.83, y: 0.95, demand: 3.2, timeWindowIndex: 0 },
            { x: -2.45, y: 2.13, demand: 3.2, timeWindowIndex: 0 },
            { x: -2.52, y: 0.48, demand: 3.2, timeWindowIndex: 0 },
            { x: -3.32, y: 0.72, demand: 3.2, timeWindowIndex: 0 },
            { x: -0.76, y: 0.93, demand: 1.7, timeWindowIndex: 0 },
            { x: 0.7, y: -1.08, demand: 1.7, timeWindowIndex: 0 },
            { x: 5.48, y: -3.02, demand: 1.7, timeWindowIndex: 0 },
            { x: -0.41, y: 2.91, demand: 1.7, timeWindowIndex: 0 },
            { x: -0.75, y: 1.78, demand: 1.7, timeWindowIndex: 0 },
            { x: -3.65, y: -0.23, demand: 1.7, timeWindowIndex: 0 },
            { x: -4.74, y: -1.12, demand: 1.7, timeWindowIndex: 0 },
          ],
          truckCapacity: 9,
          numberOfTrucks: 7,
        },
        {
          timeWindowList: [
            { startTime: "10.00", endTime: "12.00" },
            { startTime: "13.00", endTime: "15.00" },
          ],
          franchiseeList: [
            { x: -6.34, y: 4.18, demand: 10, timeWindowIndex: 0 },
            { x: -5.0, y: -3.15, demand: 11, timeWindowIndex: 0 },
            { x: 3.62, y: -2.99, demand: 12.4, timeWindowIndex: 0 },
            { x: 6.33, y: 4.42, demand: 8.1, timeWindowIndex: 1 },
          ],
          truckCapacity: 41.4,
          numberOfTrucks: 1,
        },
      ],
    };
  },
  computed: {
    timeWindowList() {
      return this.$store.getters.timeWindows;
    },
    franchiseeList() {
      return this.$store.getters.franchisees;
    },
    truckCapacity: {
      get() {
        return this.$store.getters.truckCapacity;
      },
      set(value) {
        if (value) {
          this.$store.dispatch("setTruckCapacity", value);
        }
      },
    },
    numberOfTrucks: {
      get() {
        return this.$store.getters.numberOfTrucks;
      },
      set(value) {
        if (value) {
          this.$store.dispatch("setNumberOfTrucks", value);
        }
      },
    },
  },
  methods: {
    calculateUsingACO() {
      let timeWindowList = this.timeWindowList.map((timeWindow) => {
        timeWindow.startTime = timeWindow.startTime.replace(".", ":");
        timeWindow.endTime = timeWindow.endTime.replace(".", ":");
        return timeWindow;
      });

      console.log("Request object..");
      console.log({
        timeWindows: timeWindowList,
        nodes: this.franchiseeList,
        vehicleCapacity: parseFloat(this.truckCapacity),
        maxNumberOfVehicle: parseInt(this.numberOfTrucks),
      });

      axios
        .post(
          `${process.env.VUE_APP_API_BASE_URL}/api/cvrp/aco`,
          {
            timeWindows: timeWindowList,
            nodes: this.franchiseeList,
            vehicleCapacity: this.truckCapacity,
            maxNumberOfVehicle: this.numberOfTrucks,
          },
          {
            headers: {
              accept: "application/json",
              "content-type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log("Successful response data..");
          console.log(res.data.data);
          this.$root.$emit("apiResponse", res.data.data);
          this.resetInput();
        })
        .catch((err) => {
          console.log("Failed response data..");
          console.log(err.response);
          this.$root.$emit("apiResponse", err.response.data.errors);
        });
    },
    resetInput() {
      this.truckCapacity = null;
      this.numberOfTrucks = null;
    },
    isValid() {
      return !!(
        this.truckCapacity &&
        this.numberOfTrucks &&
        this.timeWindowList.length > 0 &&
        this.franchiseeList.length > 0
      );
    },
    getSamples() {
      const min = 0;
      const max = 4;
      let randomIndex = Math.floor(Math.random() * (max - min + 1)) + min;
      // randomIndex = 1;
      this.$store.dispatch("setTimeWindows", this.samples[randomIndex].timeWindowList);
      this.$store.dispatch("setFranchisees", this.samples[randomIndex].franchiseeList);
      this.$store.dispatch("setTruckCapacity", this.samples[randomIndex].truckCapacity);
      this.$store.dispatch("setNumberOfTrucks", this.samples[randomIndex].numberOfTrucks);
    },
  },
};
</script>

<style scoped lang="scss">
.truck-card {
  padding: 10px 20px;
}
.v-btn {
  text-transform: none;
  margin-bottom: 10px;
}
.padding-bottom-0 {
  padding-bottom: 0;
}
.padding-top-0 {
  padding-top: 0;
}
</style>
