<template>
  <div class="flex h-screen">
      <Sidebar/>
      <div class="flex flex-col" style="min-width:80%">
        <TopBar/>
        <div class="flex flex-row flex-1">
          <slot/>
        </div>
      </div>
  </div>
</template>


