<template>
  <div class="flex flex-col text-[#1c2c28] dark:text-[#ffff] sm:flex-row z-10 dark:bg-[#101917] bg-[#ffff]"
    style="direction: rtl;">
    <div class="flex-grow mb-[100px] sm:mb-0 order-2 sm:order-2">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>

    <Sidebar
      class="sm:h-screen sticky bottom-0 bg-green-50/90 backdrop-blur-xl sm:bottom-auto sm:top-0 sm:order-1 dark:bg-[#1c2c28bf]" />
  </div>
</template>

<style>
.dark body {
  background-color: #101917;
}
</style>
