<script setup lang="ts">

import type { Font } from '~/types/font';

const { path } = useRoute()

const { data: articles, error } = await useAsyncData(`blog-post-${path}`, () => queryContent(path).findOne())

if (error.value) navigateTo('/404')

const data = computed<Font>(() => {
  return {
    title: articles.value?.title || 'not available',
    family: articles.value?.family || 'not available',
    styles: articles.value?.styles || [],
    size: articles.value?.size,
    urdu: articles.value?.urdu || 'فوںٹ',
    link: articles.value?.link || ''
  }
})

const text = ref('')

const value = ref(Number(data.value.size))

definePageMeta({
  layout: 'default'
})

// List of Urdu Alphabets
const urduAlphabets = ref([
  "آ", "ا", "ب", "پ", "ت", "ٹ", "ث", "ج", "چ", "ح", "خ", 
  "د", "ڈ", "ذ", "ر", "ڑ", "ز", "ژ", "س", "ش", "ص", 
  "ض", "ط", "ظ", "ع", "غ", "ف", "ق", "ک", "گ", "ل", 
  "م", "ن", "ں", "و", "ہ", "ھ", "ی", "ے", "ﷺ", "ؒ", "ۃ", "ء", "ي",
]);

</script>

<template>

  <div class="flex-col text-4xl mx-10 overflow-visible py-2 justify-between text-[#1a1c1e] space-y-8">

    <div class="flex justify-between items-center dark:text-[#ffff]">
      
      <div>{{ data.urdu }}</div>

      <a :href="data.link" ><p class="hover:scale-105 ease-in-out duration-500 flex items-center bg-[#1c2c28] text-[#ffff] p-2 mx-1.5 py-1 rounded-3xl" style="direction: ltr;"><Icon name="lucide:arrow-down" size="24px"></Icon><div class="inter relative px-1 text-[19px] mehr">Download</div></p></a>

    </div>

    <div class="text-3xl dark:text-[#ffff] sm:text-4xl leading-loose flex justify-center pb-10 text-center" :style="{ fontFamily: data.family }">اردو ہے جس کا نام ہمیں جانتے ہیں داغ​</div>

    <div class="flex-row sm:flex-col my-12 mx-2 items-center space-y-6"><div class="sm:w-1/2 flex bg-green-50 dark:bg-[#1c2c28] p-1 rounded-full mb-12"><input type="text" v-model="text" class="w-full mr-4 mb-1 leading-[4rem] overflow-visible noto-nastaliq text-[20px] bg-transparent focus:outline-none focus:ring-0 placeholder:text-[#1a1c1e] dark:placeholder:text-[#ffff]" placeholder="الفاظ  یہاں تحریر کریں">
    </div>

    <div class="flex items-center w-full sm:w-[80%]"><URange v-model="value" :min="10" :max="99" class="mx-6 sm:w-1/2" :ui="{
  
  // Rounded corners for both thumb and track
  rounded: 'rounded-xl',
  
  // Ring effects when the slider is focused
  ring: '',

  // Configuration for the progress bar
  progress: {
    base: 'absolute pointer-events-none peer-disabled:bg-opacity-50',
    background: 'bg-[#1c2c28] dark:bg-white/85',
    rounded: 'rounded-full',
  },
  
  // Thumb configuration
  thumb: {
    base: '[&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:-top-6 [&::-moz-range-thumb]:relative [&::-webkit-slider-thumb]:z-[1] [&::-moz-range-thumb]:z-[1] [&::-webkit-slider-thumb]:appearance-none [&::-moz-range-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-moz-range-thumb]:rounded-full [&::-webkit-slider-thumb]:border-none [&::-moz-range-thumb]:border-none',
    background: '[&::-webkit-slider-thumb]:bg-[#1c2c28] [&::-webkit-slider-thumb]:dark:bg-white/85',
    color: 'text-transparent',
  },
  
  // Track configuration
  track: {
    base: '[&::-webkit-slider-runnable-track]:group-disabled:bg-opacity-85 [&::-moz-range-track]:group-disabled:bg-opacity-85',
    background: '[&::-webkit-slider-runnable-track]:bg-green-100 [&::-moz-range-track]:bg-green-100 [&::-webkit-slider-runnable-track]:dark:bg-white/85 [&::-moz-range-track]:dark:bg-white/85',
    rounded: '[&::-webkit-slider-runnable-track]:rounded-lg [&::-moz-range-track]:rounded-lg',
  },
}
"/>
  
    <div class="inter text-xl rounded-3xl bg-[#1c2c28] p-3 py-1 text-[#ffff] inline-block">{{ value }}px</div></div>

    </div>

    <div v-for="(style) in data.styles" :key="style" v-if="data.styles.length >= 1">
      <div class="inter text-lg rounded-3xl bg-[#1c2c28] p-3 py-1 text-[#ffff] inline-block">{{ style }}</div>

      <div class="mt-10 mb-8 leading-relaxed dark:text-[#ffff]" :style="{ fontSize: value + 'px', fontWeight: style.split(' ')[1], fontFamily: data.family }">{{ text.length == 0 ? data.urdu + ' اردو کا ایک فونٹ ہے' : text }}</div>
    </div>

    <Alphabets :fontFamily="data.family" :fontSize="data.size"/>

</div>

</template>

<style>

</style>
