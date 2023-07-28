<template>
  <div class="flex h-screen">
      <Sidebar/>
      <div class="flex flex-col" style="min-width:80%">
        <TopBar/>
        <div class="h-20">
          <p class="font-extrabold text-5xl">
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


