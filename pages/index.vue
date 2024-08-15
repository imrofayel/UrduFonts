<template>

  <div class="blur-[.3px]">

    <div class="flex mx-10"><Icon name="lucide:pen-line" size="24px"></Icon><input type="text" v-model="text" class="mr-2 leading-[4rem] overflow-visible relative -top-6 noto-nastaliq text-[20px] w-full text-[#1a1c1e] focus:outline-none focus:ring-0 placeholder:text-[#1a1c1e]" placeholder=" الفاظ  یہاں تحریر کریں"></div>
      
    <div v-for="font in formattedData" :key="font.family">

    <NuxtLink :to="font.path"><div class="mx-8 space-y-4 hover:bg-[#f3f6fc] p-2 pb-10 rounded-3xl hover:scale-[1.03] duration-500 ease-in-out">

      <div class="text-lg inter rounded-3xl bg-[#1a1c1e] p-3 py-1 text-[#ffff] inline-block">{{ font.title }}</div>

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