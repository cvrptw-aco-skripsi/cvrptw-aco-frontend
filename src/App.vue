<template>
  <div id="app">
    <v-app>
      <router-view />
    </v-app>
  </div>
</template>

<style lang="scss">
#app {
  font-family: "Montserrat", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.inner-card {
  margin: 20px;
  padding: 10px 20px;
}
.vertical-center {
  display: flex;
  align-items: center;
}
</style>
