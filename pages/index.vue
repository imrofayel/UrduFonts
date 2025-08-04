<script lang="ts" setup>
import type { Font } from '~/types/font';

// Fetch fonts data from API route with error handling
const { data: fontsData, error } = await useAsyncData('home', () => $fetch<Font[]>('/api/fonts'), {
  default: () => []
})

// Handle error state
if (error.value) {
  throw createError({
    statusCode: 500,
    statusMessage: 'Failed to load fonts data'
  })
}

const elementPerPage = ref(8) // Number of fonts per page
const pageNumber = ref(1) // Current page number

// Function to convert title to kebab-case slug for URL
const titleToSlug = (title: string): string => {
  return title.toLowerCase().replace(/\s+/g, '-')
}

const formattedData = computed(() => {
  // Ensure fontsData.value is an array before mapping
  const fonts = fontsData.value || []
  if (!Array.isArray(fonts)) {
    console.error('Fonts data is not an array:', fonts)
    return []
  }
  
  const formatted = fonts.map((font) => {
    const slug = titleToSlug(font.title || 'untitled')
    return {
      path: `/font/${slug}`, // Create slug-based path
      title: font.title || 'no-title available',
      urdu: font.urdu || 'نام',
      family: font.family || 'no-family available',
      styles: font.styles || [],
      size: font.size || 26
    }
  })
  
  console.log('Generated paths:', formatted.slice(0, 3).map(f => ({ title: f.title, path: f.path })))
  return formatted
})

// Computed property to handle pagination
const paginatedData = computed(() => {
  const startInd = (pageNumber.value - 1) * elementPerPage.value
  const endInd = pageNumber.value * elementPerPage.value
  return formattedData.value.slice(startInd, endInd)
})

const totalPage = computed(() => {
  const ttlContent = formattedData.value.length || 0
  return Math.ceil(ttlContent / elementPerPage.value)
})

function onPreviousPageClick() {
  if (pageNumber.value > 1)
    pageNumber.value -= 1
}

function onNextPageClick() {
  if (pageNumber.value < totalPage.value)
    pageNumber.value += 1
}

const text = ref('');

function gotoPage(page : number) {
  pageNumber.value = page
}

</script>

<template>
  <div>
    <div class="flex mx-10 mb-4">
      <Icon name="lucide:pen-line" size="24px" class="relative top-4"></Icon>
      <input type="text" v-model="text" class="mr-2 leading-[4rem] overflow-visible relative -top-2 noto-nastaliq text-[20px] w-full bg-transparent text-[#1a1c1e] focus:outline-none focus:ring-0 dark:placeholder:text-[#ffff] placeholder:text-[#1a1c1e] dark:text-[#ffff]" placeholder=" الفاظ  یہاں تحریر کریں">
    </div>
    
    <div v-for="font in paginatedData" :key="font.title">
      <NuxtLink :to="font.path" class="block">
        <div class="mx-8 space-y-2 dark:hover:bg-[#1c2c28] hover:bg-green-50 hover p-2 pb-12 rounded-3xl hover:scale-[1.02] duration-500 ease-in-out cursor-pointer">
          <div class="text-[22px] rounded-3xl bg-green-50 dark:bg-[#1c2c28] p-3 py-1 dark:text-[#ffff] inline-block relative">{{ font.urdu }}</div>
          <div :style="{ fontSize: font.size + 'px', fontFamily: font.family }">
            {{ text.length == 0 ? 'اردو ہے جس کا نام ہمیں جانتے ہیں داغ' : text }}
          </div>
        </div>
      </NuxtLink>
    </div>

    <!-- Pagination controls -->
    <div class="m-8 rounded-3xl space-x-8 text-[21px] flex justify-between  text-[#1c2c28] dark:text-[#ffff]" v-if="totalPage > 1" style="direction: ltr;">

      
      <button :disabled="pageNumber >= totalPage" @click="onNextPageClick" class="bg-[#1c2c28] p-2 px-4 text-[#ffff] rounded-3xl" :class="{ 'opacity-0': pageNumber >= totalPage }">
        <Icon name="lucide:chevron-left" size="28" class="relative top-1 opacity-90"/></button>


      <button :disabled="pageNumber <= 1" @click="onPreviousPageClick" class="bg-[#1c2c28] p-2 px-4 text-[#ffff] rounded-3xl" :class="{ 'opacity-0': pageNumber <= 1 }">
        <Icon name="lucide:chevron-right" size="28" class="relative top-1 opacity-90"/>
      </button>

    </div>

  </div>
</template>

