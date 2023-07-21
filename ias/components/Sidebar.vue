<template>
  <div class="bg-black text-white min-w-fifth min-h-full flex flex-col flex-full">
    <router-link to="/"><img src="/pica_logo-removebg-preview.png"/></router-link>
    <div class="flex flex-row items-center flex-two">
      <p class="flex-1 sep-right">Menu</p>
      <p class="flex-1"><MagnifyingGlass/>Search</p>
    </div>
    <router-link to="/cases"><img src=""/>Cases</router-link>
    <p><Cog8Tooth/>Settings</p>
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
import { MagnifyingClass, Bars, Cog8Tooth} from "@heroicons/vue/24/outline"
import { ChartBar } from "@heroicons/vue/24/solid"

export default {
  name: "Sidebar"
}
</script>

<style>
.sep-right {
  border-right: 2px white solid;
}
</style>
