<template>
  <BasePage title="Case - Review">
    <div class="flex flex-col flex-wrap flex-1">
      <div class="flex flex-row">
        <img src="/entrant-headshot.png">
        <div class="">
          <p class="text-xl">Safety Rating: <span class="good-risk">98</span></p>
          <p class="text-xl">First Name: <span class="font-bold">Derek</span></p>
          <p class="text-xl">Last Name: <span class="font-bold">Jeter</span></p>
          <p class="text-xl">Arriving From: <span class="font-bold">MIA</span></p>
          <p class="text-xl">Nationality: <span class="font-bold">Jamaican</span></p>
          <p class="text-xl">Status: <span class="font-bold">Pending</span></p>
        </div>
      </div>
      <div class="flex flex-col">
        <div class="flex flex-row">
          <p class="flex flex-1 bottom-border text-center text-2xl font-bold right-border tab-padding" v-on:click="toggle('overview')">Overview</p>
          <p class="flex flex-1 bottom-border text-center text-2xl font-bold tab-padding" v-on:click="toggle('travel_history')">Travel History</p>
        </div>
        <div v-show="show_overview">
          <EntrantOverview v-bind:entrant="entrant"/>
        </div>
        <div v-show="show_travel_history">
          <EntrantHistory v-bind:history="entrantHistory"/>
        </div>
      </div>

    </div>
    <div class="flex flex-col flex-1">
      <p class="text-5xl">Interview Questions</p>
      <div class="bottom-border mt-3" v-for="question of interviewQuestions">
        <p class="text-2xl">{{ question.question }}</p>
        <div v-if="question.canned_response">
          Buttons
        </div>
        <div v-else>
          <textarea type="text"/>
        </div>
        <div class="question">
          <button>Acceptable</button>
          <button>Unacceptable</button>
          <button>Skip</button>
        </div>
      </div>
    </div>


  </BasePage>
</template>

<script>
export default{
  data() {
    return {
      show_overview: true,
      show_travel_history: false,
    }
  },
  computed: {
    entrant() {
      return this.$store.getters['entrants/getCurrentEntrant'];
    },
    entrantHistory() {
      return this.$store.getters['entrants/getCurrentEntrantHistory'];
    },
    interviewQuestions() {
      return this.$store.getters['questions/getAllInterviewQuestions'];
    }
  },
  methods: {
    toggle(panel){
      switch(panel){
        case 'overview':
          this.$data.show_overview=true;
          this.$data.show_travel_history=false;
          break;
        case 'travel_history':
          this.$data.show_overview=false;
          this.$data.show_travel_history=true;
          break;
        case 'interview_questions':
          this.$data.show_overview=false;
          this.$data.show_travel_history=false;
          break;
        default:
          break;
      }
    },
  },
  beforeMount() {
    this.$store.dispatch('entrants/findEntrant', "F77698918");
  },
  mounted() {
    this.$store.dispatch('questions/retrieveInterviewQuestions', this.entrant.id);
  }
}
</script>

<style>
.bottom-border {
  border-bottom: 2px black solid;
}

.right-border {
  border-right: 2px black solid;
}

.tab-padding {
  padding-left:2rem;
}
</style>
