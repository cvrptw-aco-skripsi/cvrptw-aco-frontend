<template>
  <div>
    <!-- <link href="https://cdn.jsdelivr.net/npm/jsxgraph@1.1.0/distrib/jsxgraph.css" rel="stylesheet" type="text/css" /> -->
    <div id="jxgbox" class="jxgbox"></div>
  </div>
</template>

<script>
export default {
  name: "Plane",
  data() {
    return {
      board: null,
      franchiseeNodeList: [],
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
        let franchisee = {
          x: coords.usrCoords[1].toFixed(2),
          y: coords.usrCoords[2].toFixed(2),
          timeWindowIndex: 0,
        };
        this.$root.$emit("addFranchisee", franchisee);
      }
    },
    createFranchiseeNode(id, x, y) {
      id = parseInt(id);
      x = parseFloat(x).toFixed(2);
      y = parseFloat(y).toFixed(2);
      let newFranchiseeNode = this.board.create("point", [x, y], {
        name: "Franchisee " + id,
        size: 5,
        color: "FF0000",
      });
      this.franchiseeNodeList.push(newFranchiseeNode);
    },
  },
  mounted() {
    this.board = window.JSXGraph.initBoard("jxgbox", {
      boundingbox: [-7, 5, 7, -5],
      axis: true,
    });

    // Create Franchisee Nodes
    for (const franchisee of this.franchiseeList) {
      this.createFranchiseeNode(franchisee.id, franchisee.x, franchisee.y);
    }

    this.board.create("point", [0, 0], { name: "Depot", fixed: true, face: "[]" });
    this.board.on("down", this.down);
  },
  watch: {
    franchiseeList: function (newFranchiseeList) {
      for (const franchisee of this.franchiseeNodeList) {
        this.board.removeObject(franchisee);
      }
      for (const franchisee of newFranchiseeList) {
        this.createFranchiseeNode(franchisee.id, franchisee.x, franchisee.y);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.jxgbox {
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  height: 500px;
}
</style>
