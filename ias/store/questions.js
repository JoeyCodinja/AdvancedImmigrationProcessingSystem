import axios from 'axios'

export const state = () => ({
  questions: [],
  interviewQuestions: [],
  preEvalQuestions: [],
  question: {}
})

export const getters = {
  getQuestion: (state) => (id) => {
    return state.questions.find((question) => {
      return question.id === id
    })
  },
  getSetQuestion(state) {
    return state.question;
  },
  getAllQuestions(state) {
    return state.questions
  },
  getQuestionCount(state) {
    return state.questions.length;
  },
  getAllInterviewQuestions(state) {
    return state.interviewQuestions;
  },
  getInterviewQuestionCount(state) {
    return state.interviewQuestions.length;
  },
  getPreEvalInterviewQuestions(state) {
    return state.preEvalQuestions;
  }
}

export const mutations = {
  sortInterviewQuestionsByWeightDesc(state) {
    state.interviewQuestions.sort((question1, question2) => {
      if (question1.weight < question2.weight){
        return 1
      } else if (question1.weight > question2.weight) {
        return -1
      } else {
        return 0
      }
    })
  },

  addQuestion(state, question) {
    // Incomplete, needs to get value fo the question to be added
    state.questions.concat(question);
  },

  setQuestion(state, question) {
    state.question = question;
  },

  addQuestions(state, questions) {
    // Incomplete, needs to get value fo the question to be added
    state.questions = questions;
  },

  updateQuestion(state, question) {
    let clonedQuestions = JSON.parse(JSON.stringify(state.questions));
    let updatedIndex = clonedQuestions.findIndex((clonedQuestion) => {
      return clonedQuestion.id == question.id
    })
    clonedQuestions.splice(updatedIndex, 1, question);
    state.questions = clonedQuestions;
  },

  removeQuestion(state, id) {
    let questionIndex = state.questions.findIndex((question) => {
      return question.id === id;
    });
    let updatedQuestions = JSON.parse(JSON.stringify(state.questions));
    updatedQuestions.splice(questionIndex, 1);
    state.questions = updatedQuestions;
  },

  addInterviewQuestions(state, questions) {
    state.interviewQuestions = questions
  },

  addInterviewQuestion(state, question) {
    state.interviewQuestions.push(question);
  },

  addPreEvalInterviewQuestions(state, questions){
    state.preEvalQuestions = questions;
  },

  removeInterviewQuestion(state, id) {
    let questionIndex = state.interviewQuestions.findIndex((question) => question.id === id);
    let interviewQuestionArrayToUpdate = JSON.parse(JSON.stringify(state.interviewQuestions));
    interviewQuestionArrayToUpdate.splice(questionIndex, 1);
    state.interviewQuestions = interviewQuestionArrayToUpdate;
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
  },
  async retrieveInterviewQuestion({commit, getters, rootGetters}, entrantId ){
    try {
      let generatedQuestions = []
      rootGetters['entrants/getCurrentEntrantAnsweredQuestions'].forEach((answeredQuestion) => {
        generatedQuestions.push(answeredQuestion.id);
      });
      getters.getAllInterviewQuestions.forEach((unansweredQuestion) => {
        generatedQuestions.push(unansweredQuestion.id);
      });
      let question = await axios.post(`http://localhost:8080/api/questions/interview/single/${entrantId}`, {'generatedQuestions': generatedQuestions}).then((response) => {
        if (response.status === 200) {
          commit("addInterviewQuestion", response.data);
          commit('sortInterviewQuestionsByWeightDesc');
        }
      }).catch((error) => {
        console.log("Something bad happened");
      })
    } catch (e) {
      console.log("Something bad happened");
    }
  },
  async retrieveInterviewQuestions({commit}, entrantId){
    try{
      await axios.post(`http://localhost:8080/api/questions/interview/${entrantId}`).then((response) => {
        if (response.status === 200){
          commit('addInterviewQuestions', response.data);
          commit('sortInterviewQuestionsByWeightDesc');
        }
      }).catch((error) => {
        console.log("Something bad happened");
      })
    } catch(e) {
      console.log("Something bad happened");
    }
  },
  async retrievePreEvalInterviewQuestions({commit}) {
    try{
      let questions = await axios.get('http://localhost:8080/api/questions/preeval').then((response) => {
        if (response.status == 200) {
          commit('addPreEvalInterviewQuestions', response.data);
        }
      }).catch((error) => {
        console.log("Something bad happened");
      })
    } catch (e) {
      console.log("Something bad happened");
    }
  },
  async updateQuestion({commit}, question) {
    try {
        await axios.put(`http://localhost:8080/api/questions/${question.id}`, question).then((response) => {
          if (response.status == 200) {
            commit('updateQuestion', question);
          }
        }).catch((error) => {
          console.log('Something bad happened');
        })
    } catch (e) {

    }
  },
  async deleteQuestion({commit}, id) {
    try{
      let questions = await axios.delete(`http://localhost:8080/api/questions/${id}`).then((response) => {
        if (response.status == 200){
          commit('removeQuestion', id);
        }
      })
    } catch (e) {
      console.log("Something bad happened");
    }
  },
  removeQuestion({commit}, questionId) {
    commit('removeInterviewQuestion', questionId);
    commit('sortInterviewQuestionsByWeightDesc');
  },
  setQuestion({commit, getters}, questionId) {
    commit('setQuestion', getters.getQuestion(questionId));
  }
}
