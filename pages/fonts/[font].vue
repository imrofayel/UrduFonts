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
    urdu: articles.value?.urdu || 'فوںٹ'
  }
})

const text = ref('')

const value = ref(Number(data.value.size))

definePageMeta({
  layout: 'default'
})

</script>

<template>

  <div class="blur-[.3px] flex-col text-4xl mx-10 overflow-visible py-2 justify-between text-[#1a1c1e] space-y-8">

    <div>{{ data.urdu }}</div>

    <div class="text-4xl leading-loose flex justify-center pb-4 text-center" :style="{ fontFamily: data.family }">اردو ہے جس کا نام ہمیں جانتے ہیں داغ​
      <br> سارے جہاں میں دھوم ہماری زباں کی ہے </div>

    <div class="flex-row sm:flex-col my-12 mx-2 items-center space-y-6"><div class="sm:w-1/2 flex bg-[#f3f6fc] p-1 rounded-full mb-12"><input type="text" v-model="text" class="w-full mr-4 mb-1 leading-[4rem] overflow-visible noto-nastaliq text-[20px] bg-transparent focus:outline-none focus:ring-0 placeholder:text-[#1a1c1e]" placeholder="الفاظ  یہاں تحریر کریں">
    </div>

    <div class="flex items-center w-full sm:w-[80%]"><URange v-model="value" :min="10" :max="99" class="mx-6 sm:w-1/2" :ui="{
  
  // Rounded corners for both thumb and track
  rounded: 'rounded-xl',
  
  // Ring effects when the slider is focused
  ring: 'focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900',

  // Configuration for the progress bar
  progress: {
    base: 'absolute pointer-events-none peer-disabled:bg-opacity-50',
    background: 'bg-[#1a1c1e] dark:bg-gray-400',
    rounded: 'rounded-full',
  },
  
  // Thumb configuration
  thumb: {
    base: '[&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:-top-6 [&::-moz-range-thumb]:relative [&::-webkit-slider-thumb]:z-[1] [&::-moz-range-thumb]:z-[1] [&::-webkit-slider-thumb]:appearance-none [&::-moz-range-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-moz-range-thumb]:rounded-full [&::-webkit-slider-thumb]:border-none [&::-moz-range-thumb]:border-none',
    background: '[&::-webkit-slider-thumb]:bg-[#1a1c1e] [&::-moz-range-thumb]:bg-[#1a1c1e]',
    color: 'text-[#1a1c1e]',
  },
  
  // Track configuration
  track: {
    base: '[&::-webkit-slider-runnable-track]:group-disabled:bg-opacity-50 [&::-moz-range-track]:group-disabled:bg-opacity-50',
    background: '[&::-webkit-slider-runnable-track]:bg-gray-200 [&::-moz-range-track]:bg-gray-200 [&::-webkit-slider-runnable-track]:dark:bg-gray-700 [&::-moz-range-track]:dark:bg-gray-700',
    rounded: '[&::-webkit-slider-runnable-track]:rounded-lg [&::-moz-range-track]:rounded-lg',
  },
}
"/>
  
    <div class="inter text-xl rounded-3xl bg-[#1a1c1e] p-3 py-1 text-[#ffff] inline-block">{{ value }}px</div></div>

    </div>

    <div v-for="(style) in data.styles" :key="style" v-if="data.styles.length >= 1">
      <div class="inter text-lg rounded-3xl bg-[#1a1c1e] p-3 py-1 text-[#ffff] inline-block">{{ style }}</div>

      <div class="mt-10 mb-8 leading-relaxed" :style="{ fontSize: value + 'px', fontWeight: style.split(' ')[1], fontFamily: data.family }">{{ text.length == 0 ? data.urdu + ' اردو کا ایک فونٹ ہے' : text }}</div>
    </div>

    <div class="bg-[#f3f6fc] p-4 pb-8 space-y-4 rounded-2xl"><p class="flex items-center"><img src="/assets/flower.svg" class="inline"><div class="p-4 pb-6 text-[26px] mehr">تمام حروف کا صرف ذیلی سیٹ یہاں دکھایا گیا ہے۔</div></p>

    <Alphabets :font="data.family" :size="data.size"/></div>

  </div>

</template>

<style scoped>

</style>
