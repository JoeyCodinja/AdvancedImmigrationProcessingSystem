<template>
  <div class="flex flex-col">
    <div class="flex flex-row shadow-sm" v-for="entry in history">
      <div class="flex flex-col">
        <p>Date of Entry <span class="underline">{{entry.date_of_entry}} </span></p>
        <p>Passport Number <span class="underline">{{entry.passport_number}}</span></p>
        <p>Passport Country of Issue <span class="underline">{{entry.passport_country_issue}}</span></p>
        <p>Purpose of Visit <span class="underline">{{entry.passport_country_issue}}</span></p>
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
    safety_rating_style: {

    }
  }
}
</script>

<style>

</style>
