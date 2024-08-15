<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter, type RouteLocationAsPathGeneric, type RouteLocationAsRelativeGeneric } from 'vue-router';

const isOpen = ref(false);
const commandPaletteRef = ref();
const router = useRouter();

const pages = [
  { id: 'adamrofayel', label: 'Adam Rofayel', href: 'https://github.com/imrofayel', target: '_blank' },
];

const actions = [
  { id: 'jameel_noori_nastaliq', label: 'جمیل نوری نستعلیق', click: () => {} },
  { id: 'opensource', label: 'Open Source Projects', click: () => {} },
];

const groups = computed(() =>
  [commandPaletteRef.value?.query ? {
    key: 'pages',
    commands: pages
  } : {
    key: 'actions',
    commands: actions
  }].filter(Boolean)
);

function onSelect(option: { click: () => void; to: string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric; href: string | URL | undefined; }) {
  if (option.click) {
    option.click();
  } else if (option.to) {
    router.push(option.to);
  } else if (option.href) {
    window.open(option.href, '_blank');
  }
}
</script>

<template>
  <div class="basis-[50%] sm:basis-[45%] md:basis-[35%]">

    <div class="h-16 bg-[#f3f6fcd2] backdrop-blur-lg rounded-full flex items-center p-6 hover:scale-110 duration-500 ease-in-out" @click="isOpen = true">
      <Icon name="lucide:search" size="24px"></Icon>
      <div class="noto-nastaliq relative -top-1 pr-4">تلاش کریں</div>
    </div>

    <UModal v-model="isOpen">
      <UCommandPalette
        ref="commandPaletteRef"

        :fuse="{
          fuseOptions: {
            ignoreLocation: true,
            includeMatches: true,
            threshold: 0,
            keys: ['title', 'description', 'children.children.value', 'children.children.children.value']
          },
          resultLimit: 10,
        }"

        :groups="groups"
        :autoselect="false"
        @update:model-value="onSelect"

        class="blur-[0.25px] text-lg"
        
        :ui="{
            input: {
              icon: {
                base: 'pointer-events-none absolute start-4 opacity-80',
              },
            },
            group: {
              wrapper: 'p-2',
              label: 'px-2.5 my-2 text-lg text-gray-900 dark:text-white',
              container: 'noto-nastaliq text-lg text-gray-700 dark:text-gray-200',
              command: {
                base: 'flex justify-between select-none items-center rounded-md px-2.5 py-1.5 gap-2 relative',
                active: 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white',
                inactive: '',
                label: 'flex items-center gap-1.5 min-w-0',
                prefix: 'text-gray-800 dark:text-gray-500',
                suffix: 'text-gray-400 dark:text-gray-500',
                container: 'flex items-center gap-1.5 min-w-0',
                icon: {
                  base: 'flex-shrink-0 w-5 h-5',
                  active: 'text-gray-700 dark:text-white',
                  inactive: 'text-gray-700 dark:text-gray-500',
                },
                selectedIcon: {
                  base: 'h-5 w-5 text-gray-800 dark:text-white flex-shrink-0',
                },
              },
              active: 'flex-shrink-0 text-gray-800 dark:text-gray-400',
              inactive: 'flex-shrink-0 text-gray-800 dark:text-gray-400',
            } }"
        >   
        
        <template #empty-state>
          <div class="flex flex-col items-center justify-center py-6 gap-3">
            <span class="text-gray-800 opacity-85 noto-nastaliq">فونٹ نہیں مل سکا</span>
          </div>
        </template>

      </UCommandPalette>
    </UModal>
  </div>
</template>