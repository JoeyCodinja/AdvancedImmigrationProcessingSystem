<template>
  <BasePage title="Case - Review" caseReview="true">
    <div class="flex flex-row flex-1">
      <div class="flex flex-col flex-wrap w-one-third p-4">
        <div class="flex flex-row">
          <!-- Entrant image with border -->
          <div class="entrant-image items-center">
            <img src="/entrant-headshot.png" v-if="entrant.id == 3659133665">
            <img src="/istockphoto-1171169127-612x612.jpg" v-if="entrant.id == 3131477250">
            <img src="/istockphoto-1386479313-612x612.jpg" v-if="entrant.id == 5649084341">
          </div>
        </div>
        <div class="flex flex-col mt-4 items-center">
          <!-- Entrant details -->
            <div class="entrant-safety-score">
              <p class="safety-score-label">Safety Score</p>
              <span class="text-4xl font-bold"
                    v-bind:class="safety_rating_style(safety_rating)">
                {{ safety_rating }}
              </span>
            </div>
            <p class="entrant-name ">{{entrant.first_name}} {{entrant.last_name}}</p>

            <p class="entrant-detail">Arriving From: <span class="font-bold">{{ latestEntrantHistory.departure_port }}</span></p>
            <p class="entrant-detail">Nationality: <span class="font-bold">{{ latestEntrantHistory.passport_country_issue }}</span></p>
            <p class="entrant-detail">Status:
              <span class="font-bold" v-if="!Object.keys(latestEntrantHistory).includes('status')">Pending</span>
              <span class="font-bold" v-if="Object.keys(latestEntrantHistory).includes('status') && latestEntrantHistory.status == 'granted'">Entry Granted</span>
              <span class="font-bold" v-if="Object.keys(latestEntrantHistory).includes('status') && latestEntrantHistory.status == 'denied'">Denied Entry</span>
              <span class="font-bold" v-if="Object.keys(latestEntrantHistory).includes('status') && latestEntrantHistory.status == 'review'">Submitted For Review</span>
            </p>
          </div>
          <div class="flex flex-row">
            <!-- Toggling sections -->
            <p class="flex flex-1 bottom-border
                      text-center text-base font-bold
                      right-border tab-padding"
               v-on:click="toggle('overview')">Overview</p>
            <p class="flex flex-1 bottom-border
                      text-center text-base font-bold tab-padding"
               v-on:click="toggle('travel_history')">Travel History</p>
          </div>
          <div v-show="show_overview">
            <!-- Entrant overview -->
            <EntrantOverview v-bind:entrant="entrant"/>
          </div>
          <div v-show="show_travel_history">
            <!-- Entrant Travel History -->
            <EntrantHistory v-bind:history="entrantHistory"/>
          </div>
        </div>
        <div class="flex flex-col flex-1 w-two-third p-4">
      <!-- Rest of the code -->

      <div class="flex flex-col">
        <p class="text-2xl">Interview Questions</p>
        <div class="mt-3 flex flex-col" v-if="fetching_questions == true">
          Fetching Questions
          <font-awesome-icon icon="fa-solid fa-spinner" spin/>
        </div>
        <div class="mt-3 flex flex-col" v-if="interviewQuestions.length === 0 && fetching_questions == false">
          All interview questions asked
        </div>
        <div class="questions-box" v-for="(question, index) of interviewQuestions" :key="question.id">
          <div class="flex flex-row">
            <p class="text-base basis-20 flex-2 font-semibold border-b pb-3">{{ question.question }}</p>
            <div class="ml-auto">
              <button class="rounded-2xl border bg-yellow-300 px-3 py-1 text-xs font-bold">
                Weight: {{ question.weight }}
              </button>
            </div>
          </div>
          <textarea v-bind:ref="'canned_response_open_' + index"
                    v-bind:name="'canned_response_open_' + index"
                    v-if="!question.canned_response"/>
                    <div v-else>
          <div class="canned-buttons">
            <label for="canned_response_yes" class="canned-label">
              <input v-bind:ref="'canned_response_yes_' + index"
                    v-bind:name="'canned_response_group_' + index "
                    type="radio" class="canned-radio-button"/> Yes
            </label>

            <label for="canned_response_no" class="canned-label">
              <input v-bind:ref="'canned_response_no_' + index"
                    v-bind:name="'canned_response_group_' + index "
                    type="radio" class="canned-radio-button"/> No
            </label>
          </div>
        </div>
          <div class="question mt-4">
            <button class="accept-button" v-on:click="addAnsweredQuestion(question, index, true)">
              Acceptable
            </button>
            <button class="unacceptable-button" v-on:click="addAnsweredQuestion(question, index, false)">
              Unacceptable
            </button>
            <button class="skip-button" v-on:click="addAnsweredQuestion(question, index, null)">Skip</button>
          </div>
        </div>
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
      fetching_questions: true
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
      let toggles = Object.keys(this.$data).filter((key) => key.includes('show'));
      let panelsToDeToggle = toggles.filter((key) => !key.includes(panel));
      this.$data[`show_${panel}`] = true;
      panelsToDeToggle.forEach((panel) => {
        console.log(`Detoggling: ${panel}`);
        this.$data[panel] = false;
      })
    },
    addAnsweredQuestion(question, index, add){
      // Pull ref
      let answeredQuestion = JSON.parse(JSON.stringify(question));
      answeredQuestion['skipped'] = false;
      if (question.canned_response){
        let responseYes = this.$refs[`canned_response_yes_${index}`][0].checked;
        let responseNo = this.$refs[`canned_response_no_${index}`][0].checked;
        if (responseYes){
          answeredQuestion['response'] = "Yes";
        } else if (responseNo) {
          answeredQuestion['response'] = "No";
        } else {
          answeredQuestion['response'] = "No answer given";
          if (add === null){
            answeredQuestion['skipped'] = true;
            this.generateNewQuestion(question.id);
          }
        }
      } else {
        let response = this.$refs[`canned_response_open_${index}`][0].value;
        if (response.length == 0){
          answeredQuestion['response'] = "No answer given";
          if (add === null){
            answeredQuestion['skipped'] = true;
            this.generateNewQuestion(question.id);
          }
        } else {
          answeredQuestion['response'] = this.$refs[`canned_response_open_${index}`][0].value;
        }
      }
      this.$store.commit('entrants/addAnsweredQuestion', answeredQuestion);
      this.changeSafetyRating(question.weight, add);
      this.$store.dispatch('questions/removeQuestion', question.id);
    },
    changeSafetyRating(weight, add) {
      if (add) {
        this.safety_rating += weight
      } else if (add == false) {
        this.safety_rating -= weight
      }
    },
    generateNewQuestion(questionId) {
      this.$store.dispatch('questions/retrieveInterviewQuestion', this.entrant.id);
    },
    safety_rating_style(safetyRatingValue) {
      let safety_rating_class = ""
      if (safetyRatingValue <= 25) {
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
  mounted() {
    this.$store.commit('questions/removeInterviewQuestions');
    this.$store.dispatch('questions/retrieveInterviewQuestions', this.entrant.id).then(() => {
      this.fetching_questions = false;
    });
  }
}
</script>

<style scoped>
.bottom-border {
  border-bottom: 2px black solid;
}

.w-one-third {
  width: 33.33333%;
}

.w-two-third {
  width: 66.66667%;
}

.p-4 {
  padding: 1rem;
}

.right-border {
  border-right: 2px black solid;
}

.tab-padding {
  padding-left: 2rem;
}


.entrant-image {
  border: 5px solid #0b5688; /* Blue color */
  padding: 1rem; /* Padding to create space between the image and the border */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); /* Shadow effect */
  transition: border-color 0.3s, box-shadow 0.3s; /* Smooth transitions */
}
.entrant-image:hover {
  border-color: #0c0fbe; /* Red color on hover */
  box-shadow: 0 0 15px rgba(231, 76, 60, 0.4); /* Bigger shadow on hover */
}

.entrant-detail {
  font-size:large;
}

.entrant-name {
  font-size: 2rem;
  font-weight:700;
  margin-bottom: 0.5rem;
  color: #333;
}

.entrant-safety-score {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
}

.safety-score-label {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #333;
}

.questions-box {
  margin: 0 auto;
  margin-top: 1.5rem;
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.35);
  width: 100%;
  background-color: white;
}

.accept-button
,.unacceptable-button
,.skip-button {
  background-color:black;
  border: none;
  color: white;
  font-weight: bold;
  padding: 0.5rem 1.5rem;
  border-radius: 0.375rem;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
  transition: background-color 0.3s, box-shadow 0.3s;
  margin-right:2rem;
}

.accept-button:hover {
  background-color: #13ac40;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
}

.unacceptable-button:hover {
  background-color: #c21313;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
}

.skip-button:hover {
  background-color: #f6e05e;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
}

textarea {
  background-color: lightgray;
  width: 100%;
}

.canned-radio-button {
  appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid #999;
  border-radius: 50%;
  transition: border-color 0.3s, background-color 0.3s;
  cursor: pointer;
  margin-right: 0.5rem;
}

.canned-radio-button:checked {
  border-color: #0c0fbe;
  background-color: #0c0fbe;
}

.canned-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-weight:500;
}
</style>
