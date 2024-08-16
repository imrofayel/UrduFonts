<!-- UrduAlphabetGrid.vue -->
<template>
  <div class="w-full bg-green-50 dark:bg-[#1c2c28] py-6 px-1 space-y-4 rounded-2xl">
    <div class="flex items-center mb-4 mr-4">
      <img src="/assets/flower.svg" alt="Flower" class="w-8 h-8 mr-2">
      <h2 class="mehr text-[26px] pr-2 pb-3 dark:text-[#ffff]">
        تمام حروف کا صرف ذیلی سیٹ یہاں دکھایا گیا ہے۔
      </h2>
    </div>
    <div class="flex flex-wrap justify-right">
      <div
        v-for="(alphabet, index) in urduAlphabets"
        :key="index"
        class="p-6 m-1 bg-white dark:bg-[#182523] bg-opacity-50 rounded-xl hover:scale-110 transition-transform duration-300 ease-in-out flex items-center justify-center"
      >
        <span :class="[`text-[${props.fontSize}px]`, props.fontFamily]" class="relative -top-2 dark:text-[#ffff]">
          {{ alphabet }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  fontSize: {
    type: Number,
    default: 26
  },
  fontFamily: {
    type: String,
    default: 'mehr'
  }
})

const urduAlphabets = [
  'ا', 'ب', 'پ', 'ت', 'ٹ', 'ث', 'ج', 'چ', 'ح', 'خ',
  'د', 'ڈ', 'ذ', 'ر', 'ڑ', 'ز', 'ژ', 'س', 'ش', 'ص',
  'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ک', 'گ', 'ل',
  'م', 'ن', 'و', 'ہ', 'ھ', 'ء', 'ی', 'ے', 'ۃ', 'ﷺ', '۱', '۲', '۳', '۴',
  '۵', '۶', '۷', '۸', '۹', '۰'
]
</script>