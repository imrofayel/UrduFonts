<template>
  <div class="flex flex-col sm:flex-row" style="direction: rtl;">
    <!-- Main Content -->
    <div class="flex-grow sm:mr-[80px] mb-[100px] sm:mb-0 order-2 sm:order-2">
      <NuxtLayout>
        <NuxtPage/>
      </NuxtLayout>
    </div>

    <!-- Sidebar -->
    <Sidebar class="sm:w-[80px] sm:h-screen w-screen h-[80px] fixed bottom-0 bg-[#f3f6fcd2] backdrop-blur-lg sm:bottom-auto sm:top-0 sm:order-1"/>

    <!-- Noise Effect -->
    <NoiseEffect/>
  </div>
</template>
