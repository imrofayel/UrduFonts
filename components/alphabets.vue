<template>
  <div class="flex flex-wrap items-center"><div v-for="(alphabet, index) in urduAlphabets" :key="index" class="p-6 bg-white/50 hover:scale-110 duration-300 ease-in-out rounded-2xl m-1 flex justify-center items-center">
    <div :style="{ fontSize: size + 'px', fontFamily: font }" class="relative -top-2">{{ alphabet }}</div>
  </div></div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

interface Props {
  font: string;
  size: number;
}

withDefaults(defineProps<Props>(), {
  font: 'Mehr',
  size: 34
})

// List of Urdu Alphabets
const urduAlphabets = ref([
  "آ", "ا", "ب", "پ", "ت", "ٹ", "ث", "ج", "چ", "ح", "خ", 
  "د", "ڈ", "ذ", "ر", "ڑ", "ز", "ژ", "س", "ش", "ص", 
  "ض", "ط", "ظ", "ع", "غ", "ف", "ق", "ک", "گ", "ل", 
  "م", "ن", "ں", "و", "ہ", "ھ", "ی", "ے", "ﷺ", "ؒ", "ۃ", "ء", "ي",
]);

</script>