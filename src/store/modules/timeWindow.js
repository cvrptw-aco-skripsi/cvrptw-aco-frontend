export default {
  state: {
    timeWindows: [],
  },
  mutations: {
    SET_TIME_WINDOWS(state, timeWindows) {
      state.timeWindows = timeWindows.map((timeWindow, index) => {
        timeWindow.id = index;
        return timeWindow;
      });
    },
  },
  actions: {
    setTimeWindows({ commit }, timeWindows) {
      commit("SET_TIME_WINDOWS", timeWindows);
    },
  },
  getters: {
    timeWindows: (state) => state.timeWindows,
  },
};
