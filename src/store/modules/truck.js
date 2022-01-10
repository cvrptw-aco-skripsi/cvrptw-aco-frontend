export default {
  state: {
    truckCapacity: null,
    numberOfTrucks: null,
  },
  mutations: {
    SET_TRUCK_CAPACITY(state, truckCapacity) {
      state.truckCapacity = truckCapacity;
    },
    SET_NUMBER_OF_TRUCKS(state, numberOfTrucks) {
      state.numberOfTrucks = numberOfTrucks;
    },
  },
  actions: {
    setTruckCapacity({ commit }, truckCapacity) {
      commit("SET_TRUCK_CAPACITY", truckCapacity);
    },
    setNumberOfTrucks({ commit }, numberOfTrucks) {
      commit("SET_NUMBER_OF_TRUCKS", numberOfTrucks);
    },
  },
  getters: {
    truckCapacity: (state) => state.truckCapacity,
    numberOfTrucks: (state) => state.numberOfTrucks,
  },
};
