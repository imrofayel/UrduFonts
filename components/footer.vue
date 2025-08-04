<script setup lang="ts">
const colorMode = useColorMode();
function onClick(val: string) {
  colorMode.preference = val;
}
</script>

<template>

  <div class="mx-3 justify-between flex mt-5 text-[#263238] dark:text-[#ffffff] text-[24px]">
    <div class="p-2 space-x-4">
      <div class="inline ">اردو فونٹس</div>

      <img src="https://img.shields.io/github/stars/imrofayel/urdufonts" alt="repo"
        class="relative right-2 inline-block" />

      <a class="inline text-lg" href="mailto:adamrofayel@gmail.com">رابطہ کریں</a>
    </div>

  </div>
</template>

<style></style>
