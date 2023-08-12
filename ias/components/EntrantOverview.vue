<template>
  <div class="flex flex-col">
    <div v-for="answeredQuestion in answeredQuestions" class="questions-box">
      <div class="flex flex-row">
        <p class="text-base basis-20 flex-2 font-semibold border-b pb-5 mt-5">{{ answeredQuestion.question }}</p>
      </div>
      <div class="mt-4">
        <p class="font-bold">Response</p>
        <p class="font-semibold">{{ answeredQuestion.response }}</p>
      </div>
      <div class="text-right mt-auto">
        <button class="rounded-2xl border bg-yellow-300 px-3 py-1 text-xs font-bold">
          Weight: {{ answeredQuestion.weight }}
        </button>
      </div>
    </div>
    <div v-if="answeredQuestions.length === 0" class="mx-auto">
      <p class="text-center font-bold">No interview questions answered for entrant</p>
    </div>
    <EntrantPreEvaluation/>
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

<style scoped>
.questions-box {
  margin: 0 auto;
  margin-top: 1.5rem;
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.35);
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
}

.questions-box p {
  margin: 0;
  padding: 0;
}

.questions-box .border-b {
  border-bottom: 1px solid #ccc;
  padding-bottom: 0.5rem; /* Add padding to increase space */
}

.questions-box button {
  margin-top: 0.5rem;
}
</style>
