<template>
  <BasePage title="Question Management - Edit">
    <form class="flex flex-col">
      <label for="question">Question</label>
      <input name="question" type="text" v-model="question"/>
      <label for="weight">Weight</label>
      <input name="weight" type="number" v-model="weight"/>
      <label for="category">Category</label>
      <select name="category" v-model="category">
        <option v-for="category in categories"
                :value="category.slug"
                :selected="question.category == category.slug">
          {{ category.name }}
        </option>
      </select>
      <!-- Space for a plus icon for adding categories.js -->
      <input name="new-category" type="text" hidden="true">
      <input name="new-category-slug" type="text" hidden="true">
      <input type="submit" v-on:click="updateQuestion">
    </form>
  </BasePage>
</template>

<script>
export default {
  data() {
    return {
      question: "",
      category: "",
      weight: ""
    }
  },
  computed: {
    questionToBeUpdated() {
      return this.$store.getters['questions/getSetQuestion'];
    },
    categories() {
      return this.$store.getters['categories/getAllCategories'];
    }
  },
  methods: {
    async updateQuestion(e){
      e.preventDefault();
      let questionFormat = JSON.parse(JSON.stringify(this.questionToBeUpdated));
      questionFormat.question = this.question;
      questionFormat.category = this.category;
      questionFormat.weight = this.weight;
      await this.$store.dispatch('questions/updateQuestion', questionFormat);
      await this.$router.push({path: '/admin/question-management/', replace:true})
    }
  },
  beforeMount() {
    this.$store.dispatch('categories/retrieveCategories');
    this.question = this.questionToBeUpdated.question;
    this.category = this.questionToBeUpdated.category;
    this.weight = this.questionToBeUpdated.weight;
  }
}
</script>
