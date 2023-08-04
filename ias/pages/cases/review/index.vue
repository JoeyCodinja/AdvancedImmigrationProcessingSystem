<template>
  <BasePage title="Case - Review">
    <div class="flex flex-col">
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
          <p class="mx-auto" v-on:click="toggle('overview')">Overview</p>
          <p class="mx-auto" v-on:click="toggle('travel_history')">Travel History</p>
          <p class="mx-auto" v-on:click="toggle('interview_questions')">Interview Questions</p>
        </div>
        <div v-show="show_overview">
          <EntrantOverview v-bind:entrant="entrant"/>
        </div>
        <div v-show="show_travel_history">
          <EntrantHistory v-bind:history="entrantHistory"/>
        </div>
        <div v-show="show_interview_questions"> Interview Questions </div>
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
      show_interview_questions: false,
    }
  },
  computed: {
    entrant() {
      return this.$store.getters['entrants/getCurrentEntrant'];
    },
    entrantHistory() {
      return this.$store.getters['entrants/getCurrentEntrantHistory'];
    }
  },
  methods: {
    toggle(panel){
      switch(panel){
        case 'overview':
          this.$data.show_interview_questions=false;
          this.$data.show_overview=true;
          this.$data.show_travel_history=false;
          break;
        case 'travel_history':
          this.$data.show_interview_questions=false;
          this.$data.show_overview=false;
          this.$data.show_travel_history=true;
          break;
        case 'interview_questions':
          this.$data.show_interview_questions=true;
          this.$data.show_overview=false;
          this.$data.show_travel_history=false;
          break;
        default:
          break;
      }
    },
  },
  beforeMount() {
    this.$store.dispatch('entrants/findEntrant', "F77698918")
  }
}
</script>
