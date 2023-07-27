<template>
  <BasePage>
    <div class="flex flex-col">
      <p class="font-extrabold text-5xl"> Question Management - AI Generation</p>
      <button v-on:click="populatePrompts">Generate new Questions</button>
      <div v-show="show_prompts">
        <div class="box w-1/2" v-for="prompt in prompts">
          <p>{{prompt.prompt}}</p>
          <button v-on:click="generateQuestions(prompt.prompt)">Use</button>
        </div>
      </div>
      <div v-show="questions_generated">
        <div class="box w-1/2" v-for="question in generated_questions">
          <p>{{question}}</p>
          <button v-on:click="addNewQuestion(question)">Add Question</button>
        </div>
      </div>
    </div>
  </BasePage>
</template>

<script>
import axios from "axios";

export default{
  data() {
    return {
      "questions_generated": false,
      "show_prompts": false,
      "generated_questions": []
    }
  },
  computed: {
    prompts() {
      return this.$store.getters['prompts/getAllPrompts']
    }
  },
  methods: {
    async populatePrompts() {
      await this.$store.dispatch('prompts/retrievePrompts')
      this.$data.show_prompts = true;
    },
    parseQuestions(questionsString) {
      let question_regex = /(?<=\d\.)[\w*\s*]*\?/g;
      let questionsIterator = questionsString.matchAll(question_regex);
      let questionsToReturn = [];
      for (let question of questionsIterator) {
        debugger;
        questionsToReturn.push(question[0]);
      }
      return questionsToReturn;
    },
    async generateQuestions(prompt) {
      let component= this
      await axios.post("http://localhost:8080/api/prompt-chatgpt", {
        content: prompt
      }).then((response) => {
        component.$data.generated_questions = component.parseQuestions(response.data.choices[0]['message']['content']);
        component.$data.show_prompts = false;
        component.$data.questions_generated = true;
      })
    },
    async addNewQuestion(question) {
      let questionObject = {
        "question": question,
        "weight": 99,
        "category": "",
        "id": Math.random() * (9999999999 - 1000000000) + 1000000000
      }
      await this.$store.dispatch('questions/addNewQuestion', questionObject);
    }
  },
  beforeUnmount() {
    this.$data.questions_generated = false;
    this.$data.show_prompts= false;
    this.$data.generated_questions = []
  }
}
</script>
