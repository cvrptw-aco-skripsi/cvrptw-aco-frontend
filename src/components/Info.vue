<template>
  <v-alert v-model="alert" dismissible color="#F8F1AE" border="left" elevation="2" width="560">
    <h3>Info</h3>
    <ul>
      <li>1 Cartesian coordinate unit = <strong>1 km</strong></li>
      <li>α = <strong>2.0</strong>, β = <strong>1.0</strong>, ρ = <strong>.05</strong></li>
      <li>Max iteration (while more optimal solution not found) = <strong>150</strong></li>
    </ul>
  </v-alert>
</template>

<script>
export default {
  name: "Info",
};
</script>

<style scoped lang="scss">
li {
  font-size: 14px;
}
.v-alert {
  padding: 5px 16px;
  position: fixed;
  bottom: 0;
}
</style>
