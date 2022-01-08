<template>
  <v-card class="truck-card">
    <v-row>
      <v-col cols="7">
        <div>
          <v-row>
            <v-col cols="7" class="vertical-center padding-bottom-0">
              <p>Truck capacity (homogeneous)</p>
            </v-col>
            <v-col cols="5" class="padding-bottom-0">
              <v-text-field v-model="truckCapacity" type="number"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="7" class="vertical-center padding-top-0">
              <p>Number of trucks</p>
            </v-col>
            <v-col cols="5" class="padding-top-0">
              <v-text-field v-model="numberOfTrucks" type="number"></v-text-field>
            </v-col>
          </v-row>
        </div>
      </v-col>
      <v-col cols="5">
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
            <v-btn color="green darken-1 white--text" :disabled="!isValid()" @click="calculateUsingACO()"
              >Calculate using ACO</v-btn
            >
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
      truckCapacity: 10,
      numberOfTrucks: 10,
    };
  },
  computed: {
    timeWindowList() {
      return this.$store.getters.timeWindows;
    },
    franchiseeList() {
      return this.$store.getters.franchisees;
    },
  },
  methods: {
    calculateUsingACO() {
      let timeWindowList = this.timeWindowList.map((timeWindow) => {
        timeWindow.startTime = timeWindow.startTime.replace(".", ":");
        timeWindow.endTime = timeWindow.endTime.replace(".", ":");
        return timeWindow;
      });

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
          console.log(res.data.data);
          this.$root.$emit("apiResponse", res.data.data);
          this.resetInput();
        })
        .catch((err) => {
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
