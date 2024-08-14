<template>
  <div class="flex sm:flex-row flex-col w-full text-[#3c4043] blur-[.28px]" style="direction: rtl;">
    <Sidebar class="bg-[#f3f6fc] basis-[6%] min-w-[80px] h-screen order-2 sm:order-1"/>

    <NuxtLayout class="order-1 sm:order-2 w-full">
      <NuxtPage class="basis-[92%] h-full w-full"/>
    </NuxtLayout>

    <NoiseEffect/>

  </div>
</template>