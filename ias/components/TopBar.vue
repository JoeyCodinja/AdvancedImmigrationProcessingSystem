<template>
  <div class="bg-zinc-700 text-white px-2 py-2 flex items-center justify-between">
    <div class="flex items-center">
      <img src="/AIPS_Logo_no_text_white.png" alt="Logo" class="logo" />
    </div>

    <div class="flex items-center ml-auto">
      <h1 class="title">Advanced Immigration Processing System</h1>
    </div>

    <div class="flex items-center ml-auto">
      <UserBadge />
      <LogoutButton />
    </div>
  </div>
</template>

<style>
/* Add any custom styles specific to this component */
.logo {
  width: 3rem;
  height: 3rem;
  margin-left: 5rem;
}

.title {
  font-size: 2rem;
  font-weight: bold;
  margin-left: auto;
  margin-right: auto;
}
</style>
