<template>
  <div>
    <v-progress-linear
      color="blue"
      height="25"
      indeterminate
      v-if="!isLoading"
      reverse
    ></v-progress-linear>
    <div v-else>
      <pagination :pages="numOfPages" class=""></pagination>
      <VuePdf
        class="ml-8 mr-8 mb-8"
        v-for="page in numOfPages"
        :key="page"
        :id="page"
        :src="pdfSrc"
        :page="page"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import pagination from '@/components/common/pdf/pagination.vue'
import { VuePdf, createLoadingTask } from 'vue3-pdfjs'
import { VuePdfPropsType } from 'vue3-pdfjs/components/vue-pdf/vue-pdf-props'
import axios from 'axios'

const props = defineProps<{ url: string }>()
const isLoading = ref(false)
const loadingPercentage = ref(0)

const pdfSrc = ref<VuePdfPropsType['src']>('')
const numOfPages = ref(0)

watch(
  () => props.url,
  async (newValue, oldValue) => {
    isLoading.value = false
    loadingPercentage.value = 0

    const response = await axios({
      url: newValue,
      method: 'get',
      responseType: 'arraybuffer',
      onDownloadProgress: function (progressEvent) {
        console.log(Math.floor((progressEvent.loaded / progressEvent.total) * 100))
        loadingPercentage.value = Math.floor((progressEvent.loaded / progressEvent.total) * 100)
      },
    })
    console.log(response)
    const pdf = await createLoadingTask(response.data).promise
    pdfSrc.value = response.data
    numOfPages.value = pdf.numPages
    console.log(response, pdf)
    setTimeout(() => {
      isLoading.value = true
    }, 1000)
  },
  { immediate: true },
)
</script>

<style scoped></style>