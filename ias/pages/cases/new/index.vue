<template>
  <BasePage title="Case - New Case">
    <form v-on:submit="submitForm" action="javascript:void(0)" class="ml-4">
      <label for="passport_number" class="text-4xl">Entrant's passport number</label>
      <input type="text" name="passport_number" value="F77698918" class="text-8xl"/>
      <input type="submit" class="text-4xl" value="Search"/>
    </form>
  </BasePage>
</template>

<script>
import axios from "axios";

export default {
  methods: {
    submitForm(submitEvent) {
      this.$router.push('/cases/review');
    }
  }
}
</script>

<style>
form > *{
  margin-bottom: 3rem;
  display:block;
}

input[type='text']{
  border-bottom: 1px solid grey;
}

input[type='submit']{
  border-radius: 0.5rem;
  border: 2px solid grey;
  padding:0.5rem;
}
</style>
