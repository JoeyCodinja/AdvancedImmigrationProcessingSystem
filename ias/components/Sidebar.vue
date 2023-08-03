<template>
  <div class="bg-black text-white min-w-fifth min-h-full flex flex-col flex-full">
    <router-link to="/"><img src="/pica_logo-removebg-preview.png"/></router-link>
    <div class="flex flex-row items-center basis-40">
      <p class="flex-1 sep-right text-center text-3xl"><font-awesome-icon icon="fa-solid fa-bars"/> Menu</p>
      <p class="flex-1 sep-left text-center text-3xl"><font-awesome-icon icon="fa-solid fa-magnifying-glass"/> Search</p>
    </div>
    <router-link to="/cases" v-if="$route.path!=='/cases'" class="flex-initial pl-4 text-2xl"><img src=""/><font-awesome-icon icon="fa-regular fa-file"/> Cases</router-link>
    <router-link to="/cases" v-if="$route.path==='/cases'" class="text-yellow-400 flex-initial pl-4 text-2xl"><img src=""/><font-awesome-icon icon="fa-regular fa-file"/> Cases</router-link>
    <router-link to="/cases/new" v-if="$route.path!=='/cases/new'" class="pl-12 text-2xl"><font-awesome-icon icon="fa-regular fa-square-plus"/> New </router-link>
    <router-link to="/cases/new" v-if="$route.path==='/cases/new'" class="pl-12 text-yellow-400 text-2xl"><font-awesome-icon icon="fa-regular fa-square-plus"/> New </router-link>
    <router-link to="/cases" v-if="$route.path!=='/cases/review'" class="pl-12 text-2xl mb-4 last-in-list"><font-awesome-icon icon="fa-solid fa-binoculars"/> Review</router-link>
    <router-link to="/cases" v-if="$route.path==='/cases/review'" class="pl-12 text-yellow-400 text-2xl mb-4 last-in-list"><font-awesome-icon icon="fa-solid fa-binoculars"/> Review</router-link>
    <p v-if="!$route.path.includes('admin')" class="flex-initial pl-4 text-2xl">
      <font-awesome-icon
        icon="fa-solid fa-gear"/>
      Settings
    </p>
    <p v-if="$route.path.includes('admin')" class="text-yellow-400 flex-initial pl-4 text-2xl">
      <font-awesome-icon
        icon="fa-solid fa-gear"
        class="text-yellow-400" />
      Settings
    </p>
    <router-link
      to="/admin/generative-resources"
      v-if="$route.path!=='/admin/generative-resources'"
      class="flex-initial pl-12 text-2xl">
      <font-awesome-icon icon="fa-solid fa-book"/> Training Data
    </router-link>
    <router-link
      to="/admin/generative-resources"
      v-if="$route.path==='/admin/generative-resources'" class="text-yellow-400 flex-initial pl-12 text-2xl">
      <font-awesome-icon icon="fa-solid fa-book"/> Training Data
    </router-link>

    <router-link
      v-if="$route.path!=='/admin/question-management'"
      to="/admin/question-management"
      class="flex-initial pl-12 text-2xl">
      <font-awesome-icon icon="fa-solid fa-clipboard-question"/> Question Management
    </router-link>
    <router-link
      to="/admin/question-management"
      v-if="$route.path==='/admin/question-management'" class="text-yellow-400 flex-initial pl-12 text-2xl">
      <font-awesome-icon icon="fa-solid fa-clipboard-question"/> Question Management
    </router-link>

    <router-link
      to="/admin/prompt-engineering"
      v-if="$route.path!=='/admin/prompt-engineering'"
      class="flex-initial pl-12 text-2xl">
      <font-awesome-icon icon="fa-solid fa-terminal"/> Prompt Engineering
    </router-link>
    <router-link
      to="/admin/prompt-engineering"
      v-if="$route.path==='/admin/prompt-engineering'" class="text-yellow-400 flex-initial pl-12 text-2xl">
      <font-awesome-icon icon="fa-solid fa-terminal"/> Prompt Engineering
    </router-link>

    <div class="flex flex-row items-center pl-4 text-2xl mt-auto">
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
.last-in-list {
  margin-bottom: 3rem !important;
}
.sep-right {
  border-right: 1px white solid;
}

.sep-left {
  border-left: 1px white solid;
}

.min-w-fifth > a, p{
  margin-bottom: 0.75rem
}


</style>
