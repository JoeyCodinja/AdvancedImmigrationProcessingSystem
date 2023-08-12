<template>
  <div class="flex h-screen bg-gray-50">
    <div class="flex flex-col w-full">
      <TopBar />
      <div class="flex flex-row flex-1 overflow-y-scroll">
        <Sidebar />
        <div class="main-content ml-20">
          <div class="">
            <h1 class="font-medium text-4xl title-text inline-block">{{ title }}</h1>
            <div class="ml-48 inline-block" v-if="caseReview==='true'">
              <button class="font-bold button"
                      v-bind:class="safety_rating >= 76 ? 'accept' : ''"
                      :disabled="safety_rating < 76"v-on:click="process_entry('grant')">
                Accept Entry
              </button>
              <button class="font-bold button deny"v-on:click="process_entry('deny')">
                Deny Entry
              </button>
              <button class="font-bold button review" v-on:click="process_entry('review')">
                Submit for Review
              </button>
            </div>
          </div>
          <div class="content-slot">
            <slot />
          </div>
        </div>
      </div>
    </div>
    <Modal text="You are now submitting this case file" :hide="hideModal"/>
  </div>
</template>


<script>
import TopBar from './TopBar.vue';
import Sidebar from './Sidebar.vue';

export default {
  components: {
    TopBar,
    Sidebar
  },
  data() {
    return {
      hideModal: true
    }
  },
  props: {
    title: String,
    caseReview: String,
  },
  computed: {
    safety_rating(){
      return this.$store.getters['entrants/getCurrentEntrantSafetyRating'];
    }
  },
  methods: {
    async process_entry(action){
      console.log('process_entry entered');
      switch(action) {
        case 'grant':
          await this.$store.commit('entrants/updateLatestEntryStatus', 'granted');
          break;
        case 'deny':
          await this.$store.commit('entrants/updateLatestEntryStatus', 'denied');
          break;
        case 'review':
          await this.$store.commit('entrants/updateLatestEntryStatus', 'review');
          break;
        default:
          break;
      }
      this.hideModal = false;
    }
  }
};
</script>

<style scoped>
.title-text {
  font-family: Arial, sans-serif;
  color: #333;
}

.main-content {
  margin-left: 15rem; /* Adjust this value as needed */
  padding-left: 3rem; /* Add padding to create separation from sidebar */
  padding-top: 2rem; /* Add padding to create separation from topbar */

}

.button{
  background-color: black;
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 0.375rem;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
  margin-right: 1rem;
}

.button[disabled='disabled']{
  background-color: dimgrey;
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 0.375rem;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
  margin-right: 1rem;
}

.button.accept{
  background-color: green;
}

.button.deny {
  background-color: red;
}

.button.review {
  background-color: rgb(226, 204, 88);;
}


.content-slot {
  margin-top: 1rem;
}
</style>
