import axios from 'axios'

export const state = () => ({
  prompts: []
})

export const getters = {
  getAllPrompts(state) {
    return state.prompts;
  },
  getPromptCount(state) {
    return state.prompts.length;
  }
}

export const mutations = {
  addPrompt(state, prompt) {
    state.prompts.concat(prompt);
  },
  addPrompts(state, prompts) {
    state.prompts = prompts
  }
}

export const actions = {
  async retrievePrompts({commit}) {
    try {
      let prompts = await axios.get('http://localhost:8080/api/prompts').then((response) => {
        if (response.data) {
          return response.data;
        }
      });
      commit('addPrompts', prompts);
    } catch (e) {
      console.log("Something bad happened");
    }
  }
}
