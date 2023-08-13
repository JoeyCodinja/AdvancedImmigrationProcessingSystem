<template>
  <BasePage title="Business Rule - New">
    <form class="flex flex-col" >
      <label for="question">Question</label>
      <input v-model="question" name="question" type="text"/>
      <label for="weight">Weight</label>
      <input v-model="weight" name="weight" type="number"/>
      <label for="category">Category</label>
      <select v-model="category" name="category">
        <option v-for="category in categories" :value="category.slug">{{ category.name }}</option>
      </select>
      <!-- Space for a plus icon for adding categories.js -->
      <input name="new-category" type="text" hidden="true">
      <input name="new-category-slug" type="text" hidden="true">
      <input type="submit" v-on:click="createQuestion">
    </form>
  </BasePage>
</template>

<script>
export default {
  data() {
    return {
      question: "",
      category: "",
      weight: 0,
    }
  },
  computed: {
    categories() {
      return this.$store.getters['categories/getAllCategories'];
    }
  },
  methods: {
    async createQuestion(e){
      e.preventDefault();
      let newQuestion = {
        "question": this.question,
        "weight": this.weight,
        "category": this.category,
        "id": Math.floor(Math.random()*10000000000),
        "interview_question": false,
        "canned_question": false
      }
      await this.$store.dispatch('questions/addNewQuestion', newQuestion)
      this.$router.push({path: '/admin/question-management/', replace: true})
    }
  },
  beforeMount() {
    this.$store.dispatch('categories/retrieveCategories');
  }
}
</script>

<style>

</style>

