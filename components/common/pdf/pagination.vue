<template>
  <v-pagination v-model="page" :length="pages" rounded="circle" @click="smoothScrolling(page)"></v-pagination>
</template>

<script setup lang="ts">
const props = defineProps<{
  pages: Number
}>()
const page = ref(1)
const currentPage = ref(1)
const smoothScrolling = (pageNumber: number) => {
  const page: HTMLElement = document.getElementById(`vue-pdf-page-${pageNumber}`)
  currentPage.value = pageNumber
  console.log(page)
  if (page) {
    const offsetTop = page.offsetTop
    window.scrollTo({
      top: offsetTop - 150,
      behavior: 'smooth',
    })
  }
}
</script>

<style scoped></style>