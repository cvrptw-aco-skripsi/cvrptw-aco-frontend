<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" md="5"> <Tabs /></v-col>
        <v-col cols="12" md="7">
          <v-row>
            <v-col cols="12">
              <Truck />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <Plane />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <Routes />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Plane from "@/components/Plane.vue";
import Tabs from "@/components/Tabs.vue";
import Truck from "@/components/Truck.vue";
import Routes from "@/components/Routes.vue";

export default {
  name: "Home",
  components: {
    Plane,
    Tabs,
    Truck,
    Routes,
  },
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 1400px !important;
}
</style>
