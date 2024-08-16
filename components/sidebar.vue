<template>
  <div class="flex sm:flex-col flex-row items-center px-6 py-4 sm:py-6 justify-between sm:px-0">
    <div class="sm:space-y-4 sm:flex-col flex sm:space-x-0 space-x-4">
      <UiBtn
        link="/"
        icon="lucide:flame"
        :fill="isCurrentPath('/')"
      />
      <UiBtn
        link="/typography"
        icon="lucide:ligature"
        :fill="isCurrentPath('/typography')"
      />
      <UiBtn
        link="/how-to-use"
        icon="lucide:graduation-cap"
        :fill="isCurrentPath('/how-to-use')"
      />
    </div>

    <a
      v-if="colorMode.value === 'light'"
      class="inline space-x-2"
      @click="onClick('dark')"
      style="cursor: pointer;"
    >
      <UiBtn icon="lucide:moon" />
    </a>

    <a
      v-if="colorMode.value === 'dark'"
      class="inline space-x-2"
      @click="onClick('light')"
      style="cursor: pointer;"
    >
      <UiBtn icon="lucide:moon" />
    </a>
  </div>
</template>

<script lang="ts" setup>

const route = useRoute();
const colorMode = useColorMode();

function isCurrentPath(path: string) {
  return route.path === path;
}

function onClick(val: string) {
  colorMode.preference = val;
}
</script>

<style>
</style>
