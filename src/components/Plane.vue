<template>
  <div>
    <div id="jxgbox" class="jxgbox"></div>
  </div>
</template>

<script>
export default {
  name: "Plane",
  data() {
    return {
      board: null,
      depot: null,
      franchiseeNodeList: [],
      lineList: [],
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
          demand: 1,
          timeWindowIndex: 0,
        };
        this.$root.$emit("addFranchisee", franchisee);
      }
    },
    createFranchiseeNode(id, x, y) {
      id = parseInt(id);
      const xPos = parseFloat(x).toFixed(2);
      const yPos = parseFloat(y).toFixed(2);
      let newFranchiseeNode = this.board.create("point", [xPos, yPos], {
        name: "Franchisee " + id,
        size: 3,
        color: "FF0000",
      });
      this.franchiseeNodeList.push(newFranchiseeNode);
    },
    drawLine(franchisee1, franchisee2, color) {
      let newLine = this.board.create("line", [franchisee1, franchisee2], {
        straightFirst: false,
        straightLast: false,
        strokeColor: color,
      });
      this.lineList.push(newLine);
    },
    generateRandomHexColorCode() {
      let n = (Math.random() * 0xfffff * 1000000).toString(16);
      return "#" + n.slice(0, 6);
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

    this.depot = this.board.create("point", [0, 0], { name: "Depot", fixed: true, face: "[]" });
    this.board.on("down", this.down);
  },
  created() {
    this.$root.$on("apiResponse", (data) => {
      if (!data.solution?.includes("NOT_FOUND")) {
        const vehicles = data.vehicles;
        for (const vehicle of vehicles) {
          const color = this.generateRandomHexColorCode();
          const nodeList = vehicle.nodes;
          let sourceNode;
          let targetNode;
          for (let index = 1; index < nodeList.length; index++) {
            if (nodeList[index - 1].id == 0) {
              sourceNode = this.depot;
            } else {
              sourceNode = this.franchiseeNodeList[nodeList[index - 1].id - 1];
            }
            if (nodeList[index].id == 0) {
              targetNode = this.depot;
            } else {
              targetNode = this.franchiseeNodeList[nodeList[index].id - 1];
            }
            this.drawLine(sourceNode, targetNode, color);
          }
        }
      }
    });
  },
  watch: {
    franchiseeList: function (newFranchiseeList) {
      for (const franchisee of this.franchiseeNodeList) {
        this.board.removeObject(franchisee);
      }
      this.franchiseeNodeList = [];
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
