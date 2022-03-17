<template>
  <div id="generated-routes">
    <v-card v-show="!apiError && !!numberOfUsedVehicle" id="routes-card" color="#ddedea">
      <h2>Generated Routes</h2>
      <p>Number of used trucks: &emsp; {{ numberOfUsedVehicle }}</p>
      <p>Total distance: &emsp;&emsp;&emsp;&emsp;&emsp; {{ totalDistance.toFixed(2) }} km</p>
      <v-list two-line color="#e9f7f5">
        <div v-for="(vehicle, index) in vehicles" :key="index">
          <v-divider v-if="index !== 0" :key="index"></v-divider>
          <v-list-item>
            <div>
              <h3>Truck {{ index + 1 }}</h3>
              <v-icon size="20" class="truck-color-icon pb-1 pl-2">mdi-circle</v-icon>
              <p>Routes: {{ getNodesInString(vehicle.nodes) }}</p>
              <p>Arrival Times: {{ getArrivalTimesInString(vehicle.arrivalTimes) }}</p>
            </div>
          </v-list-item>
        </div>
      </v-list>
    </v-card>
    <v-alert v-show="apiError" type="error"> Solution not found after 100 iterations with same result. </v-alert>
  </div>
</template>

<script>
export default {
  name: "Routes",
  props: {},
  data() {
    return {
      numberOfUsedVehicle: null,
      totalDistance: null,
      vehicles: null,
      apiError: false,
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
    getNodesInString(nodeList) {
      let result = "";
      for (const node of nodeList) {
        if (node.id - 1 === -1) {
          result += `depot (${node.x}, ${node.y}) → `;
        } else {
          result += `franchisee ${node.id - 1} (${node.x}, ${node.y}) → `;
        }
      }
      return result.substring(0, result.length - 2);
    },
    getArrivalTimesInString(arrivalTimeList) {
      let result = "";
      for (const arrivalTime of arrivalTimeList) {
        result += `${arrivalTime.substring(0, arrivalTime.length - 3)} → `;
      }
      return result.substring(0, result.length - 2);
    },
    scrollDownToPageBottom() {
      setTimeout(() => {
        document.querySelector("#generated-routes").scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    },
  },
  created() {
    this.$root.$on("apiResponse", (data) => {
      if (data.solution?.includes("NOT_FOUND")) {
        this.apiError = true;
      } else {
        this.numberOfUsedVehicle = data.numberOfUsedVehicle;
        this.totalDistance = data.totalDistance;
        this.vehicles = data.vehicles;
        this.apiError = false;
      }
    });
  },
  watch: {
    vehicles: function () {
      this.scrollDownToPageBottom();
    },
    apiError: function (newValue, oldValue) {
      if (oldValue == false && newValue == true) {
        this.scrollDownToPageBottom();
      }
    },
  },
};
</script>

<style scoped lang="scss">
h3 {
  display: inline;
}
h2,
p {
  margin-bottom: 8px !important;
}
hr {
  margin-bottom: 10px;
}
#routes-card {
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
