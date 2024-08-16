<template>

  <div>

    <div class="flex mx-10 mb-4"><Icon name="lucide:pen-line" size="24px" class="relative top-4"></Icon><input type="text" v-model="text" class="mr-2 leading-[4rem] overflow-visible relative -top-2 noto-nastaliq text-[20px] w-full bg-transparent text-[#1a1c1e] focus:outline-none focus:ring-0 dark:placeholder:text-[#ffff] placeholder:text-[#1a1c1e] dark:text-[#ffff]" placeholder=" الفاظ  یہاں تحریر کریں"></div>
      
    <div v-for="font in formattedData" :key="font.family">

    <NuxtLink :to="font.path"><div class="mx-8 space-y-4 dark:hover:bg-[#1c2c28] hover:bg-green-50 p-2 pb-10 rounded-3xl hover:scale-[1.03] duration-500 ease-in-out">

      <div class="text-lg inter rounded-3xl bg-[#1c2c28] p-3 py-1 text-[#ffff] inline-block">{{ font.title }}</div>

      <div :style="{ fontSize: font.size + 'px', fontFamily: font.family }">{{ text.length == 0 ? 'اردو ہے جس کا نام ہمیں جانتے ہیں داغ' : text }}
      </div>

    </div></NuxtLink>

    </div>

  </div>

</template>

<script lang="ts" setup>

const { data } = await useAsyncData('home', () => queryContent('/fonts').sort({ _id: -1 }).find())

const formattedData = computed(() => {
  return data.value?.map((articles) => {
    return {
      path: articles._path,
      title: articles.title || 'no-title available',
      family: articles.family || 'no-family available',
      styles: articles.styles || [],
      size: articles.size || 26
    }
  }) || []
})

const text = ref('');

</script>

<style>

</style>