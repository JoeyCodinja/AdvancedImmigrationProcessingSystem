<template>
  <div class="flex flex-col">
    <div v-for="answeredQuestion in answeredQuestions">
      <div>
        <p>{{answeredQuestion.question}}</p>
        <p>{{answeredQuestion.response}}</p>
        <p>{{answeredQuestion.weight}}</p>
      </div>
    </div>
    <div v-if="answeredQuestions.length === 0" class="mx-auto">
      <p class="text-center">No interview questions answered for entrant</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    entrant: Object
  },
  computed: {
    answeredQuestions() {
      return this.$store.getters['entrants/getCurrentEntrantAnsweredQuestions'];
    }
  }
}
</script>

<style>

</style>
