<script lang="ts" setup>

interface Props {
  link: string
  icon: string
  size: string
}

withDefaults(defineProps<Props>(), {
  link: '',
  icon: 'lucide:flame',
  size: '28px'
})

const emits = defineEmits(['click']);

const handleClick = (event: any) => {
  emits('click', event);
};

</script>

<template>
  <div>
    <div class="w-[52px] h-[50px] hover:bg-[#eef1f7] hover:rounded-xl duration-[700ms] ease-in-out p-1 rounded-3xl flex justify-center items-center hover:scale-105" @click="handleClick"><NuxtLink :to="link"><Icon :name="icon" :size="size"></Icon></NuxtLink></div>
  </div>
</template>

<style>

</style>