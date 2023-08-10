<template>
  <div class="flex flex-col">
    <div class="flex flex-row shadow-sm" v-for="entry in history">
      <div class="flex flex-col flex-1.5">
        <p>Date of Entry <span class="underline">{{entry.date_of_entry}} </span></p>
        <p>Passport Number <span class="underline">{{entry.passport_number}}</span></p>
        <p>Passport Country of Issue <span class="underline">{{entry.passport_country_issue}}</span></p>
        <p>Purpose of Visit <span class="underline">{{entry.purpose_of_visit}}</span></p>
      </div>

      <div class="text-2xl flex flex-col items-center flex-1">
        <p class="flex flex-1 text-5xl items-center" v-bind:class="safety_rating_style(entry.safety_rating)"><span>{{entry.safety_rating}}</span></p>
        <p>Safety Rating</p>
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

<style>

</style>
