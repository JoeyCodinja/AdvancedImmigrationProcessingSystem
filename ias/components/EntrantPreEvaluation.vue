<template>
  <div>
    <p>Pre-Evaluated Questions</p>
    <hr>
    <div class="questions-box" v-for="preEvalQuestion in pre_eval_questions">
      <div class="flex flex-row">
        <p class="text-base basis-20 flex-2 font-semibold border-b pb-3">
          {{preEvalQuestion.question}}
        </p>
      </div>
      <div class="mt-4">
        <p class="font-bold">Response</p>
        <p class="font-semibold"
           v-if="Object.keys(preeval_value_map)[0] == preEvalQuestion.id">
          {{preeval_values[preeval_value_map[preEvalQuestion.id]] ? "Yes" : "No"}}
        </p>
        <p class="font-semibold"
             v-if="Object.keys(preeval_value_map)[1] == preEvalQuestion.id">
            {{preeval_values[preeval_value_map[preEvalQuestion.id]] ? "Yes" : "No"}}
          </p>
        <p class="font-semibold"
             v-if="Object.keys(preeval_value_map)[2] == preEvalQuestion.id">
            {{preeval_values[preeval_value_map[preEvalQuestion.id]] ? "Yes" : "No" }}
          </p>
        <p class="font-semibold"
             v-if="Object.keys(preeval_value_map)[3] == preEvalQuestion.id">
            {{preeval_values[preeval_value_map[preEvalQuestion.id]] ? "Yes" : "No"}}
        </p>
        <p class="font-semibold"
           v-if="Object.keys(preeval_value_map)[4] == preEvalQuestion.id">
          {{preeval_values[preeval_value_map[preEvalQuestion.id]] ? "Yes" : "No"}}
        </p>
      </div>
      <div class="text-right mt-auto">
        <button class="rounded-2xl border bg-yellow-300 px-3 py-1 text-xs font-bold">
          Weight: {{preEvalQuestion.weight}}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      preeval_value_map: {
        7338974730: 'interpol_watchlist_hit',
        1393655088: 'local_crime_database',
        1827493059: '',
        4128868394: 'passport_valid',
        6391991544: 'visa_valid',
      }
    }
  },
  props: {

  },
  computed: {
    preeval_values() {
      return this.$store.getters['entrants/getCurrentEntrantPreEval']
    },
    pre_eval_questions() {
      return this.$store.getters['questions/getPreEvalInterviewQuestions'];
    },
    safety_rating() {
      return this.$store.getters['entrants/getCurrentEntrantSafetyRating'];
    }
  },
  methods: {

  },
  beforeMount() {
    this.$store.dispatch('questions/retrievePreEvalInterviewQuestions').then(() => {
      //Add all pre-eval weights to score by default;
      for (let question of this.pre_eval_questions) {
        this.$store.commit("entrants/updateLatestEntrySafetyRating", this.safety_rating + question.weight);
      }
    });
  },
  mounted() {
    //calculate the new safety rating based on the pre_evaluation
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
