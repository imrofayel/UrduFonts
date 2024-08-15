<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter, type RouteLocationAsPathGeneric, type RouteLocationAsRelativeGeneric } from 'vue-router';

const isOpen = ref(false);
const commandPaletteRef = ref();
const router = useRouter();

// Fetch font data using useAsyncData
const { data } = await useAsyncData('fonts', () =>
  queryContent('/fonts').sort({ _id: -1 }).find()
);

// Transform the data into the desired pages format
const pages = computed(() => {
  // Ensure data.value is an array, map over the array to format each entry
  return data.value?.map((font) => ({
    id: font.family || 'no-family',
    label: font.urdu || 'no-title',
    href: font._path || '#'
  })) || [];
});

// Actions array for non-search commands
const actions = [
  { id: 'jameel_noori_nastaliq', label: 'جمیل نوری نستعلیق', click: () => { console.log('Action clicked'); } },
];

// Groups computed property for organizing commands
const groups = computed(() => {
  if (commandPaletteRef.value?.query) {
    // If there's a query, show pages
    return [
      {
        key: 'pages',
        commands: pages.value,
      },
    ];
  } else {
    // Otherwise, show actions
    return [
      {
        key: 'actions',
        commands: actions,
      },
    ];
  }
});

// Function to handle option selection
function onSelect(option: { click?: () => void; to?: string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric; href?: string | URL }) {
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

        style="direction: rtl;"

        placeholder="تلاش کریں"

        :fuse="{
          fuseOptions: {
            ignoreLocation: true,
            includeMatches: false,
            threshold: 0,
            keys: ['id', 'lable', 'children.children.value', 'children.children.children.value']
          },
          resultLimit: 300,
        }"

        :groups="groups"
        :autoselect="false"
        @update:model-value="onSelect"

        class="blur-[0.3px] text-xl"
        
        :ui="{   
          
          input: {
              icon: {
                base: 'pointer-events-none absolute start-4 text-[#1a1c1e]',
                size: 'h-6 w-6',
              },
              base: 'placeholder-[#1a1c1e]',
              size: 'sm:text-[21px]',
            },
            group: {
              wrapper: 'p-2',
              label: 'px-2.5 my-2 text-2xl text-[#1a1c1e] dark:text-white',
              container: 'text-[21px] text-[#1a1c1e] dark:text-gray-200 leading-loose',
              command: {
                base: 'flex justify-between select-none items-center rounded-md px-2.5 py-1.5 gap-2 relative',
                active: 'bg-[#f3f6fc] dark:bg-gray-800 text-[#1a1c1e] dark:text-white',
                inactive: '',
                label: 'flex items-center gap-1.5 min-w-0',
                prefix: 'text-gray-800 dark:text-gray-500',
                suffix: 'text-gray-400 dark:text-gray-500',
                container: 'flex items-center gap-1.5 min-w-0',
                icon: {
                  base: 'flex-shrink-0 w-8 h-8',
                  active: 'text-[#1a1c1e] dark:text-white',
                  inactive: 'text-[#1a1c1e] dark:text-gray-500',
                },
                selectedIcon: {
                  base: 'h-5 w-5 text-[#1a1c1e] dark:text-white flex-shrink-0',
                },
              },
              active: 'flex-shrink-0 text-[#1a1c1e] dark:text-gray-400',
              inactive: 'flex-shrink-0 text-[#1a1c1e] dark:text-gray-400',
            },
            
            default: {
              icon: 'i-lucide-search',
            },
            
          }"
        >   
        
        <template #empty-state>
          <div class="flex flex-col items-center justify-center py-6 gap-3">
            <span class="text-[#1a1c1e] text-2xl">فونٹ نہیں مل سکا</span>
          </div>
        </template>

      </UCommandPalette>
    </UModal>
  </div>
</template>