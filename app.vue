<template>
  <div class="flex flex-col text-[#1c2c28] dark:text-[#ffff] sm:flex-row z-10 dark:bg-[#101917] bg-[#ffff]" style="direction: rtl;">
    <!-- Main Content -->
    <div class="flex-grow sm:mr-[80px] mb-[100px] sm:mb-0 order-2 sm:order-2">
      <NuxtLayout>
        <NuxtPage/>
      </NuxtLayout>
    </div>

    <!-- Sidebar -->
    <Sidebar class="sm:w-[80px] sm:h-screen w-screen h-[80px] fixed bottom-0 bg-green-50 backdrop-blur-lg sm:bottom-auto sm:top-0 sm:order-1 dark:bg-[#1c2c28]"/>
  </div>
</template>

<style>

.dark body {
  background-color: #101917;
}

body {
  background-color: #ffff;
}

</style>
