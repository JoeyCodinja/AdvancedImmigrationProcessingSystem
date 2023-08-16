import axios from 'axios'

export const state = () => ({
  entrants: [],
  currentEntrant: {},
  currentEntrantPreEval: {},
  currentEntrantHistory: [],
  currentEntrantAnsweredQuestions: [],
  currentEntrantOriginalSafetyRating: 0
})

export const getters = {
  getCurrentEntrant(state) {
    return state.currentEntrant
  },
  getCurrentEntrantHistory(state) {
    return state.currentEntrantHistory
  },
  getCurrentEntrantPreEval(state, getters) {
    let latestEntry = getters.getLatestEntry;
    if (Object.keys(latestEntry).length > 0){
      return latestEntry.preeval_checks;
    }
    return {}
  },
  getLatestEntry(state) {
    if (state.currentEntrantHistory.length > 0){
      return state.currentEntrantHistory[0];
    } else {
      return {}
    }
  },
  getCurrentEntrantSafetyRating(state, getters) {
    return getters['getLatestEntry']['safety_rating'];
  },
  getCurrentEntrantAnsweredQuestions(state) {
    return state.currentEntrantAnsweredQuestions;
  }
}

export const mutations = {
  setCurrentEntrantAndHistory(state, entrantWithHistory){
    state.currentEntrant = entrantWithHistory.entrant;
    state.currentEntrantHistory = entrantWithHistory.history;
  },
  setOriginalSafetyRating(state) {
    if (state.currentEntrant){
      state.currentEntrantOriginalSafetyRating = state.currentEntrantHistory[0].safety_rating;
    }
  },
  updateLatestEntrySafetyRating(state, newSafetyRating) {
    let latestEntryToUpdate = JSON.parse(JSON.stringify(state.currentEntrantHistory[0]));
    latestEntryToUpdate['safety_rating'] = newSafetyRating;
    state["currentEntrantHistory"][0] = latestEntryToUpdate;
    //Reactivity foolishiness
    state["currentEntrantHistory"] = JSON.parse(JSON.stringify(state['currentEntrantHistory']));
  },
  updateLatestEntryStatus(state, newStatus) {
    let latestEntryToUpdate = JSON.parse(JSON.stringify(state.currentEntrantHistory[0]));
    latestEntryToUpdate['status'] = newStatus;
    state["currentEntrantHistory"][0] = latestEntryToUpdate
    // Reactivity foolishness
    state["currentEntrantHistory"] = JSON.parse(JSON.stringify(state['currentEntrantHistory']))
  },
  addAnsweredQuestion(state, question){
    state.currentEntrantAnsweredQuestions.push(question);
  },
  setSafetyRatingToOriginal(state) {
    let latestEntry = JSON.parse(JSON.stringify(state.currentEntrantHistory[0]));
    latestEntry.safety_rating = state.currentEntrantOriginalSafetyRating;
    state.currentEntrantHistory[0] = latestEntry;
    state.currentEntrantHistory = JSON.parse(JSON.stringify(state.currentEntrantHistory));
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
          commit('setOriginalSafetyRating');
        }
      }).catch((error) => {
        console.log ("Something bad happened");
      });
    } catch (e) {
      console.log("Something bad happened");
    }
  }
}
