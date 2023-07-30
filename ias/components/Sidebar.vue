<template>
  <div class="bg-black text-white min-w-fifth min-h-full flex flex-col flex-full">
    <router-link to="/"><img src="/pica_logo-removebg-preview.png"/></router-link>
    <div class="flex flex-row items-center flex-two">
      <p class="flex-1 sep-right text-center"><font-awesome-icon icon="fa-solid fa-bars"/>Menu</p>
      <p class="flex-1 sep-left text-center"><font-awesome-icon icon="fa-solid fa-magnifying-glass"/>Search</p>
    </div>
    <router-link to="/cases" v-if="$route.path!=='/cases'" class="flex-1 pl-4"><img src=""/>Cases</router-link>
    <router-link to="/cases" v-if="$route.path==='/cases'" class="text-yellow-400 flex-1 pl-4"><img src=""/>Cases</router-link>
    <p v-if="!$route.path.includes('admin')" class="flex-1 pl-4">
      <font-awesome-icon
        icon="fa-solid fa-gear"/>
      Settings
    </p>
    <p v-if="$route.path.includes('admin')" class="text-yellow-400 flex-1 pl-4">
      <font-awesome-icon
        icon="fa-solid fa-gear"
        class="text-yellow-400 pl-4" />
      Settings
    </p>
    <router-link
      to="/admin/generative-resources"
      v-if="$route.path!=='/admin/generative-resources'"
      class="flex-1 pl-4">
      Training Data
    </router-link>
    <router-link
      to="/admin/generative-resources"
      v-if="$route.path==='/admin/generative-resources'" class="text-yellow-400 flex-1 pl-4">
      Training Data
    </router-link>

    <router-link
      v-if="$route.path!=='/admin/question-management'"
      to="/admin/question-management"
      class="flex-1 pl-4">
      Question Management
    </router-link>
    <router-link
      to="/admin/question-management"
      v-if="$route.path==='/admin/question-management'" class="text-yellow-400 flex-1 pl-4">
      Question Management
    </router-link>

    <router-link
      to="/admin/prompt-engineering"
      v-if="$route.path!=='/admin/prompt-engineering'"
      class="flex-1 pl-4">
      Prompt Engineering
    </router-link>
    <router-link
      to="/admin/prompt-engineering"
      v-if="$route.path==='/admin/prompt-engineering'" class="text-yellow-400 flex-1 pl-4">
      Prompt Engineering
    </router-link>

    <div class="flex flex-row items-center pl-4">
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
  border-right: 1px white solid;
}

.sep-left {
  border-left: 1px white solid;
}
</style>
