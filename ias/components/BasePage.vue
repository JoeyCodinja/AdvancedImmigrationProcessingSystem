<template>
  <div class="flex h-screen bg-gray-50">
    <Sidebar/>
    <div class="flex flex-col w-full" >
      <TopBar/>
      <div class="m-4 ">
        <p class="font-medium text-4xl">
          {{title}}
        </p>
      </div>
      <div class="flex flex-row flex-1 overflow-y-scroll">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String
  }
}
</script>


