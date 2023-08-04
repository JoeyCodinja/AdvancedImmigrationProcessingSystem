<template>
  <BasePage title="Cases">
    <div class="flex flex-col">
      <router-link class="bg-black text-white mb-12" to="/cases/new">Create New Case</router-link>
      <div v-for="n in 4" class="flex flex-row pb-8 flex-wrap border-black">
        <div class="flex-1">
          <img src="/entrant-headshot.png">
        </div>
        <div class="flex flex-col flex-2 pl-4 border-2 border-black">
          <p> First Name: Derek </p>
          <p> Last Name: Jeter </p>
          <p> Arriving From: MIA </p>
          <p> Nationality: Jamaican </p>
          <p> Risk Rating: <span class="good-risk">98</span> </p>
          <p> Status: Pending </p>
          <router-link to="/cases/review" class="bg-black text-white" >Review</router-link>
        </div>
      </div>
    </div>

  </BasePage>
</template>

<script>
export default {
  methods:{
  },
  beforeMount() {

  }
}
</script>

<style>
  .flex.flex-row.pb-8:nth-of-type(2) {
    page-break-after: always;
  }
</style>
