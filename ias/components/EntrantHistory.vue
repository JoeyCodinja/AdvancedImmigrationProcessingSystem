<template>
  <div class="flex flex-col">
    <div class="flex flex-row shadow-xl mb-5 rounded" v-for="entry in history">
      <div class="flex flex-col flex-1.5">
        <p class="font-bold">Date of Entry <span class="underlin font-normal">{{formatDate(entry.date_of_entry)}} </span></p>
        <p class="font-bold">Passport Number <span class="underline font-normal">{{entry.passport_number}}</span></p>
        <p class="font-bold">Passport Country of Issue <span class="underline font-normal">{{entry.passport_country_issue}}</span></p>
        <p class="font-bold">Purpose of Visit <span class="underline font-normal">{{toSentenceCase(entry.purpose_of_visit)}}</span></p>
        <p class="font-bold">Status <span class="font-normal">{{toSentenceCase(entry.status)}}</span></p>
      </div>

      <div class="text-base flex flex-col items-center flex-1">
        <p class="items-center">
          <span v-bind:class="safety_rating_style(entry.safety_rating)">{{entry.safety_rating}}</span>
        </p>
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

<style>

</style>
