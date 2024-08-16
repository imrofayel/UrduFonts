<script setup lang="ts">

const colorMode = useColorMode()
function onClick(val: string) {
  colorMode.preference = val
}

</script>

<template>

  <div class="mx-3 justify-between flex mt-5 text-[#263238] dark:text-[#ffffff] text-[24px]">
      <div class="p-2 space-x-4"><div class="inline">اردو فونٹس</div>

    </div>

    <NuxtLink to="/about" class="px-6 transform hover:scale-110 duration-500 ease-in-out cursor-pointer"><Icon name="lucide:arrow-up-right" size="24px" class="relative top-1.5"></Icon><div class="p-1 inline"></div>ہمارے بارے میں</NuxtLink>

  </div>
</template>

<style>

</style>
