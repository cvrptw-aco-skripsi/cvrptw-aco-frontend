export default {
  state: {
    franshiees: [],
  },
  mutations: {
    SET_FRANCHISEES(state, franshiees) {
      state.franshiees = franshiees.map((franchisee, index) => {
        franchisee.id = index;
        return franchisee;
      });
    },
  },
  actions: {
    setFranchisees({ commit }, franshiees) {
      commit("SET_FRANCHISEES", franshiees);
    },
  },
  getters: {
    franchisees: (state) => state.franshiees,
  },
};
