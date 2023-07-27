<template>
  <BasePage>
    <div class="flex flex-col">
      <p class="font-extrabold text-5xl">Question Management</p>
      <p> Add New Question</p>
      <router-link to="/admin/question-management/ai-generation">Generate New Questions</router-link>
      <div class="box w-1/2" v-for="question in questions">
        <p>{{ question.question }}<br></p>
        <p>Category: {{ categoryNameFromSlug(question.category)}}</p>
        <p>Weight: {{question.weight}}<p/>
        <div class="flex flex-row gap-8">
          <router-link to="/admin/question-management/edit" class="blue-btn flex-1">Edit</router-link>
          <p class="red-btn flex-1">Delete</p>
        </div>
      </div>
    </div>
  </BasePage>
</template>

<script>
export default  {
  methods: {
    categoryNameFromSlug(slug) {
      let categoryName = this.$store.getters['categories/getAllCategories'].find((category) => {
        return category.slug === slug;
      })
      if (categoryName === undefined) {
        return "Unknown Category"
      }
      return categoryName.name;
    }
  },
  computed: {
    questions() {
      return this.$store.getters['questions/getAllQuestions'];
    }
  },
  beforeMount() {
    this.$store.dispatch('questions/retrieveQuestions');
    this.$store.dispatch('categories/retrieveCategories');
  }
}
</script>

<style>
.box > *{
  margin-bottom: 0.75em;
}
</style>
