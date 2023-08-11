<template>
  <div class="flex h-screen bg-gray-50">
    <div class="flex flex-col w-full">
      <TopBar />
      <div class="flex flex-row flex-1 overflow-y-scroll">
        <Sidebar />
        <div class="main-content ml-20">
          <h1 class="font-medium text-4xl title-text">{{ title }}</h1>
          <div class="content-slot">
            <slot />
          </div>
        </div>
      </div>
    </div>
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
  props: {
    title: String
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

.content-slot {
  margin-top: 1rem;
}
</style>
