<template>
  <BasePage title="Case - Review">
    <div class="flex flex-col flex-wrap flex-1">
      <div class="flex flex-row">
        <img src="/entrant-headshot.png">
        <div class="flex flex-wrap">
          <p class="flex-1 entrant-details text-3xl">Safety Rating:
            <span class="good-risk"
                  v-bind:class="safety_rating_style(safety_rating)">
              {{ safety_rating }}
            </span>
          </p>
          <p class="flex-1 entrant-details text-3xl">{{entrant.first_name}} {{entrant.last_name}}</p>
          <p class="flex-1 entrant-details text-xl">Arriving From: <span class="font-bold">MIA</span></p>
          <p class="flex-1 entrant-details text-xl">Nationality: <span class="font-bold">Jamaican</span></p>
          <p class="flex-1 entrant-details text-xl">Status: <span class="font-bold">Pending</span></p>
        </div>
      </div>
      <div class="flex flex-col">
        <div class="flex flex-row">
          <p class="flex flex-1 bottom-border
                    text-center text-2xl font-bold
                    right-border tab-padding"
             v-on:click="toggle('overview')">Overview</p>
          <p class="flex flex-1 bottom-border
                    text-center text-2xl font-bold
                    tab-padding"
             v-on:click="toggle('travel_history')">Travel History</p>
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
        <textarea v-if="!question.canned_response"/>
        <div v-else>
          <button>Yes</button>
          <button>No</button>
        </div>
        <div class="question">
          <button v-on:click="changeSafetyRating(question.weight, true)">
            Acceptable
          </button>
          <button v-on:click="changeSafetyRating(question.weight, false)">
            Unacceptable
          </button>
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
      return this.$store.getters['entrants/getCurrentEntrantHistory'].slice(1);
    },
    interviewQuestions() {
      return this.$store.getters['questions/getAllInterviewQuestions'];
    },
    latestEntrantHistory() {
      return this.$store.getters['entrants/getLatestEntry'];
    },
    safety_rating: {
      get() {
        return this.$store.getters['entrants/getLatestEntry'].safety_rating;
      },
      set(new_safety_rating) {
        this.$store.commit('entrants/updateLatestEntrySafetyRating', new_safety_rating);
      }
    }
  },
  methods: {
    toggle(panel) {
      switch (panel) {
        case 'overview':
          this.$data.show_overview = true;
          this.$data.show_travel_history = false;
          break;
        case 'travel_history':
          this.$data.show_overview = false;
          this.$data.show_travel_history = true;
          break;
        case 'interview_questions':
          this.$data.show_overview = false;
          this.$data.show_travel_history = false;
          break;
        default:
          break;
      }
    },
    changeSafetyRating(weight, add) {
      if (add) {
        this.safety_rating += weight
      } else {
        this.safety_rating -= weight
      }
    },
    safety_rating_style(safetyRatingValue) {
      let safety_rating_class = ""
      if (safetyRatingValue > 0 && safetyRatingValue <= 25) {
        safety_rating_class = 'bad-risk';
      }
      else if (safetyRatingValue >= 26 && safetyRatingValue <= 50) {
        safety_rating_class = 'tentative-risk';
      }
      else if (safetyRatingValue >= 51 && safetyRatingValue <= 75) {
        safety_rating_class =  'ok-risk';
      }
      else if (safetyRatingValue >= 76 && safetyRatingValue <= 100) {
        safety_rating_class =  'good-risk';
      } else {
        safety_rating_class = 'unknown-risk';
      }
      return safety_rating_class;
    }
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

.entrant-details {
 flex: 1 1 50%;
}
</style>
