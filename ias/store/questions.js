import axios from 'axios'

export const state = () => ({
  questions: []
})

export const getters = {
  getAllQuestions(state) {
    return state.questions
  },
  getQuestionCount(state) {
    return state.questions.length;
  }
}

export const mutations = {
  addQuestion(state, question) {
    // Incomplete, needs to get value fo the question to be added
    state.questions.concat(question);
  },

  addQuestions(state, questions) {
    // Incomplete, needs to get value fo the question to be added
    state.questions = questions;
  }
}

export const actions = {
  async retrieveQuestions({commit}) {
    try{
      let questions = await axios.get("http://localhost:8080/api/questions").then((response) => {
        if (response.data){
          return response.data;
        }
      });
      commit('addQuestions', questions);
    } catch (e) {
      console.log("Something bad happened");
    }
  },
  async addNewQuestion({commit}, newQuestion) {
    try {
      await axios.post("http://localhost:8080/api/questions/new", newQuestion).then((response) => {
        if (response.status === 201 && response.data) {
          commit('addQuestion', newQuestion.data)
        }
      })
    } catch (e) {
      console.log("Something bad happened");
    }
  }
}
