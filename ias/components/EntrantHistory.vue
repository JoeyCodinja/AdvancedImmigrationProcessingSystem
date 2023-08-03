<template>
  <div class="flex flex-row" v-for="entry in history">
    <p>{{entry.first_name}} {{entry.last_name}}</p>

    <div class="text-2xl">
      {{entry.safety_rating}}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    history: Array,
  }
}
</script>

<style>

</style>
