import axios from 'axios';

export const state = () => ({
  cases: []
})

export const getters = {
  getAllCases(state) {
    return state.cases
  },
  getCaseCount(state) {
    return state.cases.length;
  }
}

export const mutations = {
  addCase(state, entry_case) {
    state.cases.push(entry_case);
  },
  addCases(state, cases) {
    state.cases.concat(cases);
  }
}

export const actions = {
  async retrieveCases({commit}) {
    try{
      let cases = await axios.get('http://localhost:8080/api/cases/')
        .then((response) => {
          if (response.data) {
            commit('addCases', response.data);
          } else {
            throw new Error(`Data returned was unexpected: ${response.data}`);
          }
      })
    } catch (e) {
      console.log(e);
    }
  }
}
