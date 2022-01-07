<template>
  <v-card class="outer-card">
    <v-tabs v-model="activeTab" centered background-color="teal lighten-5" color="blue-grey darken-3">
      <v-tab class="tab-max-width" v-for="tab in tabs" :key="tab.id">{{ tab.name }}</v-tab>
    </v-tabs>
    <v-tabs-items v-model="activeTab">
      <v-tab-item>
        <CreateFranchisee />
        <FranchiseeList />
      </v-tab-item>
      <v-tab-item>
        <CreateTimeWindow />
        <TimeWindowList />
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import CreateFranchisee from "@/components/CreateFranchisee.vue";
import CreateTimeWindow from "@/components/CreateTimeWindow.vue";
import FranchiseeList from "@/components/FranchiseeList.vue";
import TimeWindowList from "@/components/TimeWindowList.vue";

export default {
  name: "Tabs",
  components: {
    CreateFranchisee,
    CreateTimeWindow,
    FranchiseeList,
    TimeWindowList,
  },
  props: {},
  data() {
    return {
      activeTab: 0,
      tabs: [
        { id: 1, name: "Franchisees" },
        { id: 0, name: "Time Windows" },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
.tab-max-width {
  width: 100%;
}
</style>
