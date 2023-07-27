import axios from 'axios'

export const state = () => ({
  categories: []
})

export const getters = {
  getAllCategories(state) {
    return state.categories
  },
  getCategoryCount(state) {
    return state.categories.length;
  }
}

export const mutations = {
  addCategory(state, category) {
    state.categories.concat(category);
  },
  addCategories(state, categories) {
    state.categories = categories;
  }
}

export const actions = {
  async retrieveCategories({commit}) {
    try {
      let categories = await axios.get('http://localhost:8080/api/categories').then((response) => {
        if (response.data) {
          return response.data;
        }
      });
      commit('addCategories', categories);
    } catch (e) {
      console.log("Something bad happened");
    }
  }
}
