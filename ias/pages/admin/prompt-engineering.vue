<template>
  <BasePage title="Prompt Engineering">
    <div class="flex flex-col">
      <p class="italic text-2xl">Prompts in use</p>
      <div class="mx-20 my-6 rounded-xl border p-5 shadow-md w-9/12 bg-white " v-for="prompt in prompts">
        <div class="mt-4 mb-6">
          <p class="text-base font-semibold">{{ prompt.prompt}}</p>
        </div>
        <div>
          <div class="flex items-center justify-between text-slate-500">
            <div class="flex space-x-4 md:space-x-8">
              <button class="inline-block rounded-md bg-blue-500 px-6 py-2 font-semibold text-white shadow-md duration-75 hover:bg-green-500">Edit</button>
              <button class="inline-block rounded-md bg-blue-500 px-6 py-2 font-semibold text-white shadow-md duration-75 hover:bg-red-700">Delete</button>
              <div class="inline-block rounded-md bg-black px-6 py-2 font-semibold text-white shadow-md duration-75 hover:bg-grey-500">
                <label for="prompt-enabled">Enabled?</label>
                <input name="prompt-enabled" type="checkbox" v-bind:checked="prompt.enabled ? 'checked' : ''"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BasePage>
</template>

<script>
export default {
  computed: {
    prompts() {
      return this.$store.getters['prompts/getAllPrompts']
    }
  },
  mounted(){
    this.$store.dispatch('prompts/retrievePrompts')
  }
}
</script>

<style>
.prompt-box{
  height:8rem;
  width: 50vw;
  padding: 1rem;
  margin: 2rem;
  border-radius: 15px;
  box-shadow: 5px 8px 10px grey;
  border-top: black 8px solid;
}

.blue-btn, .red-btn, .green-btn {
  text-align: center;
  color: white;
  border-radius: 1rem;
  font-weight:800;
}

.blue-btn {
  background-color: blue;
  box-shadow: -5px -5px 10px darkblue;
}

.red-btn {
  background-color: red;
  box-shadow: -5px -5px 10px darkred;
}

.green-btn {
  background-color: green;
  box-shadow: -5px -5px 10px darkgreen;
}
</style>
