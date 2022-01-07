<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" md="5"> <Tabs /></v-col>
        <v-col cols="12" md="7"> <Plane /></v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Plane from "@/components/Plane.vue";
import Tabs from "@/components/Tabs.vue";

export default {
  name: "Home",
  components: {
    Plane,
    Tabs,
  },
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 1400px !important;
}
</style>
