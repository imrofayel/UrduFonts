<script lang="ts" setup>
const { data } = await useAsyncData('home', () => queryContent('/fonts').sort({ _id: 1 }).find())

const elementPerPage = ref(6) // Number of fonts per page
const pageNumber = ref(1) // Current page number

const formattedData = computed(() => {
  return data.value?.map((articles) => {
    return {
      path: articles._path,
      title: articles.title || 'no-title available',
      urdu: articles.urdu || 'نام',
      family: articles.family || 'no-family available',
      styles: articles.styles || [],
      size: articles.size || 26
    }
  }) || []
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
    
    <div v-for="font in paginatedData" :key="font.family">
      <NuxtLink :to="font.path">
        <div class="mx-8 space-y-2 dark:hover:bg-[#1c2c28] hover:bg-green-50 hover p-2 pb-12 rounded-3xl hover:scale-[1.02] duration-500 ease-in-out">
          <div class="text-[22px] rounded-3xl bg-green-50 dark:bg-[#1c2c28] p-3 py-1 dark:text-[#ffff] inline-block relative">{{ font.urdu }}</div>
          <div :style="{ fontSize: font.size + 'px', fontFamily: font.family }">
            {{ text.length == 0 ? 'اردو ہے جس کا نام ہمیں جانتے ہیں داغ' : text }}
          </div>
        </div>
      </NuxtLink>
    </div>

    <!-- Pagination controls -->
    <div class="justify-center items-center flex"><div class="my-8 p-3 py-2 rounded-3xl space-x-8 text-[21px] flex justify-center bg-green-50 text-[#1c2c28] dark:bg-[#1c2c28] dark:text-[#ffff]" v-if="totalPage > 1" style="direction: ltr;">

      
      <button :disabled="pageNumber >= totalPage" @click="onNextPageClick">
        <Icon name="lucide:chevron-left" size="26" class="relative top-1 opacity-90" :class="{ 'opacity-20': pageNumber >= totalPage }"/></button>


      <div class="relative top-2">صفحات</div>

      <button :disabled="pageNumber <= 1" @click="onPreviousPageClick">
        <Icon name="lucide:chevron-right" size="26" class="relative top-1 opacity-90" :class="{ 'opacity-20': pageNumber <= 1 }"/>
      </button>

    </div></div>

  </div>
</template>

