<template>
  <BasePage>
    <div class="flex flex-col">
      <p class="font-extrabold text-5xl">Question Management</p>

      <div class="box w-1/2">
        <p>Do you have any food, plants or other organic materials travelling with you<br></p>
        <p>Weight: 36<p/>
        <div class="flex flex-row gap-8">
          <router-link to="/admin/question-management/edit" class="blue-btn flex-1">Edit</router-link>
          <p class="red-btn flex-1">Delete</p>
        </div>
      </div>
      <div class="box w-1/2">
        <p>Do you have any food, plants or other organic materials travelling with you<br></p>
        <p>Weight: 16<p/>
        <div class="flex flex-row gap-8">
          <p class="blue-btn flex-1">Edit</p>
          <p class="red-btn flex-1">Delete</p>
        </div>
      </div>
      <div class="box w-1/2">
        <p>Do you have any food, plants or other organic materials travelling with you<br></p>
        <p>Weight: 49<p/>
        <div class="flex flex-row gap-8">
          <p class="blue-btn flex-1">Edit</p>
          <p class="red-btn flex-1">Delete</p>
        </div>
      </div>
      <div class="box w-1/2">
        <p>Do you have any food, plants or other organic materials travelling with you<br></p>
        <p>Weight: 25<p/>
        <div class="flex flex-row gap-8">
          <p class="blue-btn flex-1">Edit</p>
          <p class="red-btn flex-1">Delete</p>
        </div>
      </div>
      <div class="box w-1/2">
        <p>Do you have any food, plants or other organic materials travelling with you<br></p>
        <p>Weight: 50<p/>
        <div class="flex flex-row gap-8">
          <p class="blue-btn flex-1">Edit</p>
          <p class="red-btn flex-1">Delete</p>
        </div>
      </div>
    </div>
  </BasePage>
</template>

<style>
.box > *{
  margin-bottom: 0.75em;
}
</style>
