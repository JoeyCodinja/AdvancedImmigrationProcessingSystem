<template>
  <div class="flex flex-col">
    <div class="entry-box" v-for="entry in history" :key="entry.id">
      <div class="entry-safety">
        <span class="entry-safety-rating" v-bind:class="safety_rating_style(entry.safety_rating)">
          {{ entry.safety_rating }}
        </span>
        <p class="entry-safety-label">Safety Rating</p>
      </div>
      <div class="entry-details">
        <p class="entry-label">Date of Entry</p>
        <p class="entry-value">{{ formatDate(entry.date_of_entry) }}</p>
      </div>
      <div class="entry-details">
        <p class="entry-label">Passport Number</p>
        <p class="entry-value">{{ entry.passport_number }}</p>
      </div>
      <div class="entry-details">
        <p class="entry-label">Passport Country of Issue</p>
        <p class="entry-value">{{ entry.passport_country_issue }}</p>
      </div>
      <div class="entry-details">
        <p class="entry-label">Purpose of Visit</p>
        <p class="entry-value">{{ toSentenceCase(entry.purpose_of_visit) }}</p>
      </div>
      <div class="entry-details">
        <p class="entry-label">Status</p>
        <p class="entry-value">{{ toSentenceCase(entry.status) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    history: Array,
  },
  methods: {
    formatDate(date){
      return new Date(date).toISOString().slice(0, 10);
    },
    toSentenceCase(string){
      return string[0].toUpperCase() + string.slice(1)
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
  }
}
</script>

<style scoped>
.entry-box {
  margin: 0 auto;
  margin-top: 1.5rem;
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.35);
  width: 100%;
  background-color: white;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}

.entry-details {
  flex-basis: calc(50% - 1rem);
  margin-bottom: 1rem;
}

.entry-label {
  font-weight: bold;
  margin-bottom: 0.25rem;
}

.entry-value {
  font-weight: normal;
}

.entry-safety {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.entry-safety-rating {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.25rem;
}

.entry-safety-label {
  font-weight: bold;
}
</style>
