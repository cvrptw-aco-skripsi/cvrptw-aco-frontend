<template>
  <div>
    <!-- <link
      rel="stylesheet"
      type="text/css"
      href="https://cdn.jsdelivr.net/npm/jsxgraph@1.4.0/distrib/jsxgraph.css"
    /> -->
    <link
      href="https://cdn.jsdelivr.net/npm/jsxgraph@1.1.0/distrib/jsxgraph.css"
      rel="stylesheet"
      type="text/css"
    />
    <!-- The next line is optional: MathJax -->

    <div id="jxgbox" class="jxgbox"></div>
  </div>
</template>

<script>
export default {
  name: "Plane",
  props: {},
  data() {
    return {
      board: null,
    };
  },
  methods: {
    getMouseCoords(e, i) {
      var cPos = this.board.getCoordsTopLeftCorner(e, i),
        absPos = window.JXG.getPosition(e, i),
        dx = absPos[0] - cPos[0],
        dy = absPos[1] - cPos[1];

      return new window.JXG.Coords(window.JXG.COORDS_BY_SCREEN, [dx, dy], this.board);
    },
    down(e) {
      var canCreate = true,
        i,
        coords,
        el;

      if (e[window.JXG.touchProperty]) {
        // index of the finger that is used to extract the coordinates
        i = 0;
      }
      coords = this.getMouseCoords(e, i);

      for (el in this.board.objects) {
        if (
          window.JXG.isPoint(this.board.objects[el]) &&
          this.board.objects[el].hasPoint(coords.scrCoords[1], coords.scrCoords[2])
        ) {
          canCreate = false;
          break;
        }
      }

      if (canCreate) {
        this.board.create("point", [coords.usrCoords[1], coords.usrCoords[2]]);
      }
    },
  },
  mounted() {
    this.board = window.JSXGraph.initBoard("jxgbox", {
      boundingbox: [-5, 5, 5, -5],
      axis: true,
    });
    this.board.create("point", [-2, -1], {
      name: "first",
      size: 5,
      color: "FF0000",
    });
    this.board.create("point", [3, 1], { name: "last", fixed: true, face: "[]" });
    this.board.on("down", this.down);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.jxgbox {
  margin-left: auto;
  margin-right: auto;
  width: 500px;
  height: 500px;
}
</style>
