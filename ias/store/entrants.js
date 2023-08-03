import axios from 'axios'

export const state = () => ({
  entrants: [],
  currentEntrant: {},
  currentEntrantHistory: {},
})

export const getters = {
  getCurrentEntrant(state) {
    return state.currentEntrant
  },
  getCurrentEntrantHistory(state) {
    return state.currentEntrantHistory
  }
}

export const mutations = {
  setCurrentEntrantAndHistory(state, entrantWithHistory){
    state.currentEntrant = entrantWithHistory.entrant;
    state.currentEntrantHistory = entrantWithHistory.history;
  }
}

export const actions = {
  async findEntrant({commit}, passport_number) {
    try {
      await axios.post('http://localhost:8080/api/entrants/find', {
        'passport_number': passport_number
      }).then((response) => {
        if (response.data){
          commit('setCurrentEntrantAndHistory', response.data)
        }
      }).catch((error) => {
        console.log ("Something bad happened");
      });
    } catch (e) {
      console.log("Something bad happened");
    }
  }
}
