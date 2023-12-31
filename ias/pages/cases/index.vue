<template>
  <BasePage title="Cases">
    <div class="flex flex-col justify-center items-center h-full">
      <router-link class="create-case-button" to="/cases/new">Create New Case</router-link>
      <div class="cases-box" v-for="entryCase in cases">
        <div class="flex flex-row">
          <div class="flex-1 entrant-image">
            <img src="/entrant-headshot.png" v-if="entryCase.entrant_id === 3659133665">
            <img src="/istockphoto-1171169127-612x612.jpg" v-if="entryCase.entrant_id === 3131477250">
            <img src="/istockphoto-1386479313-612x612.jpg" v-if="entryCase.entrant_id === 5649084341">
          </div>
          <div class="flex flex-row flex-2 entrant-info">
            <div class="info-item risk-item">
              Risk Rating: <span class="risk-rating good-risk" v-if="entryCase.entrant_id === 3659133665">63</span>
              <span class="risk-rating good-risk" v-if="entryCase.entrant_id === 3131477250">76</span>
              <span class="risk-rating good-risk" v-if="entryCase.entrant_id === 5649084341">55</span>
            </div>
            <div class="info-details ml-6 flex-1">
              <div class="info-column">
                <div class="info-row">
                  <div class="info-name">First Name:</div>
                  <div class="info-value">{{ caseEntrantMap[entryCase.entrant_id].first_name }}</div>
                </div>
                <div class="info-row">
                  <div class="info-name">Last Name:</div>
                  <div class="info-value">{{ caseEntrantMap[entryCase.entrant_id].last_name }}</div>
                </div>
              </div>
              <div class="info-column">
                <div class="info-row">
                  <div class="info-name">Arriving From:</div>
                  <div class="info-value">{{ entryCase.departure_port }}</div>
                </div>
                <div class="info-row">
                  <div class="info-name">Nationality:</div>
                  <div class="info-value">{{ entryCase.passport_country_issue }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="review-link">
            <a v-on:click="runFindEntrant(entryCase.passport_number)">
              Review
            </a>
          </div>
        </div>
      </div>
    </div>
  </BasePage>
</template>

<script>
export default {
  computed: {
    cases() {
      return this.$store.getters['cases/getAllCases'];
    },
    caseEntrantMap() {
      let map = {};
      for (let entryCase of this.cases){
        map[entryCase.entrant_id] = this.$store.getters['entrants/getEntrantById'](entryCase.entrant_id);
      }
      return map;
    }
  },
  methods: {
    runFindEntrant(passport_number) {
      this.$store.dispatch('entrants/findEntrant', passport_number).then(() => {
        this.$router.push({path: '/cases/review', replace: true});
      })
    }
  },
  async beforeMount() {
    await this.$store.dispatch('entrants/removeEntrants');
    await this.$store.dispatch('cases/retrieveCasesReadyForReview');
    for (let entryCase of this.cases) {
      await this.$store.dispatch('entrants/fetchEntrant', entryCase.entrant_id);
    }
  }
}
</script>

<style scoped>
.create-case-button {
  background-color: #333;
  color: white;
  margin-bottom: 12px;
  padding: 8px 16px;
  display: inline-block;
  text-decoration: none;
  border-radius: 8px;
  transition: background-color 0.3s, color 0.3s;
}

.create-case-button:hover {
  background-color: #444;
}

.cases-box {
  margin: 1.5rem;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  transition: box-shadow 0.3s;
}

.cases-box:hover {
  box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.3);
}

.cases-box .flex-row {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.entrant-image {
  flex: 1;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
  overflow: hidden;
}

.entrant-image img {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.3s;
}

.entrant-image img:hover {
  transform: scale(1.05);
}

.entrant-info {
  flex: 3;
  display: flex;
  align-items: center;
  padding-left: 1rem;
  border-left: 2px solid #ddd;
}

.info-item {
  margin: 0;
  margin-bottom: 0.5rem;
}

.info-column {
  display: flex;
  flex-direction: column;
  margin-right: 1.5rem;
}

.info-row {
  display: flex;
  align-items: center;
}

.info-name {
  margin: 0;
  color: #666;
  font-weight: bold;
  width: 120px;
}

.info-value {
  margin: 0;
}

.risk-item {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  color: #666;
}

.risk-rating {
  font-weight: bold;
  margin-left: 0.5rem;
  color: green;
}

.review-link {
  background-color: #333;
  color: white;
  padding: 8px 16px;
  text-decoration: none;
  display: inline-block;
  border-radius: 8px;
  transition: background-color 0.3s, color 0.3s;
}

.review-link:hover {
  background-color: #444;
}
</style>
