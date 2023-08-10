import axios from 'axios'

export const state = () => ({
  entrants: [],
  currentEntrant: {},
  currentEntrantHistory: [],
})

export const getters = {
  getCurrentEntrant(state) {
    return state.currentEntrant
  },
  getCurrentEntrantHistory(state) {
    return state.currentEntrantHistory
  },
  getLatestEntry(state) {
    if (state.currentEntrantHistory.length > 0){
      return state.currentEntrantHistory[0];
    } else {
      return {}
    }
  },
  getSafetyRating({state, store}) {
    if (state.currentEntrantHistory){
      debugger;
      return store.getters.getLatestEntry(state).safety_rating;
    } else {
      return 0;
    }
  }
}

export const mutations = {
  setCurrentEntrantAndHistory(state, entrantWithHistory){
    state.currentEntrant = entrantWithHistory.entrant;
    state.currentEntrantHistory = entrantWithHistory.history;
  },
  updateLatestEntrySafetyRating(state, newSafetyRating) {
    let latestEntryToUpdate = JSON.parse(JSON.stringify(state.currentEntrantHistory[0]));
    latestEntryToUpdate['safety_rating'] = newSafetyRating;
    state["currentEntrantHistory"][0] = latestEntryToUpdate;
    //Reactivity foolishiness
    state["currentEntrantHistory"] = JSON.parse(JSON.stringify(state['currentEntrantHistory']));
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
