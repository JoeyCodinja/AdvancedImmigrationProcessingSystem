<template>
  <div class="bg-black text-white min-w-fifth min-h-full flex flex-col flex-full">
    <router-link to="/"><img src="/pica_logo-removebg-preview.png"/></router-link>
    <div class="flex flex-row items-center flex-two">
      <p class="flex-1 sep-right"><font-awesome-icon icon="fa-solid fa-bars"/>Menu</p>
      <p class="flex-1"><font-awesome-icon icon="fa-solid fa-magnifying-glass"/>Search</p>
    </div>
    <router-link to="/cases"><img src=""/>Cases</router-link>
    <p><font-awesome-icon icon="fa-solid fa-gear"/>Settings</p>
    <router-link to="/admin/generative-resources">Training Data</router-link>
    <router-link to="/admin/question-management">Question Management</router-link>
    <router-link to="/admin/prompt-engineering">Prompt Engineering</router-link>
    <div class="flex flex-row items-center">
      <img src="/power-32.png"/>
      Logout
    </div>
  </div>
</template>

<script>
export default {
  name: "Sidebar"
}
</script>

<style>
.sep-right {
  border-right: 2px white solid;
}
</style>
