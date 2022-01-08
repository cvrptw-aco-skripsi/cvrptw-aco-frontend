module.exports = {
  configureWebpack: {
    // other webpack options to merge in ...
  },
  // devServer Options don't belong into `configureWebpack`
  devServer: {
    port: 8080,
    proxy: "http://localhost:8081",
  },
};
