<script setup lang="ts">

import type { Article } from '~/types/article';

const { path } = useRoute()

const { data: articles, error } = await useAsyncData(`blog-post-${path}`, () => queryContent(path).findOne())

if (error.value) navigateTo('/404')

const data = computed<Article>(() => {
  return {
    title: articles.value?.title || 'not available',
    date: articles.value?.date || 'not available'
  }
})

definePageMeta({
  layout: 'default'
})

</script>

<template>

    <div class="leading-[3.3rem] text-justify text-[20px] mx-[30px] sm:mx-[60px] md:mx-[100px] prose-headings:text-[32px] prose-headings:my-8"><ContentRenderer v-if="articles" :value="articles">
        <template #empty>
          <p>No content found.</p>
        </template>
      </ContentRenderer>
    </div>

</template>

<style>

</style>
